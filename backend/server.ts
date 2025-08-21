import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import database and swagger
import { connectDB } from "./config/database";
import { setupSwagger } from "./config/swagger";
import { validateEnv } from "./config/validateEnv";

// Import routes
import authRoutes from "./routes/auth";
import stripeRoutes from "./routes/stripe";
import userRoutes from "./routes/users";
import contactRoutes from "./routes/contact";

// Load environment variables
dotenv.config();

// Validate environment variables
validateEnv();

const app = express();
const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || "development";
const DISABLE_SECURITY = process.env.DISABLE_SECURITY === "true";

// Trust proxy for Vercel and rate limiting
app.set('trust proxy', 1);

// Log environment for debugging
console.log("Environment:", NODE_ENV);
console.log("Port:", PORT);
console.log("Security disabled:", DISABLE_SECURITY);

// Connect to MongoDB
connectDB();

// Security middleware (can be disabled via env for debugging)
if (!DISABLE_SECURITY) {
  app.use(helmet());
  
  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);
}

// CORS configuration with support for multiple origins
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "http://localhost:3000",
];

app.use(
  cors({
    origin(origin, callback) {
      // Allow all origins in development or if no origin
      if (!origin || NODE_ENV === "development") return callback(null, true);
      
      if (
        allowedOrigins.includes(origin) ||
        /\.vercel\.app$/i.test(origin) ||
        /\.vercel\.dev$/i.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Setup Swagger documentation
setupSwagger(app);

// Health check endpoint
app.get("/health", (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
  
  res.json({
    status: dbStatus === "connected" ? "OK" : "WARNING",
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    database: {
      type: "MongoDB",
      status: dbStatus,
      readyState: mongoose.connection.readyState,
    },
    version: "1.0.0",
  });
});

// Basic root endpoint for uptime checks
app.get("/", (_req, res) => {
  res.type("text/plain").send("Domaine du Chevreuil Blanc API is running");
});

// API routes
app.use("/api", authRoutes);
app.use("/api", stripeRoutes);
app.use("/api", userRoutes);
app.use("/api", contactRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ 
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err);

    if (err.type === "entity.parse.failed") {
      return res.status(400).json({ error: "Invalid JSON" });
    }

    if (err.message === "Not allowed by CORS") {
      return res.status(403).json({ error: "CORS policy violation" });
    }

    res.status(500).json({ 
      error: "Internal server error",
      ...(NODE_ENV === "development" && { details: err.message }),
    });
  }
);

// Start server (only in non-serverless environments)
if (process.env.VERCEL !== '1') {
  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`API Docs: http://localhost:${PORT}/api-docs`);
    console.log(`Environment: ${NODE_ENV}`);
    console.log(`Security: ${DISABLE_SECURITY ? "DISABLED" : "ENABLED"}`);
  });
}

export default app;
