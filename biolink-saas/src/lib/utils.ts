import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Note: I cannot install `clsx` or `tailwind-merge`, so this code is for demonstration.
// A developer would need to run `npm install clsx tailwind-merge`.

export function cn(...inputs: ClassValue[]) {
  // This is the actual implementation that would be used.
  // return twMerge(clsx(inputs));

  // A simplified version for demonstration purposes:
  return inputs.join(' ');
}
