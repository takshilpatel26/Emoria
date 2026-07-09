# Contact Form Email Implementation Plan

## Overview
Implement email delivery for contact form submissions using Gmail SMTP so messages are sent to your personal email inbox.

## Current State
- Contact form on `/contact` page captures: name, email, subject, message
- Currently only logs to browser console, messages are lost
- No backend API endpoint exists for form submission

## Recommended Approach: Gmail SMTP via Express Backend

Send emails through Gmail's SMTP server using Nodemailer - simple setup, reliable delivery.

### What Happens
1. User fills contact form and clicks "Send Message"
2. Form data sent to `POST /api/contact` endpoint
3. Backend validates and sends email via Gmail SMTP to your inbox
4. User sees success message on page
5. Form clears for new submissions

### Implementation Steps

1. **Install Nodemailer**
   - Add `nodemailer` to dependencies

2. **Create Backend Email Handler**
   - File: `server/routes/contact-email.ts`
   - Accept: name, email, subject, message
   - Validate input
   - Send via Gmail SMTP
   - Return success/error response

3. **Register API Route**
   - File: `server/index.ts`
   - Add: `POST /api/contact` endpoint
   - Wire up contact email handler

4. **Update Contact Form**
   - File: `client/pages/Contact.tsx`
   - Replace console.log with API call to `/api/contact`
   - Add loading state during submission
   - Show success message to user
   - Show error message if submission fails
   - Clear form on success

5. **Environment Setup**
   - Create/update `.env` file
   - Add Gmail credentials:
     - `GMAIL_EMAIL` - Your Gmail address
     - `GMAIL_PASSWORD` - Gmail app-specific password (not regular password)
   - Document: User needs to enable 2FA and create app password in Gmail

## Key Files to Modify
- `server/index.ts` - Register `/api/contact` route
- `server/routes/contact-email.ts` - New file, email logic
- `client/pages/Contact.tsx` - Update form submission handler
- `.env` - Gmail credentials
- `package.json` - Add nodemailer dependency

## User Feedback
- Loading spinner/disabled button during submission
- Success toast/message: "Message sent successfully!"
- Error message: Show what went wrong (validation, network, etc.)
- Form clears after successful submission

## Gmail Setup Instructions for User
1. Enable 2-Factor Authentication on Gmail account
2. Create App Password (not account password)
3. Use Gmail address as GMAIL_EMAIL
4. Use App Password as GMAIL_PASSWORD in .env

## Security Notes
- Credentials stored in `.env` (server-side only)
- Never expose in frontend code
- App password is separate from actual Gmail password
- Consider rate limiting to prevent abuse
