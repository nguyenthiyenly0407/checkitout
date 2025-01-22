const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp();

// CORS Configuration
const corsOptions = {
  origin: "https://nguyenthiyenly0407.github.io", // No trailing slash
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "Content-Type",
    "Accept",
    "Authorization",
    "X-Requested-With",
  ],
};

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nguyenlyyenthi@gmail.com", // Your email address
    pass: "ueec nqox ieot lczx", // Your app password (not your email password)
  },
});

// Email notification function
exports.sendNotification = functions.https.onRequest((req, res) => {
  cors(corsOptions)(req, res, () => {
    // Cache headers to prevent 304 status
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.set("Pragma", "no-cache");
    res.set("Expires", "-1");
    res.set("Access-Control-Allow-Origin", "https://nguyenthiyenly0407.github.io");
    res.set("Access-Control-Allow-Credentials", "true");

    // Handle preflight OPTIONS request
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      return res.status(204).send(""); // Empty response for preflight
    }

    // Check if email is provided in the body
    if (!req.body || !req.body.email) {
      return res.status(400).send({ error: "Email is required" });
    }

    // Handle POST request
    if (req.method === "POST") {
      const userEmail = req.body.email;
      const mailOptions = {
        from: userEmail,
        to: "nguyenlyyenthi@gmail.com",
        subject: "New Login Notification",
        text: `A new user with email ${userEmail} has logged in.`,
      };

      // Send email
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
      // Method not allowed
      res.status(405).send({ error: "Method Not Allowed" });
    }
  });
});
