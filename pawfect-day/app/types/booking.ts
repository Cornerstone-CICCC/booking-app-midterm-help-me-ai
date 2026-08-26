export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type PetType = "dog" | "cat";

export type PetSize = "small" | "medium" | "large";
// small: <20lb, medium: 20-50lb, large: >50lb

export type ServiceType =
	| "bath_and_brush"
	| "full_groom"
	| "nail_trim"
	| "deshedding_treatment"
	| "puppys_first_groom";

export interface ServiceInfo {
	id: ServiceType;
	name: string;
	description: string;
	durationMinutes: number;
	startingPrice: number;
}

export const SERVICES_MASTER: Record<ServiceType, ServiceInfo> = {
	bath_and_brush: {
		id: "bath_and_brush",
		name: "Bath & Brush",
		description: "Bath, blow-dry, brushing, ear cleaning",
		durationMinutes: 60,
		startingPrice: 45,
	},
	full_groom: {
		id: "full_groom",
		name: "Full Groom",
		description: "Bath, haircut, brushing, nail trim, ear cleaning",
		durationMinutes: 90,
		startingPrice: 75,
	},
	nail_trim: {
		id: "nail_trim",
		name: "Nail Trim",
		description: "Nail clipping and filing",
		durationMinutes: 20,
		startingPrice: 20,
	},
	deshedding_treatment: {
		id: "deshedding_treatment",
		name: "De-shedding Treatment",
		description: "Bath, coat treatment, blow-dry, and thorough brushing",
		durationMinutes: 75,
		startingPrice: 60,
	},
	puppys_first_groom: {
		id: "puppys_first_groom",
		name: "Puppy's First Groom",
		description: "Gentle introduction to grooming for young dogs",
		durationMinutes: 45,
		startingPrice: 40,
	},
};

export interface Booking {
	id: string;
	referenceNumber: string;
	customerName: string;
	email: string;
	phone: string;
	petName: string;
	petType: PetType;
	petBreed: string;
	petSize: PetSize;
	service: ServiceType;
	durationMinutes: number;
	startingPrice: number;
	bookingDate: string; // YYYY-MM-DD
	bookingTime: string; // e.g. "10:30 AM"
	alternateTime?: string | null;
	notes?: string | null;
	status: BookingStatus;
	createdAt: string;
	updatedAt?: string;
}

export type CreateBookingInput = Omit<
	Booking,
	| "id"
	| "referenceNumber"
	| "durationMinutes"
	| "startingPrice"
	| "status"
	| "createdAt"
	| "updatedAt"
>;

export type UpdateBookingInput = Partial<CreateBookingInput> & {
	status?: BookingStatus;
};
