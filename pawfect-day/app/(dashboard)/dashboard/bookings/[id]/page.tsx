import { notFound } from "next/navigation";
import { getBookingById } from "@/app/models/bookings";
import DetailsClient from "./details-client";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function BookingDetailsPage({ params }: PageProps) {
	const resolvedParams = await params;
	const booking = await getBookingById(resolvedParams.id);

	if (!booking) {
		notFound();
	}

	return <DetailsClient booking={booking} />;
}
