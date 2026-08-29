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
  includes: string;
  description: string;
  durationMinutes: number;
  startingPrice: number;
  imageUrl?: string;
  icon: string;
}

export const SERVICES_MASTER: Record<ServiceType, ServiceInfo> = {
  bath_and_brush: {
    id: "bath_and_brush",
    name: "Bath & Brush",
    includes: "Bath, blow-dry, brushing, ear cleaning",
    description:
      "A thorough clean and coat refresh that leaves your pet smelling wonderful.",
    durationMinutes: 60,
    startingPrice: 45,
    imageUrl:
      "https://images.unsplash.com/photo-1528846104175-4fd300ee59da?w=600&h=300&fit=crop&auto=format",
    icon: "🛁",
  },
  full_groom: {
    id: "full_groom",
    name: "Full Groom",
    includes: "Bath, haircut, brushing, nail trim, ear cleaning",
    description:
      "Our most complete grooming service—a head-to-tail transformation.",
    durationMinutes: 90,
    startingPrice: 75,
    imageUrl:
      "https://images.unsplash.com/photo-1719464454959-9cf304ef4774?w=600&h=300&fit=crop&auto=format",
    icon: "✂️",
  },
  nail_trim: {
    id: "nail_trim",
    name: "Nail Trim",
    includes: "Nail clipping and filing",
    description:
      "Quick and stress-free nail maintenance for a comfortable pet.",
    durationMinutes: 20,
    startingPrice: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1651273427958-bf78352e39be?w=600&h=300&fit=crop&auto=format",
    icon: "🐾",
  },
  deshedding_treatment: {
    id: "deshedding_treatment",
    name: "De-shedding Treatment",
    includes: "Bath, coat treatment, blow-dry, and thorough brushing",
    description:
      "Reduce shedding with a deep coat treatment and thorough blow-out.",
    durationMinutes: 75,
    startingPrice: 60,
    imageUrl:
      "https://images.unsplash.com/photo-1588269845483-8e7f2398cca6?w=600&h=300&fit=crop&auto=format",
    icon: "🌿",
  },
  puppys_first_groom: {
    id: "puppys_first_groom",
    name: "Puppy's First Groom",
    includes: "Gentle introduction to grooming for young dogs",
    description: "A gentle, patient introduction to grooming for young dogs.",
    durationMinutes: 45,
    startingPrice: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1678153184494-1f6fc14a673d?w=600&h=300&fit=crop&auto=format",
    icon: "🐶",
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
