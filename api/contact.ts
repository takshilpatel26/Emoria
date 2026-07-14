import type { IncomingMessage, ServerResponse } from "node:http";
import {
  getContactEmailError,
  sendContactEmail,
} from "../server/routes/contact-email";

type VercelRequest = IncomingMessage & {
  body?: unknown;
};

type VercelResponse = ServerResponse<IncomingMessage>;

function sendJson(res: VercelResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    sendJson(res, 405, { success: false, message: "Method not allowed" });
    return;
  }

  try {
    sendJson(res, 200, await sendContactEmail(req.body));
  } catch (error) {
    const response = getContactEmailError(error);
    sendJson(res, response.status, response.body);
  }
}
