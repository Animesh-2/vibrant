import { cookies } from "next/headers";

export function getUserRole() {
  const cookieStore = cookies();
  return cookieStore.get("role")?.value || "DEFAULT";
}
