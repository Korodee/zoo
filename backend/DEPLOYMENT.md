# Backend Deployment Checklist

## Environment Variables (Vercel)

Make sure these environment variables are set in your Vercel project:

### Required Variables:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A secure random string for JWT signing
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret

### Optional Variables:
- `NODE_ENV` - Set to "production" for production
- `FRONTEND_URL` - Your frontend URL for CORS
- `DISABLE_SECURITY` - Set to "true" to disable security middleware (for debugging)

## MongoDB Configuration

1. Ensure your MongoDB Atlas cluster is running
2. Check that your IP whitelist includes Vercel's IP ranges
3. Verify your connection string is correct
4. Test the connection string locally

## Vercel Configuration

1. Ensure `vercel.json` is properly configured
2. Check that the build command is correct
3. Verify the function timeout is set to 30 seconds

## Health Check

After deployment, test the health endpoint:
```
GET https://your-backend.vercel.app/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production",
  "database": {
    "type": "MongoDB",
    "status": "connected",
    "readyState": 1
  },
  "version": "1.0.0"
}
```

## Troubleshooting

### Database Connection Issues:
1. Check MongoDB Atlas status
2. Verify connection string
3. Check IP whitelist
4. Review Vercel logs

### Rate Limiting Issues:
1. Verify `trust proxy` is set to 1
2. Check rate limit configuration
3. Review request patterns

### Environment Variable Issues:
1. Run the validation script
2. Check Vercel environment variables
3. Verify variable names match exactly
