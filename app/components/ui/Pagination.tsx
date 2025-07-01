"use client";
import { useRouter } from "next/navigation";

export function Pagination({ currentPage }: { currentPage: number }) {
  const router = useRouter();

  const goToPage = (page: number) => {
    router.push(`/users?page=${page}`);
  };

  return (
    <div className="flex justify-between mt-4 items-center">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        aria-label="Página anterior"
      >
        Anterior
      </button>
      <span className="text-sm">Página {currentPage}</span>
      <button
        onClick={() => goToPage(currentPage + 1)}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        aria-label="Página siguiente"
      >
        Siguiente
      </button>
    </div>
  );
}
