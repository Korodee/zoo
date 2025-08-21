# WildLife Hub Backend API

Express.js API for the WildLife Hub wildlife photography community platform.

## Features

- **Authentication**: JWT-based auth with email verification
- **Membership**: Stripe integration for paid memberships
- **Database**: MongoDB with Mongoose ODM
- **Documentation**: Swagger/OpenAPI at `/api-docs`
- **Security**: Helmet, rate limiting, CORS protection
- **Email**: Brevo (Sendinblue) integration for transactional emails

## Tech Stack

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Stripe Payments
- Brevo Email Service
- Swagger Documentation

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Stripe account
- Brevo account (optional)

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
# Server
PORT=5001
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/wildlife-hub

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Frontend (for CORS)
FRONTEND_URL=http://localhost:3000

# Email (optional)
BREVO_API_KEY=your_brevo_api_key
MAIL_FROM=le.domaine.du.chevreuil.blanc@gmail.com

# Debug (optional)
DISABLE_SECURITY=false
```

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-email` - Email verification
- `POST /api/auth/login` - User login
- `POST /api/auth/resend-verification` - Resend verification email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/logout` - Logout (client-side)

### Users (Protected)

- `GET /api/users/profile` - Get user profile
- `GET /api/users/membership` - Check membership status

### Payments

- `POST /api/create-checkout-session` - Create Stripe checkout
- `POST /api/webhook` - Stripe webhook handler
- `GET /api/verify-payment/:sessionId` - Verify payment

### Health

- `GET /health` - Health check
- `GET /` - Root endpoint
- `GET /api-docs` - API documentation

## Database Schema

### User Model

```typescript
interface IUser {
  email: string;
  password: string;
  name?: string;
  is_member: boolean;
  is_verified: boolean;
  membership_date?: Date;
  email_verification_token?: string;
  email_verification_expires?: Date;
  reset_password_token?: string;
  reset_password_expires?: Date;
  created_at: Date;
  updated_at: Date;
}
```

## Security Features

- **JWT Authentication**: Bearer token-based auth
- **Password Hashing**: bcryptjs with salt rounds
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Configurable origins
- **Helmet**: Security headers
- **Input Validation**: Request body validation
- **Token Expiration**: Automatic cleanup of expired tokens

## Deployment

### Railway

1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=strong_random_secret
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
FRONTEND_URL=https://your-frontend.vercel.app
BREVO_API_KEY=your_brevo_key
MAIL_FROM=no-reply@yourdomain.com
```

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - TypeScript type checking

### Code Quality

- TypeScript strict mode
- ESLint with TypeScript rules
- Prettier formatting
- Proper error handling
- Comprehensive logging

## License

MIT
