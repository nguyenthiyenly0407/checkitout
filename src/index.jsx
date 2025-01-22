const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp();

const corsOptions = {
  origin: "https://nguyenthiyenly0407.github.io", // No trailing slash
  credentials: true,
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nguyenlyyenthi@gmail.com",
    pass: "ueec nqox ieot lczx",
  },
});

exports.sendNotification = functions.https.onRequest((req, res) => {
  cors(corsOptions)(req, res, () => {
    // Add common headers
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    res.set("Access-Control-Allow-Origin", "https://nguyenthiyenly0407.github.io");
    res.set("Access-Control-Allow-Credentials", "true");

    // Handle OPTIONS request
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      return res.status(204).send("");
    }

    // Handle POST request
    if (req.method === "POST") {
      if (!req.body || !req.body.email) {
        return res.status(400).send({ error: "Email is required" });
      }

      const userEmail = req.body.email;
      const mailOptions = {
        from: userEmail,
        to: "nguyenlyyenthi@gmail.com",
        subject: "New Login Notification",
        text: `A new user with email ${userEmail} has logged in.`,
      };

      transporter
        .sendMail(mailOptions)
        .then(() => {
          console.log("Email sent successfully");
          res.status(200).send({ message: "Email sent successfully" });
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          res.status(500).send({ error: "Unable to send email" });
        });
    } else {
      res.status(405).send({ error: "Method Not Allowed" });
    }
  });
});
