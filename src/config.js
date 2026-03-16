/**
 * API base URL – same backend as Veloura web.
 * Set EXPO_PUBLIC_API_URL in .env or when running (e.g. EXPO_PUBLIC_API_URL=http://192.168.1.5:3000/api).
 * Device/emulator must reach this URL (use your machine IP for physical device).
 */
export const API_BASE = (typeof process !== "undefined" && process.env?.EXPO_PUBLIC_API_URL) || "http://localhost:3001/api";
