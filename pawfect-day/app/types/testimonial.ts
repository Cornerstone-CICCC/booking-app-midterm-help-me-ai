export interface Testimonial {
  id: string;
  name: string;
  dog_breed: string;
  content: string;
  star: number;
}


export const TESTIMONIALS_MASTER: Record<string, Testimonial> = {
  testimonial_1: {
    id: "1",
    name: "John Doe",
    dog_breed: "Golden Retriever",
    content:
      "Pawfect Day provided an amazing grooming experience for my dog! The staff was friendly and professional, and my dog looked fantastic after the grooming session. Highly recommend!",
    star: 5,
  },
  testimonial_2: {
    id: "2",
    name: "Jane Smith",
    dog_breed: "Labrador Retriever",
    content:
      "I was impressed with the level of care and attention my dog received at Pawfect Day. The groomers were gentle and patient, and my dog came home looking and smelling great. I will definitely be returning!",
    star: 4,
  },
  testimonial_3: {
    id: "3",
    name: "Michael Johnson",
    dog_breed: "French Bulldog",
    content:
      "Pawfect Day is the best grooming service I've ever used! The staff is knowledgeable and passionate about their work, and my dog always looks great after a visit.",
    star: 5,
  },
  testimonial_4: {
    id: "4",
    name: "Sarah Williams",
    dog_breed: "Poodle",
    content:
      "I've tried several grooming services, but none compare to Pawfect Day. The attention to detail is unmatched, and my dog always comes back looking like a million dollars!",
    star: 5,
  },
};