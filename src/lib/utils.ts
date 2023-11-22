import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

//Converting file key into ASCII
export function convertToAscii(inputString: string){
  const asciiString = inputString.replace(/[^\x00-\x7F]+/g, '');
};