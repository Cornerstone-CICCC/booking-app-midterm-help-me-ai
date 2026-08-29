import DashboardClient from "@/app/components/dashboard/dashboard-client";
import { getBookings } from "@/app/models/bookings";
import { getCurrentUser } from "@/app/lib/auth";


export default async function DashboardPage() {
	const bookings = await getBookings();
  const me = await getCurrentUser();

  console.log("Current User:", me);

  return <DashboardClient bookings={bookings} user={me} />;
}
