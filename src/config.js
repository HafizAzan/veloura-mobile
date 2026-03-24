import Constants from "expo-constants";

/**
 * API base URL – Veloura web backend.
 * Priority: EXPO_PUBLIC_API_URL (.env / EAS) → app.json expo.extra.apiUrl → localhost.
 */
const fromEnv =
  typeof process !== "undefined" ? process.env?.EXPO_PUBLIC_API_URL : undefined;
const fromExpoExtra = Constants.expoConfig?.extra?.apiUrl;

export const API_BASE =
  (fromEnv && String(fromEnv).trim()) ||
  (fromExpoExtra && String(fromExpoExtra).trim()) ||
  "http://localhost:3001/api";
