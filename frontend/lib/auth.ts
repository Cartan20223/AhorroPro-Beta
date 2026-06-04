import { api, type User } from "./api";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export async function loginUser(
  email: string,
  password: string
): Promise<User> {
  return api.login(email, password);
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<User> {
  return api.register(name, email, password);
}

export async function logoutUser(): Promise<void> {
  await api.logout();
}
