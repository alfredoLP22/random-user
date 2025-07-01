import Link from "next/link";
import { notFound } from "next/navigation";
import { findUserByUuid } from "@/app/lib/api";
import { UserHeader } from "@/app/components/ui/users/UserHeader";
import { UserDetails } from "@/app/components/ui/users/UserDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await findUserByUuid(id);

  if (!user) return notFound();

  return (
    <section className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition-all duration-300">
      <UserHeader user={user} />
      <UserDetails user={user} />

      <div className="mt-10 text-center">
        <Link
          href="/users"
          className="inline-block px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-all"
        >
          ← Volver a la lista
        </Link>
      </div>
    </section>
  );
}
