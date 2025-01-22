const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp();

// Cấu hình CORS
const corsOptions = {
  origin: '*', // Chỉ cho phép từ domain này
  methods: ['GET', 'POST', 'OPTIONS'], // Các phương thức được phép
  allowedHeaders: ['Content-Type', 'Authorization'], // Các header được phép
  credentials: true, // Cho phép gửi cookie (nếu cần)
};

// Tạo transporter cho Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nguyenlyyenthi@gmail.com", // Địa chỉ email của bạn
    pass: "ueec nqox ieot lczx", // Mật khẩu ứng dụng của bạn
  },
});

// Hàm gửi email thông báo khi người dùng đăng nhập
exports.sendNotification = functions.https.onRequest((req, res) => {
  // Áp dụng CORS
  cors(corsOptions)(req, res, () => {
    // Thêm các header để ngăn cache
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");

    // Xử lý yêu cầu OPTIONS trước khi gửi dữ liệu
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
      res.status(204).send(""); // OPTIONS không cần trả dữ liệu
      return;
    }

    // Kiểm tra nếu body không có email
    if (!req.body || !req.body.email) {
      return res.status(400).send({ error: "Email is required" });
    }

    // Xử lý yêu cầu POST
    if (req.method === "POST") {
      const userEmail = req.body.email; // Lấy email từ body
      const mailOptions = {
        from: userEmail,
        to: "nguyenlyyenthi@gmail.com",
        subject: "New Login Notification",
        text: `A new user with email ${userEmail} has logged in.`,
      };

      // Gửi email
      transporter.sendMail(mailOptions)
        .then(() => {
          console.log("Email sent successfully");
          res.status(200).send({ message: "Email sent successfully" });
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          res.status(500).send({ error: "Unable to send email" });
        });
    } else {
      // Nếu không phải POST
      res.status(405).send({ error: "Method Not Allowed" });
    }
  });
});
