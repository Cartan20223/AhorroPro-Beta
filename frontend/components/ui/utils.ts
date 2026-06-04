import { type ClassValue } from "./types";

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat()
    .filter(Boolean)
    .map((v) => {
      if (typeof v === "string") return v;
      if (typeof v === "object" && v !== null) {
        return Object.entries(v)
          .filter(([, val]) => Boolean(val))
          .map(([key]) => key)
          .join(" ");
      }
      return "";
    })
    .join(" ")
    .trim();
}
