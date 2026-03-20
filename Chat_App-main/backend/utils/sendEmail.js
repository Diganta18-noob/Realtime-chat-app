import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
    console.log("=========================================");
    console.log("Mock Email Sending (No SMTP Configured)");
    console.log(`To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Content: ${options.message}`);
    console.log("=========================================");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `Chat App <${process.env.SMTP_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(mailOptions);
};
