"use client";

import Link from "next/link";
import { useUsers } from "@/app/hooks/useUsers";
import { Pagination } from "@/app/components/ui/Pagination";
import { useUserStore } from "@/app/stores/userStore";

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
          className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded px-4 py-2 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={() => setSortAsc(!sortAsc)}
          className="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Ordenar {sortAsc ? "↑" : "↓"}
        </button>
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
                  <button
                    title="Ver dirección"
                    onClick={() =>
                      alert(
                        `Dirección: ${user.location.street.number} ${user.location.street.name}`
                      )
                    }
                    className="text-green-600 hover:text-green-800 text-lg transition"
                  >
                    📍
                  </button>
                  <Link
                    title="Ver detalle"
                    href={`/users/${user.login.uuid}`}
                    className="text-blue-500 hover:text-blue-700 text-lg transition"
                  >
                    🔎
                  </Link>
                  <button
                    title="Marcar como favorito"
                    onClick={() => toggleFavorite(user.login.uuid)}
                    className="text-yellow-500 hover:text-yellow-600 text-lg transition"
                  >
                    {favorites.includes(user.login.uuid) ? "⭐" : "☆"}
                  </button>
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
