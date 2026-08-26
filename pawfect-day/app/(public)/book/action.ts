"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as db from "@/app/models/bookings";
import { ServiceType, SERVICES_MASTER } from "@/app/types/booking";

export type BookingFormState = {
	success?: boolean;
	errors?: Record<string, string>;
	message?: string | null;
};

export async function createBooking(
	prevState: BookingFormState,
	formData: FormData,
): Promise<BookingFormState> {
	const customerName = String(formData.get("customerName") || "").trim();
	const email = String(formData.get("email") || "").trim();
	const phone = String(formData.get("phone") || "").trim();
	const petName = String(formData.get("petName") || "").trim();
	const petType = String(formData.get("petType") || "") as any;
	const petBreed = String(formData.get("petBreed") || "").trim();
	const petSize = String(formData.get("petSize") || "") as any;
	const service = String(formData.get("service") || "") as string;
	const bookingDate = String(formData.get("bookingDate") || "").trim();
	const bookingTime = String(formData.get("bookingTime") || "").trim();
	const alternateTime =
		String(formData.get("alternateTime") || "").trim() || null;
	const notes = String(formData.get("notes") || "").trim() || null;

	// Validation
	const errors: Record<string, string> = {};
	const isServiceType = (val: string): val is ServiceType => {
		return val in SERVICES_MASTER;
	};
	if (!customerName) errors.customerName = "Full name is required.";
	if (!email || !/^\S+@\S+\.\S+$/.test(email))
		errors.email = "Valid email is required.";
	if (!phone) errors.phone = "Phone number is required.";
	if (!petName) errors.petName = "Pet name is required.";
	if (!service || !isServiceType(service))
		errors.service = "Choosing service is required.";
	if (!bookingDate) errors.bookingDate = "Date is required.";
	if (!bookingTime) errors.bookingTime = "Time slot is required.";

	if (Object.keys(errors).length > 0) {
		return {
			success: false,
			errors,
			message: "Please correct the errors below.",
		};
	}

	// Check double-booking
	const isAvailable = await db.checkSlotAvailability(bookingDate, bookingTime);
	if (!isAvailable) {
		return {
			success: false,
			errors: {
				bookingTime:
					"Sorry, this time was just booked by another customer. Please select another available time.",
			},
			message: "Time slot unavailable.",
		};
	}

	const serviceMeta = SERVICES_MASTER[service];
	const referenceNumber = `PAW-${Math.floor(10000 + Math.random() * 90000)}`;

	await db.createBooking({
		referenceNumber,
		customerName,
		email,
		phone,
		petName,
		petType,
		petBreed,
		petSize,
		service,
		durationMinutes: serviceMeta.durationMinutes,
		startingPrice: serviceMeta.startingPrice,
		bookingDate,
		bookingTime,
		alternateTime,
		notes,
	});

	revalidatePath("/dashboard");
	redirect(`/book/success?ref=${referenceNumber}`);
}
