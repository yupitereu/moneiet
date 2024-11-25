import { clsx as clsxOrigin, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsxOrigin(inputs));
};

export const clsx = clsxOrigin();
