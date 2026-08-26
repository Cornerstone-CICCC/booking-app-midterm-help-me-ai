"use server";

import { revalidatePath } from "next/cache";

import pool from "@/app/lib/db";
import type { CreateBookingState } from "@/app/types/booking-action";
import {
  SERVICES_MASTER,
  type PetSize,
  type PetType,
  type ServiceType,
} from "@/app/types/booking";

const PET_TYPES: PetType[] = ["dog", "cat"];
const PET_SIZES: PetSize[] = ["small", "medium", "large"];
const APPOINTMENT_TIMES = ["10:30 AM", "12:00 PM", "1:30 PM", "4:30 PM"];

export async function createBooking(
  _previousState: CreateBookingState,
  formData: FormData,
): Promise<CreateBookingState> {
  const values = readFormValues(formData);
  const validationError = validateBooking(values);

  if (validationError) {
    return { success: false, message: validationError };
  }

  const service = SERVICES_MASTER[values.service as ServiceType];
  const referenceNumber = createReferenceNumber();

  try {
    await pool.query(
      `INSERT INTO bookings (
        reference_number, customer_name, email, phone, pet_name, pet_type,
        pet_breed, pet_size, service, duration_minutes, starting_price,
        booking_date, booking_time, alternate_time, notes
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
      )`,
      [
        referenceNumber,
        values.ownerName,
        values.ownerEmail,
        values.ownerPhone,
        values.petName,
        values.petType,
        values.petBreed || "Not provided",
        values.petSize,
        values.service,
        service.durationMinutes,
        service.startingPrice,
        toDatabaseDate(values.bookingDate),
        values.bookingTime,
        values.alternateTime || null,
        values.notes || null,
      ],
    );
  } catch (error) {
    console.error("Unable to create booking", error);
    return {
      success: false,
      message: "We could not save your booking. Please try again.",
    };
  }

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Booking created successfully.",
    referenceNumber,
  };
}

function readFormValues(formData: FormData) {
  return {
    ownerName: getString(formData, "ownerName"),
    ownerEmail: getString(formData, "ownerEmail"),
    ownerPhone: getString(formData, "ownerPhone"),
    petName: getString(formData, "petName"),
    petType: getString(formData, "petType"),
    petBreed: getString(formData, "petBreed"),
    petSize: getString(formData, "petSize"),
    service: getString(formData, "service"),
    bookingDate: getString(formData, "bookingDate"),
    bookingTime: getString(formData, "bookingTime"),
    alternateTime: getString(formData, "alternateTime"),
    notes: getString(formData, "notes"),
  };
}

function getString(formData: FormData, name: string) {
  return formData.get(name)?.toString().trim() ?? "";
}

function validateBooking(values: ReturnType<typeof readFormValues>) {
  if (!values.ownerName || !values.petName || !values.ownerPhone) {
    return "Please complete all required contact and pet details.";
  }

  if (!/^\S+@\S+\.\S+$/.test(values.ownerEmail)) {
    return "Please provide a valid email address.";
  }

  if (!PET_TYPES.includes(values.petType as PetType)) {
    return "Please choose a valid pet type.";
  }

  if (!PET_SIZES.includes(values.petSize as PetSize)) {
    return "Please choose a valid pet size.";
  }

  if (!(values.service in SERVICES_MASTER)) {
    return "Please choose a valid grooming service.";
  }

  if (!APPOINTMENT_TIMES.includes(values.bookingTime)) {
    return "Please choose an available appointment time.";
  }

  if (values.alternateTime && !APPOINTMENT_TIMES.includes(values.alternateTime)) {
    return "Please choose a valid alternate appointment time.";
  }

  if (values.alternateTime === values.bookingTime) {
    return "Your alternate time must be different from your preferred time.";
  }

  if (!isValidDate(values.bookingDate)) {
    return "Please choose a valid appointment date.";
  }

  if (values.petBreed.length > 100 || values.notes.length > 2_000) {
    return "One of the submitted fields is too long.";
  }

  return null;
}

function isValidDate(value: string) {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

function toDatabaseDate(value: string) {
  return new Date(value).toISOString().slice(0, 10);
}

function createReferenceNumber() {
  const datePart = new Date().toISOString().slice(2, 7).replace("-", "");
  const randomPart = crypto.getRandomValues(new Uint32Array(1))[0]
    .toString()
    .slice(-6)
    .padStart(6, "0");

  return `PAW-${datePart}-${randomPart}`;
}
