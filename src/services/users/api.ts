import { BASE_URL } from "@/services/settings/constants";
import { User } from "@/types";

/**
 * Fetches a list of all users from the mock API.
 *
 * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
 *
 * @example
 * const users = await getUsers();
 * console.log(users[0].name);
 */
export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
};

/**
 * Fetches a single user by ID from the mock API.
 *
 * @param {number} id - The ID of the user to fetch.
 * @returns {Promise<User>} A promise that resolves to a User object.
 *
 * @example
 * const user = await getUser(1);
 * console.log(user.name);
 */
export const getUser = async (id: number): Promise<User> => {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  return res.json();
};
