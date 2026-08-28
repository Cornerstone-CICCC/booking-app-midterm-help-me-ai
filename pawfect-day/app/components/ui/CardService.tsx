import { SERVICES_MASTER } from "../../types/booking";
import type { ServiceType } from "../../types/booking";
import ButtonLink from "./ButtonLink";

interface ServiceCardProps {
  serviceId: ServiceType;
  href?: string;
}

export default function ServiceCard({ serviceId }: ServiceCardProps) {
  const service = SERVICES_MASTER[serviceId];

  return (
    <div
      className="
        flex
        flex-col
        md:flex-row
        lg:flex-row
        rounded-xl
        w-full
        bg-white
        overflow-hidden
        border
        border-warm-border
      
      "
    >
      {/* Left side - Image */}
      <div className="flex flex-col w-full">
        {service.imageUrl && (
          <img
            src={service.imageUrl}
            alt={service.name}
            className="h-full object-cover"
          />
        )}
      </div>

      {/* Right side - Details */}

      <div className="flex flex-col p-8 w-full">
        <div className="flex flex-row items-center gap-2">
          <span className="mr-2 text-4xl">{service.icon}</span>
          <span>
            <h3 className="font-display text-3xl font-semibold text-brown">
              {service.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-brown-mid">
              {service.description}
            </p>
          </span>
        </div>

        <div className="mt-4 flex flex-col gap-2 bg-cream p-4 rounded-lg">
          <p className="font-semibold text-sm text-brown-mid  uppercase">
            includes
          </p>
          <span className="text-sm text-brown">{service.includes}</span>
        </div>

        <div className="mt-5 flex items-center justify-start gap-4">
          <span
            className="
            text-sm
            text-brown-mid
          "
          >
            ⏱️ {service.durationMinutes} min
          </span>

          <span className=" text-brown-mid">
            Starting from
            <span className="font-semibold text-brown ml-2">
              ${service.startingPrice}
            </span>
          </span>
        </div>

        <ButtonLink
          href={`/book`}
          variant="primary"
          size="medium"
          className="mt-4 w-fit"
        >
          Book This Service
        </ButtonLink>
      </div>
    </div>
  );
}
