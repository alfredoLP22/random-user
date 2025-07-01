"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { User } from "@/app/lib/types";
import { useUserStore } from "@/app/stores/userStore";
import { useEditableUserStore } from "@/app/stores/editableUserStore";

export function UserHeader({ user }: { user: User }) {
  const { getUser } = useEditableUserStore();
  const edited = getUser(user.login.uuid);

  const { favorites, toggleFavorite } = useUserStore();
  const [isFav, setIsFav] = useState(false);

  const fullName = edited
    ? `${edited.firstName} ${edited.lastName}`
    : `${user.name.first} ${user.name.last}`;

  const email = edited ? edited.email : user.email;

  useEffect(() => {
    setIsFav(favorites.includes(user.login.uuid));
  }, [favorites, user.login.uuid]);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        <Image
          src={user.picture.large}
          alt={`${user.name.first} ${user.name.last}`}
          width={140}
          height={140}
          className="rounded-full ring-4 ring-blue-500 dark:ring-blue-400 shadow-md"
        />
        <button
          aria-label="Marcar como favorito"
          onClick={() => toggleFavorite(user.login.uuid)}
          title="Marcar como favorito"
          className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 text-xl rounded-full p-1 shadow hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isFav ? "⭐" : "☆"}
        </button>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-800 dark:text-white">
        {fullName}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
    </div>
  );
}
