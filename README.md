# ndt_stock_gcf

Firebase Cloud Functions for the ndt_stock project to manage staff authentication and lifecycle.

This repository contains TypeScript Cloud Functions that provide an HTTPS callable function to create staff users in Firebase Auth and save their profile to Firestore, plus a Firestore onDelete trigger that removes the corresponding Auth user when a staff document is deleted.

## Features

- Callable function `creatNewUSerStaff` — creates a Firebase Auth user with a generated password and saves the staff profile to the `staff` Firestore collection.
- Firestore trigger `deleteUserStaff` — deletes the Firebase Auth user when their `staff/{userId}` document is deleted.
- TypeScript types for staff roles and certificates.

## Files of interest

- `functions/src/users/users.ts` — callable function and Firestore delete trigger.
- `functions/src/config/config.ts` — Firebase admin initialization.
- `functions/src/utils/utils.ts` — password generator (currently returns a fixed value).
- `functions/src/types.d.ts` — Staff-related TypeScript types.

## Installation & local development

1. Clone the repo:
   git clone https://github.com/aaparicio87/ndt_stock_gcf.git
2. Install dependencies:
   npm install
3. Build (if needed):
   npm run build
4. Emulate or deploy functions:
   - Emulate locally: `firebase emulators:start --only functions,firestore`
   - Deploy: `firebase deploy --only functions`

## Usage

Call the HTTPS callable function `creatNewUSerStaff` with a payload matching the `TStaff` type, for example:

{
  "name": "Jane",
  "lastName": "Doe",
  "email": "jane.doe@example.com",
  "roles": ["USER"],
  "degree": "BSc",
  "photoUrl": "https://...",
  "cerificates": ["Other"]
}

The function responds with `{ success: true, uid }` on success or `{ success: false, error }` on failure.

## Security & TODO

- The current password generator returns a fixed password (`NdtCompany123*`). Replace with a secure random generator and a proper onboarding flow before production.
- Add input validation and stronger error handling for the callable function.
- Add logging, monitoring, and unit/integration tests.
- Consider role-based access checks so only authorized callers can create staff users.

## License

Specify a license (e.g., MIT) or add an appropriate LICENSE file.
