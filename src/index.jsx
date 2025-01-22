const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp();

// CORS Configuration
const corsOptions = {
  origin: "https://nguyenthiyenly0407.github.io", // Không có dấu "/" ở cuối
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: [
    "Origin",
    "Content-Type",
    "Accept",
    "Authorization",
    "X-Requested-With",
  ],
};

// Tạo transporter cho Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nguyenlyyenthi@gmail.com", // Địa chỉ email của bạn
    pass: "ueec nqox ieot lczx", // Mật khẩu app (không phải mật khẩu email)
  },
});

// Hàm gửi thông báo qua email
exports.sendNotification = functions.https.onRequest((req, res) => {
  cors(corsOptions)(req, res, () => {
    // Thiết lập các header chống cache
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    res.set("Pragma", "no-cache");
    res.set("Expires", "-1");
    res.set("Access-Control-Allow-Origin", "https://nguyenthiyenly0407.github.io");
    res.set("Access-Control-Allow-Credentials", "true");

    // Xử lý yêu cầu OPTIONS (preflight request)
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      return res.status(204).send(""); // Trả về phản hồi trống cho preflight
    }

    // Kiểm tra email có được cung cấp trong body không
    if (!req.body || !req.body.email) {
      return res.status(400).send({ error: "Email is required" });
    }

    // Xử lý yêu cầu POST
    if (req.method === "POST") {
      const userEmail = req.body.email;
      const mailOptions = {
        from: userEmail,
        to: "nguyenlyyenthi@gmail.com",
        subject: "New Login Notification",
        text: `A new user with email ${userEmail} has logged in.`,
      };

      // Gửi email
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
      // Phương thức không được phép
      res.status(405).send({ error: "Method Not Allowed" });
    }
  });
});
