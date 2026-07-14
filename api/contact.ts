import type { IncomingMessage, ServerResponse } from "node:http";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  try {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    res.end(
      JSON.stringify({
        node: process.version,
        gmailEmail: !!process.env.GMAIL_EMAIL,
        gmailPassword: !!process.env.GMAIL_PASSWORD,
        cwd: process.cwd(),
        ok: true,
      })
    );
  } catch (err) {
    res.statusCode = 500;
    res.end(String(err));
  }
}