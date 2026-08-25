// --- Types ---
export type PetType = 'dog' | 'cat';
export type PetSize = 'small' | 'medium' | 'large' | 'giant';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

export interface Service {
  id: string;
  name: string;
  description: string;
  includes?: string[];
  price: number;
  durationMinutes: number;
}

export interface Booking {
  id: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  petName: string;
  petType: PetType;
  petSize: PetSize;
  serviceId: string;
  bookingDate: string; // YYYY-MM-DD
  bookingTime: string; // HH:mm
  status: BookingStatus;
  notes?: string;
  createdAt: string;
}

// --- Mock data for services ---
export const SERVICES_LIST: Service[] = [
  {
    id: 'srv-1',
    name: 'Bath & Brush',
    description: 'A thorough clean and coat refresh that leaves your pet smelling wonderful.',
    includes: ['Bath', 'Blow-dry', 'Brushing', 'Ear cleaning'],
    price: 45.00,
    durationMinutes: 60,
  },
  {
    id: 'srv-2',
    name: 'Full Groom',
    description: 'Our most complete grooming service — a head-to-tail transformation.',
    includes: ['Bath', 'Haircut', 'Brushing', 'Nail trim', 'Ear cleaning'],
    price: 75.00,
    durationMinutes: 90,
  },
  {
    id: 'srv-3',
    name: 'Nail Trim',
    description: 'Quick and stress-free nail maintenance for a comfortable pet.',
    includes: ['Nail Clipping and filing'],
    price: 20.00,
    durationMinutes: 20,
  },
  {
    id: 'srv-4',
    name: 'De-shedding Treatment',
    description: 'Dramatically reduces shedding with a deep coat treatment and thorough blow-out.',
    includes: ['Bath', 'Coat treatment', 'Blow-dry', 'Thorough Brushing'],
    price: 60.00,
    durationMinutes: 75,
  },
  {
    id: 'srv-5',
    name: 'Puppy\'s First Groom',
    description: 'A gentle, patient introduction to grooming for young dogs — low-stress and fun.',
    includes: ['Gentle bath', 'Introductory brush', 'Nail check', 'Ear cleaning'],
    price: 40.00,
    durationMinutes: 45,
  },
];

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