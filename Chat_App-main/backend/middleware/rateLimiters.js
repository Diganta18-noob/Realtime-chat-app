import rateLimit from "express-rate-limit";

// Global API Limiter: Prevents general scraping and DoS on app routes
// Max 100 requests per 15 minutes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests from this IP, please try again after 15 minutes." },
  skip: (req, res) => process.env.NODE_ENV === "development",
  standardHeaders: true,
  legacyHeaders: false,
});

// Login Limiter: Strict limit for brute-force attacks on login
// Max 5 attempts per 15 minutes
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true, // Only punish failed attempts
  message: { error: "Too many failed login attempts, please try again after 15 minutes." },
  skip: (req, res) => process.env.NODE_ENV === "development",
  standardHeaders: true,
  legacyHeaders: false,
});

// Signup Limiter: Extremely strict limit to prevent fake bot accout farming
// Max 3 requests per hour
export const signupLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 3,
  message: { error: "Too many accounts created from this IP, please try again after an hour." },
  skip: (req, res) => process.env.NODE_ENV === "development",
  standardHeaders: true,
  legacyHeaders: false,
});

// AI Usage Limiter: Forward-looking constraint for computationally heavy features
// Max 10 requests per day (1440 mins)
export const aiLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 10,
  message: { error: "AI generation limits reached for today. Please try again tomorrow." },
  skip: (req, res) => process.env.NODE_ENV === "development",
  standardHeaders: true,
  legacyHeaders: false,
});
