# Fix production contact email delivery

## Goal
Make the deployed Vercel contact form reach the email API reliably and show a useful user-facing error when the API returns a non-JSON response.

## Findings
- `client/pages/Contact.tsx` sends `POST /api/contact` and unconditionally calls `response.json()`.
- `server/index.ts` registers `POST /api/contact`, and `server/routes/contact-email.ts` returns JSON for validation, mail, and server errors.
- `api/[...path].ts` wraps the Express app for Vercel, but `vercel.json` currently applies a catch-all rewrite from every path to `/index.html`.
- The production screenshot shows a `405` response and an unparseable/non-JSON response, which means the request is falling through to deployment routing instead of reaching the Express email handler.

## Recommended implementation
1. Add an explicit Vercel API entry point for `/api/contact` that invokes the existing contact handler/server app, rather than relying on the catch-all function path.
2. Update `vercel.json` routing so `/api/*` is handled by the Vercel function before the SPA fallback, while non-API routes continue resolving to `dist/spa/index.html`.
3. Preserve the existing Nodemailer and environment-variable behavior; do not duplicate email logic or expose credentials.
4. Harden `Contact.tsx` response handling by checking the response content type before parsing JSON and showing a clear fallback message for HTML, 405, or other non-JSON failures.
5. Validate with typecheck, tests, production build, and a local POST request to `/api/contact` using invalid input to confirm JSON error behavior without sending mail. Review the generated Vercel output/config to ensure API and SPA routes coexist.

## Files expected to change
- `vercel.json`
- `api/contact.ts` (new dedicated Vercel function if required by the existing adapter)
- `client/pages/Contact.tsx`
- Possibly `server/index.ts` only if the dedicated function needs a small, shared route export; avoid changing mail logic unless validation exposes a separate issue.

## Success criteria
- Production `POST /api/contact` no longer returns the SPA HTML/405 fallback.
- Valid submissions reach Nodemailer and return JSON success/error responses.
- Invalid submissions return a readable JSON validation error.
- The contact page never throws a JSON parse error when the deployment returns a non-JSON response.
- Existing local API and SPA routes continue working.
