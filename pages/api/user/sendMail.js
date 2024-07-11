export const config = {
  api: {
    externalResolver: true,
  },
};

import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "../../../database/models/User";
import dbConnect from "../../../database/dbConnect";

export default async function sendEmail(req, res) {
  const { email, emailType, userId } = req.body;

  await dbConnect();

  const hashedToken = await bcryptjs.hash(userId?.toString(), 10);
  if (emailType === "VERIFY" && req.method === "POST") {
    await User.findByIdAndUpdate(userId, {
      verifyToken: hashedToken,
      verifyTokenExpiry: Date.now() + 3600000,
    });
  } else if (emailType === "RESET" && req.method === "POST") {
    await User.findByIdAndUpdate(userId, {
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: Date.now() + 3600000,
    });
  }

  let transporter;

  try {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      secure: true,
    });
  } catch (error) {
    console.log("Error creating transport:", error);
    return res.status(500).json({ message: "Email transport error" });
  }

  const mailOptions = {
    from: "info@siyli-endurance-coaching.com",
    to: email,
    text: "siyli-app.de Email Bestätigung",

    subject:
      emailType === "VERIFY"
        ? "Willkommen bei der siyli-app 👋"
        : "Willkommen bei der siyli-app 👋 ",
    html: `<p>Klicke bitte 
          <a href="${
            process.env.NODEMAILER_URL
          }/verifyemail?token=${hashedToken}">  hier  </a>
      um  
      ${
        emailType === "VERIFY"
          ? " deine Email-Adresse zu bestätigen."
          : " dein Passwort zurückzusetzen."
      } </p>`,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });

  res.status(200).json();
}
