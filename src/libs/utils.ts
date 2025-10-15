import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Converts a number representing seconds into a time span string formatted as "HH:mm:ss".
 *
 * @param value - The number of seconds to convert.
 * @returns A string representing the time span in "HH:mm:ss" format, with each unit padded to two digits.
 *
 * @example
 * ```typescript
 * convertNumberToTimeSpan(3661); // "01:01:01"
 * ```
 */
export const convertNumberToTimeSpan = (value: number) => {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const convertTimeSpanToNumber = (timeSpan: string) => {
    const [hours, minutes, seconds] = timeSpan.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
};

/**
 * Parses a date string in the format "YYYY-MM-DD" and returns a Date object.
 *
 * @param dateStr - The date string to parse, expected in "YYYY-MM-DD" format.
 * @returns A Date object representing the parsed date, or `null` if the input is invalid.
 */
export const parseDate = (dateStr: string): Date | null => {
  const [year, month, day] = dateStr.split("-");
  console.log(year, month, day);
  if (!day || !month || !year) return null;
  
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}


/**
 * Converts a UTF-8 string to its Base64-encoded representation.
 *
 * @param str - The input string to encode.
 * @returns The Base64-encoded string.
 */
export const toBase64 = (str: string): string => {
    return Buffer.from(str, "utf-8").toString("base64");
};


/**
 * Decodes a Base64-encoded string into a UTF-8 string.
 *
 * @param base64 - The Base64-encoded string to decode.
 * @returns The decoded UTF-8 string.
 */
export const fromBase64 = (base64: string): string => {
    return Buffer.from(base64, "base64").toString("utf-8");
};