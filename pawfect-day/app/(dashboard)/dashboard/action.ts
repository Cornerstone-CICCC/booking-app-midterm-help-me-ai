"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import * as db from "@/app/models/bookings";
import {
  BookingStatus,
  ServiceType,
  SERVICES_MASTER,
} from "@/app/types/booking";

/**
 * Check authentication on server mutations
 */
async function verifyStaffSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session =
    cookieStore.get("staff_session") ||
    cookieStore.get("auth_token") ||
    cookieStore.get("session_token") ||
    cookieStore.get("user");
  return Boolean(session?.value);
}

const isServiceType = (val: string): val is ServiceType => {
  return val in SERVICES_MASTER;
};

const isBookingStatus = (val: string): val is BookingStatus => {
  return ["pending", "confirmed", "completed", "cancelled"].includes(val);
};

/**
 * Action: Change Booking Status
 */
export async function changeStatusAction(id: string, newStatus: string) {
  const isAuthenticated = await verifyStaffSession();
  if (!isAuthenticated) {
    return { success: false, message: "Unauthorized: Staff sign-in required." };
  }

  if (!id) {
    return { success: false, message: "Booking ID is required." };
  }
  if (!isBookingStatus(newStatus)) {
    return { success: false, message: "Invalid booking status." };
  }

  const updated = await db.changeBookingStatus(id, newStatus);
  if (!updated) {
    return {
      success: false,
      message: "Booking not found or failed to update.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/bookings/${id}`);
  return { success: true, message: `Status updated to ${newStatus}.` };
}

/**
 * Action: Delete Booking
 */
export async function deleteBookingAction(id: string) {
  const isAuthenticated = await verifyStaffSession();
  if (!isAuthenticated) {
    return { success: false, message: "Unauthorized: Staff sign-in required." };
  }

  if (!id) {
    return { success: false, message: "Booking ID is required." };
  }

  const deleted = await db.deleteBooking(id);
  if (!deleted) {
    return {
      success: false,
      message: "Booking not found or failed to delete.",
    };
  }

  revalidatePath("/dashboard");
  return { success: true, message: "Booking deleted successfully." };
}

/**
 * Action: Update Booking Details
 */
export async function updateBookingAction(id: string, formData: FormData) {
  const isAuthenticated = await verifyStaffSession();
  if (!isAuthenticated) {
    return { success: false, message: "Unauthorized: Staff sign-in required." };
  }

  // Extract Data
  const customerName = String(formData.get("customerName") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const petName = String(formData.get("petName") || "").trim();
  const service = String(formData.get("service") || "").trim();
  const bookingDate = String(formData.get("bookingDate") || "").trim();
  const bookingTime = String(formData.get("bookingTime") || "").trim();
  const notes = String(formData.get("notes") || "").trim() || null;
  const status = String(formData.get("status") || "").trim();

  // Form Validation
  const errors: Record<string, string> = {};
  if (!customerName) errors.customerName = "Customer name is required.";
  if (!email || !/^\S+@\S+\.\S+$/.test(email))
    errors.email = "Valid email is required.";
  if (!phone) errors.phone = "Phone number is required.";
  if (!petName) errors.petName = "Pet name is required.";
  if (!isServiceType(service)) errors.service = "Valid service is required.";
  if (!bookingDate) errors.bookingDate = "Booking date is required.";
  if (!bookingTime) errors.bookingTime = "Booking time is required.";
  if (!isBookingStatus(status)) errors.status = "Valid status is required.";

  if (Object.keys(errors).length > 0) {
    return { success: false, errors, message: "Please fix the errors below." };
  }

  const isAvailable = await db.checkSlotAvailability(bookingDate, bookingTime, id);

  if (!isAvailable) {
    return {
      success: false,
      errors: {
        bookingTime: "This time is unavailable. Please choose another time.",
      },
      message: "This time is unavailable. Please choose another time.",
    };
  }

  await db.updateBooking(id, {
    customerName,
    email,
    phone,
    petName,
    service: service as ServiceType,
    bookingDate,
    bookingTime,
    notes,
    status: status as BookingStatus,
  });

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/bookings/${id}`);
  revalidatePath(`/dashboard/bookings/${id}/edit`);
  return { success: true, message: "Booking updated successfully." };
}
