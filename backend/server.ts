import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

// Import database and swagger
import { connectDB } from "./config/database";
import { setupSwagger } from "./config/swagger";

// Import routes
import authRoutes from "./routes/auth";
import stripeRoutes from "./routes/stripe";
import userRoutes from "./routes/users";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const DISABLE_SECURITY = process.env.DISABLE_SECURITY === "true";

// Connect to MongoDB
connectDB();

// Security middleware (can be disabled via env for debugging on hosts)
if (!DISABLE_SECURITY) {
  app.use(helmet());
}

// Rate limiting (can be disabled via env)
if (!DISABLE_SECURITY) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  });
  app.use(limiter);
}

// CORS configuration with support for multiple origins (prod, preview, local)
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  "http://localhost:3000",
];
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        /\.vercel\.app$/i.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

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
    environment: process.env.NODE_ENV || "development",
    database: "MongoDB",
  });
});

// Basic root endpoint for uptime checks
app.get("/", (_req, res) => {
  res.type("text/plain").send("WildLife Hub API is running");
});

// API routes
app.use("/api", authRoutes);
app.use("/api", stripeRoutes);
app.use("/api", userRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
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

    res.status(500).json({ error: "Internal server error" });
  }
);

// Start server (explicit host to avoid binding issues)
app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`API Docs: http://localhost:${PORT}/api-docs`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
