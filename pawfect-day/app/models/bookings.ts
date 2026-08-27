import pool from "@/app/lib/db";
import {
	Booking,
	BookingStatus,
	CreateBookingInput,
	UpdateBookingInput,
} from "../types/booking";

type BookingRow = {
	id: string;
	reference_number: string;
	customer_name: string;
	email: string;
	phone: string;
	pet_name: string;
	pet_type: Booking["petType"];
	pet_breed: string;
	pet_size: Booking["petSize"];
	service: Booking["service"];
	duration_minutes: number;
	starting_price: string | number;
	booking_date: string;
	booking_time: string;
	alternate_time: string | null;
	notes: string | null;
	status: BookingStatus;
	created_at: string;
	updated_at: string | null;
};

// Convert DB snake_case row -> TS camelCase
function formatBooking(row: BookingRow): Booking {
	let bookingDate = "";
	if (row.booking_date) {
		const raw = row.booking_date as unknown;
		if (raw instanceof Date) {
			bookingDate = raw.toISOString().split("T")[0];
		} else {
			bookingDate = String(raw).split("T")[0];
		}
	}
	return {
		id: row.id,
		referenceNumber: row.reference_number,
		customerName: row.customer_name,
		email: row.email,
		phone: row.phone,
		petName: row.pet_name,
		petType: row.pet_type,
		petBreed: row.pet_breed,
		petSize: row.pet_size,
		service: row.service,
		durationMinutes: row.duration_minutes,
		startingPrice: Number(row.starting_price),
		bookingDate: bookingDate,
		bookingTime: row.booking_time,
		alternateTime: row.alternate_time,
		notes: row.notes,
		status: row.status,
		createdAt:
			typeof row.created_at === "string"
				? row.created_at
				: new Date(row.created_at).toISOString(),
		updatedAt: row.updated_at ? String(row.updated_at) : undefined,
	};
}

/**
 * GET all bookings (for Dashboard)
 */
export async function getBookings(): Promise<Booking[]> {
	const result = await pool.query<BookingRow>(
		"SELECT * FROM bookings ORDER BY booking_date DESC, booking_time ASC",
	);
	return result.rows.map(formatBooking);
}

/**
 * GET a single booking by ID
 */
export async function getBookingById(id: string): Promise<Booking | null> {
	const result = await pool.query<BookingRow>(
		"SELECT * FROM bookings WHERE id = $1",
		[id],
	);
	if (result.rows.length === 0) return null;
	return formatBooking(result.rows[0]);
}

/**
 * GET a single booking by its public reference number.
 */
export async function getBookingByReferenceNumber(
	referenceNumber: string,
): Promise<Booking | null> {
	const result = await pool.query<BookingRow>(
		"SELECT * FROM bookings WHERE reference_number = $1",
		[referenceNumber],
	);
	if (result.rows.length === 0) return null;
	return formatBooking(result.rows[0]);
}

/**
 * Check if a time slot is already taken
 */
export async function checkSlotAvailability(
	date: string,
	time: string,
  excludeBookingId?: string
): Promise<boolean> {
	if (excludeBookingId) {
    const result = await pool.query<BookingRow>(
      `SELECT id FROM bookings
       WHERE booking_date = $1 
         AND booking_time = $2 
         AND status IN ('pending', 'confirmed')
         AND id != $3
       LIMIT 1`,
      [date, time, excludeBookingId]
    );
    return result.rows.length === 0;
  }

  const result = await pool.query<BookingRow>(
    `SELECT id FROM bookings
     WHERE booking_date = $1 
       AND booking_time = $2 
       AND status IN ('pending', 'confirmed')
     LIMIT 1`,
    [date, time]
  );
  return result.rows.length === 0;
}

/**
 * CREATE a new booking
 */
export async function createBooking(
	data: CreateBookingInput & {
		referenceNumber: string;
		durationMinutes: number;
		startingPrice: number;
	},
): Promise<Booking> {
	const result = await pool.query<BookingRow>(
		`INSERT INTO bookings (
	      reference_number, customer_name, email, phone, pet_name, pet_type,
	      pet_breed, pet_size, service, duration_minutes, starting_price,
      booking_date, booking_time, alternate_time, notes, status
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 'pending')
    RETURNING *`,
		[
			data.referenceNumber,
			data.customerName,
			data.email,
			data.phone,
			data.petName,
			data.petType,
			data.petBreed,
			data.petSize,
			data.service,
			data.durationMinutes,
			data.startingPrice,
			data.bookingDate,
			data.bookingTime,
			data.alternateTime || null,
			data.notes || null,
		],
	);
	return formatBooking(result.rows[0]);
}

/**
 * UPDATE a booking
 */
export async function updateBooking(
	id: string,
	data: UpdateBookingInput,
): Promise<Booking | null> {
	const result = await pool.query<BookingRow>(
		`UPDATE bookings
     SET customer_name = COALESCE($1, customer_name),
         email = COALESCE($2, email),
         phone = COALESCE($3, phone),
         pet_name = COALESCE($4, pet_name),
         service = COALESCE($5, service),
         booking_date = COALESCE($6, booking_date),
         booking_time = COALESCE($7, booking_time),
         notes = COALESCE($8, notes),
         status = COALESCE($9, status),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $10
     RETURNING *`,
		[
			data.customerName,
			data.email,
			data.phone,
			data.petName,
			data.service,
			data.bookingDate,
			data.bookingTime,
			data.notes,
			data.status,
			id,
		],
	);
	if (result.rows.length === 0) return null;
	return formatBooking(result.rows[0]);
}

/**
 * Change booking status
 */
export async function changeBookingStatus(
	id: string,
	status: BookingStatus,
): Promise<Booking | null> {
	const result = await pool.query<BookingRow>(
		"UPDATE bookings SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
		[status, id],
	);
	if (result.rows.length === 0) return null;
	return formatBooking(result.rows[0]);
}

/**
 * DELETE a booking
 */
export async function deleteBooking(id: string): Promise<boolean> {
	const result = await pool.query("DELETE FROM bookings WHERE id = $1", [id]);
	return (result.rowCount ?? 0) > 0;
}
