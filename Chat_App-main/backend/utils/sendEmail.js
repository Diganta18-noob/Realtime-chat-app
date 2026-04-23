import { Resend } from "resend";
import logger from "./logger.js";

/**
 * Sends an email via Resend. Returns { success: true } on success,
 * or { success: false, reason: string } on failure. Never throws.
 */
export const sendEmail = async (options) => {
  // Dev / no-key mode: log to console instead of sending
  if (!process.env.RESEND_API_KEY) {
    logger.info("========================================");
    logger.info("Mock Email Sending (No RESEND_API_KEY)");
    logger.info(`To: ${options.email}`);
    logger.info(`Subject: ${options.subject}`);
    logger.info(`Content: ${options.message}`);
    logger.info("========================================");
    return { success: true };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "OrbitChat <onboarding@resend.dev>",
      to: options.email,
      subject: options.subject,
      html: options.message,
    });

    if (error) {
      logger.error("Resend email delivery failed", {
        to: options.email,
        reason: error.message,
      });
      return { success: false, reason: error.message };
    }

    return { success: true };
  } catch (err) {
    logger.error("Resend email unexpected error", {
      to: options.email,
      reason: err.message,
    });
    return { success: false, reason: err.message };
  }
};
