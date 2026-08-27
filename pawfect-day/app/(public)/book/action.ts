"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as db from "@/app/models/bookings";
import {
	SERVICES_MASTER,
	type PetSize,
	type PetType,
	type ServiceType,
} from "@/app/types/booking";

export type BookingFormState = {
	success?: boolean;
	errors?: Record<string, string>;
	message?: string | null;
};

const PHONE_PATTERN = /^[+0-9().\-\s]+$/;

function isValidPhoneNumber(value: string) {
	const digitCount = value.replace(/\D/g, "").length;
	return PHONE_PATTERN.test(value) && digitCount >= 7 && digitCount <= 15;
}

export async function createBooking(
	_previousState: BookingFormState,
	formData: FormData,
): Promise<BookingFormState> {
	const customerName = String(formData.get("customerName") || "").trim();
	const email = String(formData.get("email") || "").trim();
	const phone = String(formData.get("phone") || "").trim();
	const petName = String(formData.get("petName") || "").trim();
	const petType = String(formData.get("petType") || "");
	const petBreed = String(formData.get("petBreed") || "").trim();
	const petSize = String(formData.get("petSize") || "");
	const service = String(formData.get("service") || "");
	const bookingDate = String(formData.get("bookingDate") || "").trim();
	const bookingTime = String(formData.get("bookingTime") || "").trim();
	const alternateTime =
		String(formData.get("alternateTime") || "").trim() || null;
	const notes = String(formData.get("notes") || "").trim() || null;

	// Validation
	const errors: Record<string, string> = {};
	const isServiceType = (value: string): value is ServiceType => value in SERVICES_MASTER;
	const isPetType = (value: string): value is PetType =>
		value === "dog" || value === "cat";
	const isPetSize = (value: string): value is PetSize =>
		value === "small" || value === "medium" || value === "large";
	if (!customerName) errors.customerName = "Full name is required.";
	if (!email || !/^\S+@\S+\.\S+$/.test(email))
		errors.email = "Valid email is required.";
	if (!isValidPhoneNumber(phone)) errors.phone = "Valid phone number is required.";
	if (!petName) errors.petName = "Pet name is required.";
	if (!isPetType(petType)) errors.petType = "Choose a valid pet type.";
	if (!isPetSize(petSize)) errors.petSize = "Choose a valid pet size.";
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

	// The guards above keep the values safe to pass to the model layer.
	if (
		!isServiceType(service) ||
		!isPetType(petType) ||
		!isPetSize(petSize)
	) {
		return { success: false, message: "Please correct the errors below." };
	}

	const serviceMeta = SERVICES_MASTER[service];
	const referenceNumber = createReferenceNumber();

	try {
		await db.createBooking({
			referenceNumber,
			customerName,
			email,
			phone,
			petName,
			petType,
			petBreed: petBreed || "Not provided",
			petSize,
			service,
			durationMinutes: serviceMeta.durationMinutes,
			startingPrice: serviceMeta.startingPrice,
			bookingDate,
			bookingTime,
			alternateTime,
			notes,
		});
	} catch (error) {
		console.error("Unable to create booking", error);
		return {
			success: false,
			message: "We could not save your booking. Please try again.",
		};
	}

	revalidatePath("/dashboard");
	redirect(`/book/success?ref=${referenceNumber}`);
}

function createReferenceNumber() {
	const datePart = new Date().toISOString().slice(2, 7).replace("-", "");
	const randomPart = crypto
		.getRandomValues(new Uint32Array(1))[0]
		.toString()
		.slice(-6)
		.padStart(6, "0");

	return `PAW-${datePart}-${randomPart}`;
}
