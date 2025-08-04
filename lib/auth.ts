import { User } from "@/types/user";

export const saveUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem("user");
  return data ? JSON.parse(data) : null;
};

export const clearUser = () => {
  localStorage.removeItem("user");
};
