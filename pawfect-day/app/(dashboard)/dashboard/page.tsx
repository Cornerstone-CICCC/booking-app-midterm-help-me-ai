import DashboardClient from "@/app/components/dashboard/dashboard-client";
import { getBookings } from "@/app/models/bookings";

export default async function DashboardPage() {
	const bookings = await getBookings();
  
  return <DashboardClient bookings={bookings} />;
}
