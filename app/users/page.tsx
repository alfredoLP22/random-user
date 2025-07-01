import { getUsers } from "@/app/lib/api";
import { UserTable } from "@/app/components/ui/UserTable";
import { User } from "@/app/lib/types";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1");
  const users: User[] = await getUsers(currentPage);
  return <UserTable initialUsers={users} currentPage={currentPage} />;
}
