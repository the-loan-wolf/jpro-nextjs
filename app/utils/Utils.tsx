"use client"

import { redirect } from "next/navigation";
import { userLogOut } from "@/app/utils/firebase-fn";

export function isLoggedIn(): boolean {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  if (loggedInUserId) return true;
  else return false;
}

export async function logoutAndRedirect(): Promise<void> {
  const value = await userLogOut();
  if (value === "success") {
    localStorage.removeItem("loggedInUserId");
    redirect("/app/login");
  }
}
