import { Resend } from "resend";
import logger from "./logger.js";

export const sendEmail = async (options) => {
  if (!process.env.RESEND_API_KEY) {
    logger.info("========================================");
    logger.info("Mock Email Sending (No RESEND_API_KEY)");
    logger.info(`To: ${options.email}`);
    logger.info(`Subject: ${options.subject}`);
    logger.info(`Content: ${options.message}`);
    logger.info("========================================");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: "OrbitChat <onboarding@resend.dev>",
    to: options.email,
    subject: options.subject,
    html: options.message,
  });

  if (error) {
    logger.error("Resend email failed", { error: error.message });
    throw new Error(error.message);
  }
};
