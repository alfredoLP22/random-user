"use client";

import Link from "next/link";
import { useUsers } from "@/app/hooks/useUsers";
import { Pagination } from "@/app/components/ui/Pagination";
import { useUserStore } from "@/app/stores/userStore";
import { Button } from "../Button";

export function UserTable({
  initialUsers,
  currentPage,
}: {
  initialUsers: any[];
  currentPage: number;
}) {
  const { filtered, search, setSearch, sortAsc, setSortAsc } =
    useUsers(initialUsers);
  const { favorites, toggleFavorite } = useUserStore();

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <input
          aria-label="Buscar usuarios"
          type="text"
          placeholder="🔍 Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 w-full sm:w-80  border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-400"
        />

        <Button title="ordenar" onClick={() => setSortAsc(!sortAsc)}>
          Ordenar {sortAsc ? "↑" : "↓"}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-300 dark:border-gray-700 rounded overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm uppercase">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Email</th>
              <th className="p-3">Teléfono</th>
              <th className="p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-200 text-sm">
            {filtered.map((user, index) => (
              <tr
                key={user.login.uuid}
                className={`border-t dark:border-gray-700 ${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-900"
                    : "bg-gray-50 dark:bg-gray-800"
                } hover:bg-blue-50 dark:hover:bg-gray-700 transition`}
              >
                <td className="p-3 font-medium whitespace-nowrap">
                  {user.name.first} {user.name.last}
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3 text-center flex justify-center items-center gap-3">
                  <Link
                    title="Ver detalle"
                    href={`/users/${user.login.uuid}`}
                    className="text-blue-500 hover:text-blue-700 text-lg transition"
                  >
                    🔎
                  </Link>
                  <Button
                    title="Marcar como favorito"
                    onClick={() => toggleFavorite(user.login.uuid)}
                  >
                    {favorites.includes(user.login.uuid) ? "⭐" : "☆"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Pagination currentPage={currentPage} />
      </div>
    </div>
  );
}
