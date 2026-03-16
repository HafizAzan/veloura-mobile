# Veloura Mobile – Routes & Auth (same as web)

## Routes (screens)

| Screen     | Route name  | Description                    |
|-----------|-------------|--------------------------------|
| Home      | `Home`      | Main screen, Sign in / Logout  |
| Login     | `Login`     | Email + password, link to Signup |
| Signup    | `Signup`    | Name, email, password, link to Login |
| Verify OTP| `VerifyOtp` | Email verification code (params: `email`, `from`, `next`) |

## Auth flow (matches Veloura web)

- **Login** → success → Home. If `needsConfirmation` → VerifyOtp (from=login).
- **Signup** → success → Home. If `needsConfirmation` → VerifyOtp (from=signup).
- **VerifyOtp** → success → `next` screen (default Home).
- **Logout** → POST `/api/auth/logout`, clear user, stay on Home.

## API base URL

App calls the same Veloura backend as the web app. Set the base URL:

- **Local:** Run Veloura web (e.g. `npm run dev` in `veloura`), then in mobile:
  - Emulator: `http://localhost:3000/api` (default in `src/config.js`).
  - Physical device: use your machine IP, e.g. create `.env` in `veloura-mobile` with:
    ```
    EXPO_PUBLIC_API_URL=http://192.168.1.5:3000/api
    ```
    (Replace with your actual IP.)

## Adding more screens (like web)

You can add more screens and register them in `src/navigation/AppNavigator.js`, e.g.:

- Shop, Cart, Checkout, Account, Contact, etc.
- Reuse `src/theme/colors.js` and auth via `useAuth()`.
