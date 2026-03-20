import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return a 400 Bad Request if payload fails structural validation guarantees
    return res.status(400).json({ 
      error: "Validation failed. Ensure your inputs match expected structural shapes.", 
      details: errors.array().map(err => `${err.path}: ${err.msg}`) 
    });
  }
  next();
};
