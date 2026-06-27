import Brevo from "sib-api-v3-sdk";

export type SendEmailResult = {
  ok: boolean;
  error?: string;
  devFallback?: boolean;
};

let transactional: any = null;
let initAttempted = false;

function getApiKey(): string {
  return process.env.BREVO_API_KEY?.trim() || "";
}

function getTransactionalApi(): any {
  if (initAttempted) return transactional;

  initAttempted = true;
  const apiKey = getApiKey();

  if (!apiKey) {
    console.warn(
      "No BREVO_API_KEY set — emails will not be sent (console fallback in development only)."
    );
    return null;
  }

  try {
    const client = Brevo.ApiClient.instance;
    (client.authentications as any)["api-key"].apiKey = apiKey;
    transactional = new Brevo.TransactionalEmailsApi();
    console.log("Brevo email service initialized");
  } catch (e) {
    console.error("Brevo initialization error:", e);
    transactional = null;
  }

  return transactional;
}

function parseBrevoError(error: unknown): string {
  const err = error as {
    status?: number;
    response?: { body?: { message?: string; code?: string }; text?: string };
    message?: string;
  };

  const body = err.response?.body;
  if (body?.message) {
    if (body.code === "unauthorized" && body.message.includes("not enabled")) {
      return "Brevo API key is disabled or invalid. Create a new key in Brevo → SMTP & API → API Keys.";
    }
    return body.message;
  }

  if (typeof err.response?.text === "string") {
    try {
      const parsed = JSON.parse(err.response.text);
      if (parsed.message) return parsed.message;
    } catch {
      return err.response.text;
    }
  }

  return err.message || "Failed to send email via Brevo";
}

export async function checkBrevoConnection(): Promise<SendEmailResult> {
  const api = getTransactionalApi();
  if (!api) {
    return { ok: false, error: "BREVO_API_KEY is not configured" };
  }

  try {
    const accountApi = new Brevo.AccountApi();
    await accountApi.getAccount();
    return { ok: true };
  } catch (error) {
    return { ok: false, error: parseBrevoError(error) };
  }
}

export async function sendEmail({
  to,
  subject,
  html,
  fromName = "Domaine du Chevreuil Blanc",
  fromEmail = process.env.MAIL_FROM || "le.domaine.du.chevreuil.blanc@gmail.com",
}: {
  to: string;
  subject: string;
  html: string;
  fromName?: string;
  fromEmail?: string;
}): Promise<SendEmailResult> {
  const api = getTransactionalApi();

  if (!api) {
    const preview = html.substring(0, 200);
    console.log(
      `[MAIL-FAKE] No BREVO_API_KEY set. Would send to=${to}\nsubject=${subject}\n${preview}...\n`
    );

    if (process.env.NODE_ENV === "production") {
      return { ok: false, error: "Email service is not configured" };
    }

    return { ok: true, devFallback: true };
  }

  try {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.sender = { name: fromName, email: fromEmail };
    sendSmtpEmail.to = [{ email: to }];
    sendSmtpEmail.replyTo = { name: fromName, email: fromEmail };
    sendSmtpEmail.headers = {
      "X-Mailer": "Domaine du Chevreuil Blanc System",
      "X-Message-Type": "transactional",
    };

    await api.sendTransacEmail(sendSmtpEmail);
    console.log(`Email sent successfully to ${to}`);
    return { ok: true };
  } catch (error) {
    const message = parseBrevoError(error);
    console.error("[MAIL] Brevo send error:", message);
    return { ok: false, error: message };
  }
}
