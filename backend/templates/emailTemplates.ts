export function verifyEmailTemplate(params: {
  name?: string;
  verifyUrl: string;
}) {
  const { name, verifyUrl } = params;
  const firstName = name?.split(" ")[0] || "there";
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify your email • Domaine du Chevreuil Blanc</title>
    <style>
      :root { color-scheme: light dark; supported-color-schemes: light dark; }
      body { margin:0; padding:0; background:#f6f7fb; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,'Apple Color Emoji','Segoe UI Emoji',sans-serif; }
      .container { max-width: 560px; margin: 24px auto; background:#ffffff; border-radius:14px; overflow:hidden; box-shadow: 0 8px 28px rgba(16,24,40,.08); }
      .header { background: linear-gradient(135deg,#0ea5e9,#2563eb); padding: 28px 24px; color: #fff; }
      .brand { font-weight:800; font-size:22px; letter-spacing:.2px }
      .subtitle { opacity:.95; font-size:13px; margin-top:6px }
      .content { padding: 26px; color:#1f2937; }
      .h1 { font-size:24px; line-height:1.35; margin: 0 0 10px; letter-spacing:.2px }
      .p { margin:0 0 14px; color:#475569; font-size:14px; }
      .btn-wrap { text-align:center; margin: 20px 0 18px; }
      .btn { display:inline-block; background:linear-gradient(135deg,#3b82f6,#2563eb); color:#fff !important; text-decoration:none; padding:13px 22px; border-radius:12px; font-weight:700; font-size:14px; box-shadow:0 6px 18px rgba(37,99,235,.35); }
      .btn:hover { filter: brightness(1.05); }
      .card { background:#f8fafc; border:1px solid #e5e7eb; border-radius:12px; padding:14px; font-size:12px; color:#475569; }
      .bullets { display:flex; gap:10px; margin:10px 0 0; padding:0; list-style:none; font-size:12px; color:#64748b }
      .bullets li { background:#eef2ff; color:#344c8a; padding:6px 10px; border-radius:999px; border:1px solid #dbeafe }
      .foot { padding: 16px 24px 26px; color:#94a3b8; font-size:12px; text-align:center; }
      @media (max-width: 600px){ .content{ padding:20px } .header{ padding:22px 18px } .btn{ width:100%; } }
      @media (prefers-color-scheme: dark){ body{ background:#0b1220 } .container{ background:#0f172a } .content{ color:#e2e8f0 } .p{ color:#94a3b8 } .card{ background:#0b1220; border-color:#1e293b; color:#9aa7b5 } .foot{ color:#64748b } }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="brand">Domaine du Chevreuil Blanc</div>
        <div class="subtitle">Bienvenue dans notre communauté</div>
      </div>
      <div class="content">
        <h1 class="h1">Bonjour ${firstName}, confirmez votre email.</h1>
        <p class="p">Merci de rejoindre le Domaine du Chevreuil Blanc ! Cliquez sur le bouton ci-dessous pour vérifier votre email et débloquer l'accès au contenu exclusif des membres, aux concours et plus encore.</p>
        <div class="btn-wrap">
          <a class="btn" href="${verifyUrl}">Verify email</a>
        </div>
        <ul class="bullets">
          <li>Contenu exclusif membres</li>
          <li>Concours mensuels</li>
          <li>Accès au parc animalier</li>
        </ul>
        <div class="card" style="margin-top:14px">
        Si le bouton ne fonctionne pas, copiez et collez cette URL dans votre navigateur :<br/>
          <span style="word-break:break-all">${verifyUrl}</span>
        </div>
        <p class="p" style="margin-top:16px">Ce lien expirera dans 24 heures. Si vous n’avez pas créé de compte, vous pouvez ignorer ce courriel en toute sécurité.</p>
      </div>
      <div class="foot">© ${new Date().getFullYear()} WildLife Hub • Vous recevez ce message parce que vous avez créé un compte.</div>
    </div>
  </body>
  </html>`;
}

export function resetPasswordTemplate(params: {
  name?: string;
  resetUrl: string;
}) {
  const { name, resetUrl } = params;
  const firstName = name?.split(" ")[0] || "there";
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Réinitialisez votre mot de passe • Domaine du Chevreuil Blanc</title>
    <style>
      :root { color-scheme: light dark; supported-color-schemes: light dark; }
      body { margin:0; padding:0; background:#f6f7fb; font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; }
      .container { max-width: 560px; margin: 24px auto; background:#ffffff; border-radius:14px; overflow:hidden; box-shadow: 0 8px 28px rgba(16,24,40,.08); }
      .header { background: linear-gradient(135deg,#0ea5e9,#2563eb); padding: 28px 24px; color: #fff; }
      .brand { font-weight:800; font-size:22px; letter-spacing:.2px }
      .subtitle { opacity:.95; font-size:13px; margin-top:6px }
      .content { padding: 26px; color:#1f2937; }
      .h1 { font-size:22px; line-height:1.35; margin: 0 0 8px; }
      .p { margin:0 0 14px; color:#475569; font-size:14px; }
      .btn-wrap { text-align:center; margin: 20px 0 18px; }
      .btn { display:inline-block; background:linear-gradient(135deg,#3b82f6,#2563eb); color:#fff !important; text-decoration:none; padding:13px 22px; border-radius:12px; font-weight:700; font-size:14px; box-shadow:0 6px 18px rgba(37,99,235,.35); }
      .btn:hover { filter: brightness(1.05); }
      .card { background:#f8fafc; border:1px solid #e5e7eb; border-radius:12px; padding:14px; font-size:12px; color:#475569; }
      .foot { padding: 16px 24px 26px; color:#94a3b8; font-size:12px; text-align:center; }
      @media (max-width: 600px){ .content{ padding:20px } .header{ padding:22px 18px } .btn{ width:100%; } }
      @media (prefers-color-scheme: dark){ body{ background:#0b1220 } .container{ background:#0f172a } .content{ color:#e2e8f0 } .p{ color:#94a3b8 } .card{ background:#0b1220; border-color:#1e293b; color:#9aa7b5 } .foot{ color:#64748b } }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="brand">🦁 WildLife Hub</div>
        <div class="subtitle">Réinitialisation sécurisée du mot de passe</div>
      </div>
      <div class="content">
        <h1 class="h1">Bonjour ${firstName}, réinitialisez votre mot de passe</h1>
        <p class="p">Nous avons reçu une demande de réinitialisation de votre mot de passe WildLife Hub. Cliquez sur le bouton ci‑dessous pour en définir un nouveau. Si vous n’êtes pas à l’origine de cette demande, vous pouvez ignorer ce courriel.</p>
        <div class="btn-wrap">
          <a class="btn" href="${resetUrl}">Réinitialiser le mot de passe</a>
        </div>
        <div class="card">
          Si le bouton ne fonctionne pas, copiez et collez cette URL dans votre navigateur :<br/>
          <span style="word-break:break-all">${resetUrl}</span>
        </div>
        <p class="p" style="margin-top:16px">Pour des raisons de sécurité, ce lien expire dans 30 minutes.</p>
      </div>
      <div class="foot">© ${new Date().getFullYear()} WildLife Hub • La sécurité avant tout. Besoin d’aide ? Répondez à ce courriel.</div>
    </div>
  </body>
  </html>`;
}
