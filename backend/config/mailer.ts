import Brevo from "sib-api-v3-sdk";

const apiKey = process.env.BREVO_API_KEY || "";

let transactional: any = null;

try {
  if (apiKey) {
    const client = Brevo.ApiClient.instance;
    (client.authentications as any)["api-key"].apiKey = apiKey;
    transactional = new Brevo.TransactionalEmailsApi();
    console.log("Brevo email service initialized");
  } else {
    console.log("No BREVO_API_KEY set - emails will be logged to console");
  }
} catch (e) {
  console.error("Brevo initialization error:", e);
}

export async function sendEmail({
  to,
  subject,
  html,
  fromName = "WildLife Hub",
  fromEmail = process.env.MAIL_FROM || "no-reply@wildlifehub.local",
}: {
  to: string;
  subject: string;
  html: string;
  fromName?: string;
  fromEmail?: string;
}) {
  if (!transactional) {
    console.log(
      `[MAIL-FAKE] No BREVO_API_KEY set. Would send to=${to}\nsubject=${subject}\n${html.substring(
        0,
        200
      )}...\n`
    );
    return;
  }
  
  try {
    const sendSmtpEmail = new (Brevo as any).SendSmtpEmail();
    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;
    sendSmtpEmail.sender = { name: fromName, email: fromEmail };
    sendSmtpEmail.to = [{ email: to }];
    
    await transactional.sendTransacEmail(sendSmtpEmail);
    console.log(`Email sent successfully to ${to}`);
  } catch (e) {
    console.error("[MAIL] Brevo send error:", e);
    console.log(
      `[MAIL-FAKE] Fallback log for to=${to}\nsubject=${subject}\n${html.substring(
        0,
        200
      )}...\n`
    );
  }
}
