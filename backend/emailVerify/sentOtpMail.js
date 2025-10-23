import nodemailer from "nodemailer";
import "dotenv/config";

export const sentOtpMail = (otp, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  const mailConfigrations = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password Reset Otp",
    html: `<p>Your Otp for password reset is: <b>${otp}</b></p>`
  };

  transporter.sendMail(mailConfigrations, function (error, info) {
    if (error) Error(error);
    console.log("Otp Sent Successfullly.");
    console.log(info);
  });
};
