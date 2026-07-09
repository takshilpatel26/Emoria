import { RequestHandler } from "express";
import nodemailer from "nodemailer";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(1, "Message is required").max(5000),
});

type ContactRequest = z.infer<typeof ContactSchema>;

let transporter: nodemailer.Transporter | null = null;

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

export const handleContactEmail: RequestHandler = async (req, res) => {
  try {
    const body = ContactSchema.parse(req.body);

    const transporter = getTransporter();

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: process.env.GMAIL_EMAIL,
      subject: `Contact Form: ${body.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2>New Contact Form Submission</h2>
          <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px;">
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Subject:</strong> ${body.subject}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
            <h3>Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${body.message}</p>
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This email was sent from your Emoria Films contact form.</p>
          </div>
        </div>
      `,
      replyTo: body.email,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    console.error("Email error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
    });
  }
};
