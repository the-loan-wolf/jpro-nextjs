"use client";

import { redirect } from "next/navigation";
import { userLogOut } from "@/app/utils/firebase-fn";
import { Dispatch, SetStateAction } from "react";

export function isLoggedIn(): boolean {
  let loggedInUserId;
  if (typeof window !== "undefined") {
    loggedInUserId = localStorage.getItem("loggedInUserId");
  }
  if (loggedInUserId) return true;
  else return false;
}

export async function logoutAndRedirect(): Promise<void> {
  try {
    const value = await userLogOut();
    if (value === "success" && typeof window !== "undefined") {
      console.log("logged out successfull");
      localStorage.removeItem("loggedInUserId");
      redirect("/app/login");
    }
  } catch (error) {
    console.error(error);
  }
}

function updateChildElement(
  elementId: string,
  newIdSuffix: number,
  clone: HTMLDivElement
) {
  const element = clone.querySelector(`#${elementId}`) as HTMLInputElement;
  const label = clone.querySelector(
    `label[for="${elementId}"]`
  ) as HTMLLabelElement;
  if (element) {
    element.id = elementId + newIdSuffix;
    element.name = element.id;
    element.value = "";
  }
  if (label) {
    label.htmlFor = elementId + newIdSuffix;
  }
}

export function addNewField(
  e: React.MouseEvent<HTMLButtonElement>,
  counter: number,
  setCounter: Dispatch<SetStateAction<number>>
) {
  const button = e.target as HTMLElement;
  const containerDiv = button.parentNode?.firstChild as HTMLElement;
  if (!containerDiv || !button) return;
  const containerId = containerDiv.id;
  const clone = containerDiv.cloneNode(true) as HTMLDivElement;
  clone.id = `${containerId}${counter}`;
  const childCount = containerDiv.childNodes.length;
  for (let i = 0; i < childCount; i++) {
    const id = containerDiv.children[i].children[1].id;
    updateChildElement(id, counter, clone);
  }
  const parent = button.parentNode;
  if (parent) {
    parent.insertBefore(clone, button);
  }
  setCounter((preValue) => preValue + 1);
}