
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateReferralCode() {
  return Math.random().toString(36).substring(2, 15)
}

export function getWaitlistPosition(referrals: number) {
  const basePosition = 1000
  return Math.max(1, basePosition - (referrals * 10))
}