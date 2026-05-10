import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function optimizeImagePath(path: string | undefined | null): string {
  if (!path) return '';
  
  // If it's an external URL or data URI, return as is
  if (path.startsWith('http') || path.startsWith('https') || path.startsWith('data:')) {
    return path;
  }
  
  // Normalize local paths to use the new .webp images at the root
  // This handles old paths from Firestore or hardcoded strings
  // Example: /images/room1.png -> /room1.webp
  // Example: /assets/gallery1.jpeg -> /gallery1.webp
  const filename = path.split('/').pop()?.split('.')[0];
  if (filename) {
    return `/${filename.toLowerCase()}.webp`;
  }
  
  return path;
}
