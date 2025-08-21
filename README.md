WildLife Hub is a full‑stack monorepo for a wildlife photography community with paid membership. The frontend is built with Next.js 14 and Tailwind CSS. The backend is an Express API using MongoDB, JWT authentication, and Stripe payments. Swagger is provided for API documentation. The app is designed to deploy on Vercel (frontend) and Vercel (backend).

Table of contents
- Overview
- Tech stack
- Repository structure
- Features
- Getting started
  - Prerequisites
  - Installation
  - Environment variables
  - Development
  - Build and run
- API documentation
- API endpoints
- Payments and webhooks
- Emails
- Deployment notes
- Security
- Scripts
- License

Overview
This project provides a membership site for wildlife enthusiasts. Visitors can browse public content on the landing page and create an account. After email verification and payment, members gain access to private content including photography contests.

Tech stack
- Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, TypeScript, MongoDB with Mongoose
- Auth: JWT, bcryptjs password hashing
- Payments: Stripe Checkout + webhooks
- Documentation: Swagger/OpenAPI
- Deployment: Vercel (frontend), Railway or similar (backend)

Repository structure
```
wildlife-hub/
├── frontend/                 # Next.js 14 app
│   ├── app/                  # App Router pages
│   ├── components/           # UI components
│   ├── utils/                # API client helpers
│   └── public/               # Static assets
├── backend/                  # Express API
│   ├── config/               # Database, mailer, Swagger config
│   ├── middleware/           # Auth middleware
│   ├── models/               # Mongoose schemas
│   ├── routes/               # Auth, users, stripe routes
│   └── server.ts             # Server entry
├── package.json              # Monorepo scripts (workspaces)
└── env.example               # Example env values for local setup
```

Features
- Public landing page (hero, about, gallery, testimonials, contact, footer)
- Email/password authentication with email verification
- Members‑only area with access control
- Stripe one‑time payment flow that upgrades membership
- Swagger documentation at runtime
- Production‑ready security middleware (rate limiting, Helmet, CORS)

Getting started

Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Stripe account and API keys

Installation
```
git clone <repository-url>
cd wildlife-hub
npm run install:all
```

Environment variables
Use `env.example` as a reference. Create two files:

1) backend/.env
```
PORT=5001
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/wildlife-hub

JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRES_IN=7d

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

FRONTEND_URL=http://localhost:3000

# Optional (emails via Brevo)
BREVO_API_KEY=your_brevo_api_key
MAIL_FROM=le.domaine.du.chevreuil.blanc@gmail.com
```

2) frontend/.env.local
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

Development
From the repository root:
```
npm run dev          # runs both backend (5001) and frontend (3000)
```
Or run individually:
```
npm run dev:backend  # http://localhost:5001
npm run dev:frontend # http://localhost:3000
```

Build and run
```
npm run build
npm run start        # starts both in production mode
```

API documentation
Once the backend is running:
- Swagger UI: http://localhost:5001/api-docs
- Health check: http://localhost:5001/health

API endpoints

Authentication
- POST /api/auth/register — Create user and send verification email
- POST /api/auth/verify-email — Verify email using token and email
- POST /api/auth/login — Obtain JWT after verified login
- POST /api/auth/resend-verification — Resend verification email
- POST /api/auth/forgot-password — Request password reset email
- POST /api/auth/reset-password — Reset password using token
- POST /api/auth/logout — Client‑side only (clears token on frontend)

Users (JWT required)
- GET /api/users/profile — Current user profile
- GET /api/users/membership — Membership status

Payments
- POST /api/create-checkout-session — Create Stripe Checkout session
- POST /api/webhook — Stripe webhook endpoint (requires signing secret)
- GET /api/verify-payment/:sessionId — Verify session and activate membership

Payments and webhooks
Configure your Stripe webhook to point to your backend:
- Local development: http://localhost:5001/api/webhook
Use `STRIPE_WEBHOOK_SECRET` to verify events. The backend upgrades a user to member on `checkout.session.completed`.

Emails
Transactional emails (verification and password reset) use Brevo (Sendinblue). If `BREVO_API_KEY` is not set, the backend will log the email content to the console instead of sending.

Deployment notes
- Frontend (Vercel): set `NEXT_PUBLIC_BACKEND_URL` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in project settings.
- Backend (Railway or similar): set all backend environment variables. Ensure `FRONTEND_URL` matches the deployed frontend domain. Expose port defined by `PORT`.

Security
- JWT authentication with bearer tokens
- Password hashing with bcryptjs
- Helmet security headers
- CORS restricted to `FRONTEND_URL`
- Basic rate limiting (100 requests / 15 minutes per IP)

Scripts (root)
- npm run dev — start frontend and backend concurrently
- npm run dev:frontend — start Next.js dev server
- npm run dev:backend — start Express dev server
- npm run build — build frontend and backend
- npm run start — start both in production mode
- npm run install:all — install deps at root, frontend, backend

License
MIT — see LICENSE if present.
