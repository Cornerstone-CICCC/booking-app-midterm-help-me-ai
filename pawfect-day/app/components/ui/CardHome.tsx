import { SERVICES_MASTER } from "../../types/booking";
import type { ServiceType } from "../../types/booking";
import ButtonLink from "./ButtonLink";

interface ServiceCardProps {
  serviceId: ServiceType;
}

export default function ServiceCard({
  serviceId,
}: ServiceCardProps) {
  const service = SERVICES_MASTER[serviceId];

  return (
    <article className="flex h-full w-full overflow-hidden rounded-xl bg-white">
      <div className="flex h-full w-full flex-col p-8">
        <h3 className="font-display text-3xl font-semibold text-brown">
          <span className="mr-2">{service.icon}</span>
          {service.name}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-brown-mid">
          {service.description}
        </p>

        {/* Push this whole section to the bottom */}
        <div className="mt-auto pt-5">
          <div className="flex items-center justify-start gap-4">
            <span className="text-sm text-brown-mid">
              ⏱️ {service.durationMinutes} min
            </span>

            <span className="text-brown-mid">
              Starting from
              <span className="ml-2 font-semibold text-brown">
                ${service.startingPrice}
              </span>
            </span>
          </div>

          <ButtonLink
            href={`/book`}
            variant="secondary"
            size="medium"
            className="mt-4 w-fit"
          >
            Select Service
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}