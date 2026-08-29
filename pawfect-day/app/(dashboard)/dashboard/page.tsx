import DashboardClient from "@/app/components/dashboard/dashboard-client";
import { getBookings } from "@/app/models/bookings";
import { getCurrentUserId } from "@/app/lib/auth";
import {getUserById} from "@/app/models/users";


export default async function DashboardPage() {
	const bookings = await getBookings();
  const myId = await getCurrentUserId();
  const me = await getUserById(myId as string);

  return <DashboardClient bookings={bookings} user={me} />;
}
