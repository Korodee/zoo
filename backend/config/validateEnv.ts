import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'STRIPE_SECRET_KEY'
];

export const validateEnv = (): void => {
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    console.error('Please check your .env file or Vercel environment variables');
    
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
  }
  
  console.log('Environment validation passed');
};
