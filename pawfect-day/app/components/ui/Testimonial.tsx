import {TESTIMONIALS_MASTER} from "../../types/testimonial";

interface TestimonialProps {
  testimonialId: string;
}

export default function Testimonial({ testimonialId }: TestimonialProps) {
  const testimonial = TESTIMONIALS_MASTER[testimonialId as keyof typeof TESTIMONIALS_MASTER];


  return (
    <div className="flex flex-col gap-4 p-6 bg-cream/10 rounded-xl shadow-md">
      <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        {Array.from({ length: testimonial.star }).map((_, index) => (
          <span key={index} className="text-yellow-500">
            ★
          </span>
        ))}
      </div>
      </div>
      <p className="text-md font-semibold italic text-cream/85 font-display">"{testimonial.content}"</p>
        <div>
          <h3 className="font-display text-xl font-semibold text-cream">
            {testimonial.name}
          </h3>
          <p className="text-sm text-cream/50">{testimonial.dog_breed} owner</p>
        </div>
    </div>
  );
}