import { SERVICES_MASTER } from "../../types/booking";
import type { ServiceType } from "../../types/booking";
import ButtonLink from "./ButtonLink";

interface ServiceCardProps {
  serviceId: ServiceType;
  href?: string;
}

export default function ServiceCard({
serviceId,
}: ServiceCardProps) {
  const service = SERVICES_MASTER[serviceId];

  return (
    <div
      className="
        flex
        flex-row
        rounded-xl
        w-full
        bg-white
        overflow-hidden
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

      <h3 className="font-display text-xl font-semibold text-brown">
        {service.name}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-brown-mid">
        {service.description}
      </p>

      <div className="mt-5 flex items-center justify-between gap-4">
        <span
          className="
            rounded-full
            bg-warm-muted
            px-3
            py-1
            text-sm
            text-brown-mid
          "
        >
          ~ {service.durationMinutes} minutes
        </span>

        <span className="font-semibold text-brown">
          Starting from ${service.startingPrice}
        </span>
      </div>
      
      <ButtonLink href={`/services/${serviceId}`} variant="primary" size="medium" className="mt-4 w-fit">
        Select This Service
      </ButtonLink>
      </div>
      </div>
  );
}