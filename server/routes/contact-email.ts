import nodemailer from "nodemailer";
import { z } from "zod";
import type { RequestHandler } from "express";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(1, "Message is required").max(5000),
});

let transporter: nodemailer.Transporter | null = null;

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );
}

function getTransporter() {
  if (!transporter) {
    const gmailEmail = process.env.GMAIL_EMAIL;
    const gmailPassword = process.env.GMAIL_PASSWORD;

    if (!gmailEmail || !gmailPassword) {
      throw new Error("Gmail credentials not configured in environment variables");
    }

    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailEmail,
        pass: gmailPassword,
      },
    });
  }
  return transporter;
}

export async function sendContactEmail(input: unknown) {
  const body = ContactSchema.parse(input);
  const emailTransporter = getTransporter();
  const name = escapeHtml(body.name);
  const email = escapeHtml(body.email);
  const subject = escapeHtml(body.subject);
  const message = escapeHtml(body.message);

  await emailTransporter.sendMail({
    from: process.env.GMAIL_EMAIL,
    to: process.env.GMAIL_EMAIL,
    subject: `Contact Form: ${body.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2>New Contact Form Submission</h2>
        <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
          <h3>Message:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>This email was sent from your Emoria Films contact form.</p>
        </div>
      </div>
    `,
    replyTo: body.email,
  });

  return { success: true, message: "Email sent successfully!" };
}

export function getContactEmailError(error: unknown) {
  if (error instanceof z.ZodError) {
    return {
      status: 400,
      body: { success: false, message: "Validation error", errors: error.errors },
    };
  }

  console.error("Email error:", error);
  const errorCode =
    error && typeof error === "object" && "code" in error
      ? String(error.code)
      : undefined;
  const isConfigurationError =
    error instanceof Error && error.message.includes("credentials not configured");
  const isAuthenticationError = errorCode === "EAUTH";

  return {
    status: isConfigurationError ? 503 : 502,
    body: {
      success: false,
      message: isConfigurationError
        ? "Email service is not configured. Please try again later."
        : isAuthenticationError
          ? "Email service rejected the configured credentials. Please verify the Gmail app password."
          : "Email service could not send the message. Please try again later.",
    },
  };
}

export const handleContactEmail: RequestHandler = async (req, res) => {
  try {
    res.json(await sendContactEmail(req.body));
  } catch (error) {
    const response = getContactEmailError(error);
    res.status(response.status).json(response.body);
  }
};
