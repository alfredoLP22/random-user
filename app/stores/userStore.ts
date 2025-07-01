import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserStore {
  favorites: string[];
  toggleFavorite: (uuid: string) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (uuid) => {
        const isFav = get().favorites.includes(uuid);
        set({
          favorites: isFav
            ? get().favorites.filter((id) => id !== uuid)
            : [...get().favorites, uuid],
        });
      },
    }),
    {
      name: "user-favorites",
    }
  )
);
