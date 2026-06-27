/**
 * Run from backend/: node scripts/test-email.js [recipient]
 */
require("dotenv").config();

const Brevo = require("sib-api-v3-sdk");

const mailFrom =
  process.env.MAIL_FROM || "le.domaine.du.chevreuil.blanc@gmail.com";
const testRecipient = process.argv[2] || mailFrom;
const apiKey = (process.env.BREVO_API_KEY || "").trim();

async function main() {
  console.log("Checking Brevo connection...");
  console.log("MAIL_FROM:", mailFrom);
  console.log("BREVO_API_KEY configured:", Boolean(apiKey));

  if (!apiKey) {
    console.error("BREVO_API_KEY is missing from backend/.env");
    process.exit(1);
  }

  const client = Brevo.ApiClient.instance;
  client.authentications["api-key"].apiKey = apiKey;

  try {
    const accountApi = new Brevo.AccountApi();
    const account = await accountApi.getAccount();
    console.log("Brevo API key is valid for account:", account.email);
  } catch (error) {
    const body = error.response?.body || error.response?.text;
    const message =
      typeof body === "object" ? body.message : body || error.message;
    console.error("Brevo check failed:", message);
    console.error("\nFix:");
    console.error("1. Log in to https://app.brevo.com");
    console.error("2. Go to SMTP & API → API Keys");
    console.error("3. Create a new key with transactional email access enabled");
    console.error("4. Update BREVO_API_KEY in backend/.env");
    console.error("5. Verify MAIL_FROM sender under Senders & Domains");
    process.exit(1);
  }

  console.log(`Sending test email to ${testRecipient}...`);

  try {
    const api = new Brevo.TransactionalEmailsApi();
    const email = new Brevo.SendSmtpEmail();
    email.subject = "Test Brevo • Domaine du Chevreuil Blanc";
    email.htmlContent =
      "<p>Ce courriel confirme que l'envoi Brevo fonctionne correctement.</p>";
    email.sender = { name: "Domaine du Chevreuil Blanc", email: mailFrom };
    email.to = [{ email: testRecipient }];

    await api.sendTransacEmail(email);
    console.log("Test email sent successfully.");
  } catch (error) {
    const body = error.response?.body || error.response?.text;
    const message =
      typeof body === "object" ? body.message : body || error.message;
    console.error("Test send failed:", message);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
