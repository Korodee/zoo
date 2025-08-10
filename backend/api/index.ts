import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

// Import database and swagger
import { connectDB } from "../config/database";
import { setupSwagger } from "../config/swagger";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const NODE_ENV = process.env.NODE_ENV || "development";
const DISABLE_SECURITY = process.env.DISABLE_SECURITY === "true";

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

// CORS configuration
app.use(
  cors({
    origin(origin, callback) {
      // Allow all origins in development or if no origin
      if (!origin || NODE_ENV === "development") return callback(null, true);
      
      const allowedOrigins = [
        process.env.FRONTEND_URL || "http://localhost:3000",
        "http://localhost:3000",
      ];
      
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

// Connect to MongoDB
connectDB();

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Setup Swagger documentation
setupSwagger(app);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
    version: "1.0.0",
  });
});

// Basic root endpoint for uptime checks
app.get("/", (_req, res) => {
  res.type("text/plain").send("WildLife Hub API is running");
});

// Import routes
import authRoutes from "../routes/auth";
import stripeRoutes from "../routes/stripe";
import userRoutes from "../routes/users";

// API routes
app.use("/api", authRoutes);
app.use("/api", stripeRoutes);
app.use("/api", userRoutes);

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({
    message: "API is working!",
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
  });
});

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

export default app;
