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
    to: "singhroyai847@gmail.com",
    subject: "Email Verification",
    text: `Hi! There You have recently visited our website and entered your email.
    Please follow the given link to verify your email. https://tech-cart-delta.vercel.app/verify/${token}
    Thanks
    `,
  };

  transporter.sendMail(mailConfigrations, function (error, info) {
    if (error) Error(error);
    console.log("Email Sent Successfullly.");
    console.log(info);
  });
};
