import type { IncomingMessage, ServerResponse } from "node:http";
import nodemailer from "nodemailer";

export default async function handler(
  req: IncomingMessage & { body?: any },
  res: ServerResponse
) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.end();
  }

  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_EMAIL,
    to: process.env.GMAIL_EMAIL,
    subject: `Contact Form: ${subject}`,
    html: `
      <h2>New Contact Form Submission</h2>

      <p><b>Name:</b> ${name}</p>

      <p><b>Email:</b> ${email}</p>

      <p><b>Subject:</b> ${subject}</p>

      <p><b>Message:</b></p>

      <p>${message}</p>
    `,
    replyTo: email,
  });

  res.statusCode = 200;

  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify({
    success: true
  }));
}