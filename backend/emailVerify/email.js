import nodemailer from "nodemailer";
import "dotenv/config";

export const verifyEmail = (token, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  const mailConfigrations = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Email Verification",
    text: `Hi! There You have recently visited our website and entered your email.
    Please follow the given link to verify your email: ${(process.env.FRONTEND_URL || 'http://localhost:5173')}/verify/${token}
    Thanks
    `,
  };

  transporter.sendMail(mailConfigrations, function (error, info) {
    if (error) {
      console.error("Email send error:", error.message);
      return;
    }
    console.log("Email Sent Successfully.");
    console.log(info);
  });
};
