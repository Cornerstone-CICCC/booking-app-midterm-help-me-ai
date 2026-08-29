// --- Types ---
export type PetType = 'dog' | 'cat';
export type PetSize = 'small' | 'medium' | 'large' | 'giant';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

import { SERVICES_MASTER, type ServiceInfo } from "@/app/types/booking";

// Compatibility view for public booking and services pages.
// The database layer uses `SERVICES_MASTER` as its source of truth.
export type Service = Omit<ServiceInfo, 'includes'> & {
  price: number;
  includes: string[];
};

export const SERVICES_LIST: Service[] = Object.values(SERVICES_MASTER).map(
  (service) => ({
    ...service,
    price: service.startingPrice,
    includes: service.description.split(", "),
  }),
);

// --- Form Validations and Struct ---

export type BookingFormState = {
  errors?: {
    ownerName?: string;
    ownerEmail?: string;
    ownerPhone?: string;
    petName?: string;
    petType?: string;
    petSize?: string;
    serviceId?: string;
    bookingDate?: string;
    bookingTime?: string;
  };
  message?: string;
};

export function validateBookingFormData(formData: FormData): BookingFormState {
  const errors: BookingFormState['errors'] = {};

  const ownerName = formData.get('ownerName')?.toString().trim();
  const ownerEmail = formData.get('ownerEmail')?.toString().trim();
  const ownerPhone = formData.get('ownerPhone')?.toString().trim();
  const petName = formData.get('petName')?.toString().trim();
  const petType = formData.get('petType')?.toString();
  const petSize = formData.get('petSize')?.toString();
  const serviceId = formData.get('serviceId')?.toString();
  const bookingDate = formData.get('bookingDate')?.toString();
  const bookingTime = formData.get('bookingTime')?.toString();

  if (!ownerName) errors.ownerName = 'El nombre del dueño es obligatorio.';
  if (!ownerEmail || !ownerEmail.includes('@')) errors.ownerEmail = 'Ingresa un correo electrónico válido.';
  if (!ownerPhone || ownerPhone.length < 7) errors.ownerPhone = 'Ingresa un número de teléfono válido.';
  if (!petName) errors.petName = 'El nombre de la mascota es obligatorio.';
  if (!petType || !['dog', 'cat'].includes(petType)) errors.petType = 'Selecciona un tipo de mascota válido.';
  if (!petSize || !['small', 'medium', 'large', 'giant'].includes(petSize)) errors.petSize = 'Selecciona el tamaño.';
  if (!serviceId) errors.serviceId = 'Debes seleccionar un servicio.';
  if (!bookingDate) errors.bookingDate = 'Selecciona una fecha para la cita.';
  if (!bookingTime) errors.bookingTime = 'Selecciona una hora para la cita.';

  const hasErrors = Object.keys(errors).length > 0;

  if (hasErrors) {
    return {
      errors,
      message: 'Por favor corrige los errores del formulario.',
    };
  }

  return {};
}
