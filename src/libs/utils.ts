import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const convertNumberToTimeSpan = (value: number) => {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const parseDate = (dateStr: string): Date | null => {
  const [year, month, day] = dateStr.split("-");
  console.log(year, month, day);
  if (!day || !month || !year) return null;
  
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}


export const toBase64 = (str: string): string => {
    return Buffer.from(str, "utf-8").toString("base64");
};


export const fromBase64 = (base64: string): string => {
    return Buffer.from(base64, "base64").toString("utf-8");
};