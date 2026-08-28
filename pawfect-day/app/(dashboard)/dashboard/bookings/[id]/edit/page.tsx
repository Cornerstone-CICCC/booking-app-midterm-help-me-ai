import { notFound } from "next/navigation";

import { getBookingById } from "@/app/models/bookings";

import EditBookingClient from "./edit-client";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function EditBookingPage({ params }: PageProps) {
	const resolvedParams = await params;
	const booking = await getBookingById(resolvedParams.id);

	if (!booking) {
		notFound();
	}

	return <EditBookingClient booking={booking} />;
}
