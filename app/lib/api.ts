import { User } from "./types";

export async function getUsers(page: number = 1, results: number = 20) {
  const res = await fetch(
    `https://randomuser.me/api/?results=${results}&page=${page}&seed=abc`
  );
  const data = await res.json();
  return data.results;
}

export async function findUserByUuid(
  uuid: string,
  maxPages = 10,
  resultsPerPage = 20
): Promise<User | null> {
  for (let page = 1; page <= maxPages; page++) {
    const users = await getUsers(page, resultsPerPage);
    const user = users.find((u: User) => u.login.uuid === uuid);
    if (user) return user;
  }
  return null;
}
