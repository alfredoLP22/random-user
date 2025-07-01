import { useMemo, useState } from "react";
import { User } from "@/app/lib/types";

export const useUsers = (initialUsers: User[]) => {
  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const filtered = useMemo(() => {
    return initialUsers
      .filter((u) =>
        `${u.name.first} ${u.name.last}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .sort((a, b) =>
        sortAsc
          ? a.name.first.localeCompare(b.name.first)
          : b.name.first.localeCompare(a.name.first)
      );
  }, [initialUsers, search, sortAsc]);

  return { filtered, search, setSearch, sortAsc, setSortAsc };
};
