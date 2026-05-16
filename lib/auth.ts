import { redirect } from "next/navigation"

export async function getCurrentUser() {
  // read session/cookie/token here
  return null
}

export async function requireUser() {
  const user = await getCurrentUser()

  if (!user) redirect("/signin")

  return user
}
