import { notFound } from "next/navigation";
import { getBookingById } from "@/app/models/bookings";
import DetailsClient from "./details-client";
import { getCurrentUserId } from "@/app/lib/auth";
import {getUserById} from "@/app/models/users";

interface PageProps {
	params: Promise<{ id: string }>;
}

export default async function BookingDetailsPage({ params }: PageProps) {
	const resolvedParams = await params;
	const booking = await getBookingById(resolvedParams.id);

  const myId = await getCurrentUserId();
  const me = await getUserById(myId as string);

	if (!booking) {
		notFound();
	}

	return <DetailsClient booking={booking} user={me} />;
}
