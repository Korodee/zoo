export function verifyEmailTemplate(params: {
  name?: string;
  verifyUrl: string;
}) {
  const { name, verifyUrl } = params;
  const firstName = name?.split(" ")[0] || "cher utilisateur";
  return `<!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vérifiez votre email • Domaine du Chevreuil Blanc</title>
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
          <a class="btn" href="${verifyUrl}">Vérifier l'email</a>
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
      <div class="foot">© ${new Date().getFullYear()} Domaine du Chevreuil Blanc • Vous recevez ce message parce que vous avez créé un compte.</div>
    </div>
  </body>
  </html>`;
}

export function resetPasswordTemplate(params: {
  name?: string;
  resetUrl: string;
}) {
  const { name, resetUrl } = params;
  const firstName = name?.split(" ")[0] || "cher utilisateur";
  return `<!DOCTYPE html>
  <html lang="fr">
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
        <div class="brand">🦌 Domaine du Chevreuil Blanc</div>
        <div class="subtitle">Réinitialisation sécurisée du mot de passe</div>
      </div>
      <div class="content">
        <h1 class="h1">Bonjour ${firstName}, réinitialisez votre mot de passe</h1>
        <p class="p">Nous avons reçu une demande de réinitialisation de votre mot de passe Domaine du Chevreuil Blanc. Cliquez sur le bouton ci‑dessous pour en définir un nouveau. Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer ce courriel.</p>
        <div class="btn-wrap">
          <a class="btn" href="${resetUrl}">Réinitialiser le mot de passe</a>
        </div>
        <div class="card">
          Si le bouton ne fonctionne pas, copiez et collez cette URL dans votre navigateur :<br/>
          <span style="word-break:break-all">${resetUrl}</span>
        </div>
        <p class="p" style="margin-top:16px">Pour des raisons de sécurité, ce lien expire dans 30 minutes.</p>
      </div>
      <div class="foot">© ${new Date().getFullYear()} Domaine du Chevreuil Blanc • La sécurité avant tout. Besoin d'aide ? Répondez à ce courriel.</div>
    </div>
  </body>
  </html>`;
}

export function welcomeEmailTemplate(params: {
  name?: string;
  paymentUrl: string;
}) {
  const { name, paymentUrl } = params;
  const firstName = name?.split(" ")[0] || "cher ami";
  return `<!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bienvenue - Domaine du Chevreuil Blanc</title>
    <style>
      :root { color-scheme: light dark; supported-color-schemes: light dark; }
      body { margin:0; padding:0; background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; }
      .container { max-width: 650px; margin: 20px auto; background:#ffffff; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); overflow: hidden; }
      .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 30px 24px; color: white; text-align: center; }
      .brand { font-weight:700; font-size:24px; margin-bottom: 8px; text-shadow: 0 2px 4px rgba(0,0,0,0.2); }
      .brand-subtitle { font-size:14px; opacity: 0.9; font-weight: 300; }
      .content { padding: 40px 30px; color:#1f2937; }
      .h1 { font-size:28px; line-height:1.3; margin: 0 0 20px; color:#1e40af; font-weight: 600; text-align: center; }
      .p { margin:0 0 20px; color:#4b5563; font-size:16px; line-height:1.7; }
      .btn-wrap { text-align:center; margin: 30px 0; }
      .btn { display:inline-block; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color:#fff !important; text-decoration:none; padding:16px 32px; border-radius:8px; font-weight:600; font-size:16px; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3); transition: all 0.3s ease; }
      .btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(5, 150, 105, 0.4); }
      .signature { margin-top:40px; padding-top:20px; border-top:2px solid #e5e7eb; color:#6b7280; font-size:15px; text-align: center; }
      .foot { padding: 20px 30px; color:#9ca3af; font-size:13px; background:#f8fafc; text-align: center; }
      .info-box { background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border:1px solid #e2e8f0; border-radius:12px; padding:24px; margin:24px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
      .info-box h3 { margin:0 0 16px; color:#1e40af; font-size:18px; font-weight: 600; display: flex; align-items: center; }
      .money-box h3::before { content: "💰"; margin-right: 8px; }
      .house-box h3::before { content: "🏠"; margin-right: 8px; }
      .vehicle-box h3::before { content: "🚗"; margin-right: 8px; }
      .grand-prize-box h3::before { content: "🏆"; margin-right: 8px; }
      .bonus-box h3::before { content: "🌟"; margin-right: 8px; }
      .children-box h3::before { content: "🏕️"; margin-right: 8px; }
      .how-it-works-box h3::before { content: "💳"; margin-right: 8px; }
      .prize-table { width: 100%; border-collapse: collapse; margin: 16px 0; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      .prize-table th, .prize-table td { padding: 12px 8px; text-align: left; border-bottom: 1px solid #e5e7eb; }
      .prize-table th { background: #f8fafc; font-weight: 600; color: #1e40af; font-size: 13px; }
      .prize-table td { font-size: 13px; color: #475569; }
      .prize-table tr:nth-child(even) { background: #f9fafb; }
      .step-list { padding-left: 0; list-style: none; }
      .step-list li { margin: 12px 0; padding: 12px; background: white; border-radius: 8px; border-left: 4px solid #10b981; }
      .step-number { font-weight: 600; color: #10b981; }
      .info-box p { margin:0 0 12px; color:#475569; font-size:15px; line-height: 1.6; }
      .prize-list { margin:12px 0; padding-left: 0; list-style: none; }
      .prize-list li { margin:8px 0; color:#475569; font-size:14px; padding: 8px 12px; background: white; border-radius: 6px; border-left: 3px solid #3b82f6; }
      .intro-text { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border:1px solid #f59e0b; border-radius:12px; padding:20px; margin:20px 0; font-style: italic; color: #92400e; }
      .deer-emoji { font-size: 24px; margin-right: 8px; }
      @media (max-width: 600px){ 
        .content{ padding:25px 20px } 
        .header{ padding:20px 16px } 
        .btn{ width:100%; text-align:center; padding: 14px 24px; }
        .h1 { font-size: 24px; }
        .brand { font-size: 20px; }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="brand">Domaine du Chevreuil Blanc</div>
        <div class="brand-subtitle">Votre aventure dans la nature commence ici</div>
      </div>
      <div class="content">
        <h1 class="h1"><span class="deer-emoji">🦌</span>Bienvenue au Domaine du Chevreuil Blanc</h1>
        
        <div class="intro-text">
          <p>Cher ami du Québec,</p>
          <p>Je tiens tout d'abord à vous remercier du fond du cœur pour l'intérêt que vous portez à mon projet du Domaine du Chevreuil Blanc. Chaque membre qui participe aide à rendre ce rêve possible et à créer des expériences uniques en lien avec la nature.</p>
        </div>
        
        <p>Mon objectif est de partager avec vous et surtout avec les jeunes enfants, un projet qui met en valeur la beauté et la richesse de notre environnement, tout en offrant des récompenses exceptionnelles à ceux qui nous soutiennent.</p>

        <div class="info-box house-box">
          <h3>Palier des prix - Maisons et roulottes</h3>
          <table class="prize-table">
            <thead>
              <tr>
                <th>Palier</th>
                <th>% de l'objectif</th>
                <th>Montant total</th>
                <th>Description du prix</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>100 %</td><td>1 000 000 $</td><td>Maison 1 M$</td></tr>
              <tr><td>2</td><td>75 %</td><td>750 000 $</td><td>Maison 750 k$</td></tr>
              <tr><td>3</td><td>50 %</td><td>500 000 $</td><td>Maison 500 k$</td></tr>
              <tr><td>4</td><td>25 %</td><td>250 000 $</td><td>5 roulottes × 50 000 $ chacune</td></tr>
              <tr><td>5</td><td>12,5 %</td><td>125 000 $</td><td>Résidence 40 HBDL 2025 (roulotte)</td></tr>
              <tr><td>6</td><td>6,25 %</td><td>62 500 $</td><td>Surveyor 202 RBLE 2026 (roulotte)</td></tr>
              <tr><td>7</td><td>3,125 %</td><td>31 250 $</td><td>Puma 16 BHCE 2026 (roulotte)</td></tr>
              <tr><td>8</td><td>1,5625 %</td><td>15 625 $</td><td>Crédit pour l'achat d'une roulotte usagée (≈15 625 $)</td></tr>
              <tr><td>9</td><td>0,78125 %</td><td>7 813 $</td><td>Crédit pour l'achat d'une roulotte usagée (≈7 813 $)</td></tr>
            </tbody>
          </table>
        </div>

        <div class="info-box money-box">
          <h3>Palier des prix - Lots d'argent</h3>
          <table class="prize-table">
            <thead>
              <tr>
                <th>Palier</th>
                <th>% de l'objectif</th>
                <th>Montant total</th>
                <th>Répartition (5 lots)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>100 %</td><td>500 000 $</td><td>5 × 100 000 $</td></tr>
              <tr><td>2</td><td>75 %</td><td>375 000 $</td><td>5 × 75 000 $</td></tr>
              <tr><td>3</td><td>50 %</td><td>250 000 $</td><td>5 × 50 000 $</td></tr>
              <tr><td>4</td><td>25 %</td><td>125 000 $</td><td>5 × 25 000 $</td></tr>
              <tr><td>5</td><td>12,5 %</td><td>62 500 $</td><td>5 × 12 500 $</td></tr>
              <tr><td>6</td><td>6,25 %</td><td>31 250 $</td><td>5 × 6 250 $</td></tr>
              <tr><td>7</td><td>3,125 %</td><td>15 625 $</td><td>5 × 3 125 $</td></tr>
              <tr><td>8</td><td>1,5625 %</td><td>7 812,50 $</td><td>5 × 1 562,50 $</td></tr>
              <tr><td>9</td><td>0,78125 %</td><td>3 906,25 $</td><td>5 × 781,25 $</td></tr>
            </tbody>
          </table>
        </div>

        <div class="info-box grand-prize-box">
          <h3>🏡 Le Grand Prix – Une maison d'un million de dollars</h3>
          <ul class="prize-list">
            <li>• Tirage parmi tous les membres participants</li>
            <li>• Le gagnant choisit son terrain et dessine sa maison</li>
            <li>• Construction entièrement prise en charge jusqu'à 1 000 000 $</li>
            <li>• Processus entièrement filmé et partagé, pour que tous puissent suivre l'avancement</li>
          </ul>
        </div>

        <div class="info-box bonus-box">
          <h3>🌟 Bonus spécial</h3>
          <p>Si l'objectif de participation est atteint deux fois en six mois, le Domaine du Chevreuil Blanc offrira deux autres maisons d'un million de dollars à tirer pour les membres !</p>
          <p><strong>Concrètement :</strong></p>
          <ul class="prize-list">
            <li>• Une première maison d'un million sera tirée dès que le premier objectif est atteint</li>
            <li>• Si le même objectif est atteint à nouveau dans les six mois, deux autres maisons d'un million seront ajoutées au tirage</li>
            <li>• Cela signifie qu'en encourageant le projet et en participant, les membres contribuent à faire grandir le Domaine et augmentent le nombre de prix majeurs offerts</li>
          </ul>
        </div>

        <div class="info-box">
          <h3>💬 Petit mot du Domaine du Chevreuil Blanc</h3>
          <p>Chaque participant aide à bâtir quelque chose de plus grand : un projet qui fait rayonner la nature du Québec, crée des expériences uniques pour les familles et permet de récompenser généreusement ceux qui nous soutiennent. Ensemble, nous pouvons offrir trois maisons d'un million et continuer à faire grandir le Domaine pour tous. 🦌🌲</p>
        </div>

        <div class="info-box children-box">
          <h3>🏕️ Pyramide des prix — Jeunes (lots plein air)</h3>
          <p><strong>Montant total : 2 000 000 $ si l'objectif est atteint à 100 %</strong></p>
          <table class="prize-table">
            <thead>
              <tr>
                <th>Palier</th>
                <th>% de l'objectif</th>
                <th>Montant total</th>
                <th>Nombre de lots de 5 000 $</th>
                <th>Type de prix</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>100 %</td><td>2 000 000 $</td><td>400 lots</td><td>Lots plein air</td></tr>
              <tr><td>2</td><td>75 %</td><td>1 500 000 $</td><td>300 lots</td><td>Lots plein air</td></tr>
              <tr><td>3</td><td>50 %</td><td>1 000 000 $</td><td>200 lots</td><td>Lots plein air</td></tr>
              <tr><td>4</td><td>25 %</td><td>500 000 $</td><td>100 lots</td><td>Lots plein air</td></tr>
              <tr><td>5</td><td>12,5 %</td><td>250 000 $</td><td>50 lots</td><td>Lots plein air</td></tr>
              <tr><td>6</td><td>6,25 %</td><td>125 000 $</td><td>25 lots</td><td>Lots plein air</td></tr>
              <tr><td>7</td><td>3,125 %</td><td>62 500 $</td><td>12 lots</td><td>Lots plein air</td></tr>
              <tr><td>8</td><td>1,5625 %</td><td>31 250 $</td><td>6 lots</td><td>Lots plein air</td></tr>
              <tr><td>9</td><td>0,78125 %</td><td>15 625 $</td><td>3 lots</td><td>Lots plein air</td></tr>
            </tbody>
          </table>
        </div>

        <div class="info-box">
          <h3>💬 Petit mot pour les jeunes du Québec</h3>
          <p>🌲 <strong>Pour les jeunes du Québec</strong><br>
          Même au plus petit palier, il y a toujours des chances de gagner des lots plein air.<br>
          Chaque lot représente une aventure, une activité ou un équipement pour profiter de la nature avec vos amis et votre famille.<br>
          Encouragez le projet et participez — plus nous avançons, plus les récompenses grandissent! 🦌✨</p>
        </div>

        <div class="info-box how-it-works-box">
          <h3>💳 Comment ça fonctionne : l'achat de la carte et l'enregistrement des enfants</h3>
          <p>Au Domaine du Chevreuil Blanc, nous voulons que chaque famille et chaque enfant puisse profiter pleinement de l'expérience et participer aux concours. Voici comment cela fonctionne :</p>
          <ol class="step-list">
            <li><span class="step-number">1. La carte de membre</span><br>
              • Le parent doit acheter une carte de 50 $ pour pouvoir enregistrer ses enfants.<br>
              • Cette carte permet de participer aux concours et d'accéder au site.</li>
            <li><span class="step-number">2. L'inscription des enfants</span><br>
              • Une fois la carte achetée, le parent peut enregistrer tous ses enfants, sans limite de nombre.<br>
              • L'inscription de l'enfant est gratuite, mais dépend de l'achat de la carte parentale.<br>
              • Chaque enfant enregistré pourra participer aux concours et gagner des prix (ex. lots plein air pour les jeunes).</li>
            <li><span class="step-number">3. Accès au site et vérification</span><br>
              • Chaque enfant enregistré reçoit un identifiant unique ou un QR code associé à son nom et à la carte du parent.<br>
              • À l'entrée du site, le personnel peut vérifier l'enregistrement de l'enfant rapidement via cet identifiant, sans que le parent soit nécessairement présent.<br>
              • Cela permet à l'enfant de profiter du site en toute sécurité et de participer aux activités prévues.</li>
            <li><span class="step-number">4. Sécurité et transparence</span><br>
              • L'objectif est que tout le monde soit protégé, que la participation soit claire et que les enfants puissent bénéficier de leur inscription même si les parents ne sont pas sur place.<br>
              • Les parents restent responsables de leurs enfants, mais le système permet un accès simple et sécurisé pour les activités et les tirages.</li>
          </ol>
        </div>

        <p>Je suis extrêmement reconnaissant envers tous ceux qui souhaitent se joindre à cette aventure. Ensemble, nous pourrons offrir aux jeunes et aux familles des expériences inoubliables dans la nature, créer des souvenirs uniques et montrer la beauté de notre environnement. Merci du fond du cœur pour votre soutien, votre confiance et votre enthousiasme. C'est grâce à vous que ce projet prend vie et peut continuer de grandir, palier par palier.</p>

        <div class="btn-wrap">
          <a class="btn" href="${paymentUrl}">Rejoindre l'aventure</a>
        </div>

        <div class="signature">
          <p>Avec gratitude,<br>L'équipe du Domaine du Chevreuil Blanc</p>
          <p style="margin-top: 16px; font-size: 14px; color: #9ca3af;">
            <strong>Numéro d'entreprise :</strong> [À ajouter par le client]
          </p>
        </div>
      </div>
      <div class="foot">
        Cet email a été envoyé automatiquement. Merci de ne pas y répondre.
      </div>
    </div>
  </body>
  </html>`;
}
