const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp();

// Cấu hình CORS, chỉ cho phép truy cập từ URL này
const corsOptions = {
  origin: ['https://nguyenthiyenly0407.github.io'], // Chỉ cho phép từ domain này
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nguyenlyyenthi@gmail.com",  // Địa chỉ email của bạn
    pass: "ueec nqox ieot lczx", // Mật khẩu ứng dụng của bạn
  },
});

// Hàm gửi email thông báo khi người dùng đăng nhập
exports.sendNotification = functions.https.onRequest((req, res) => {
  // Thiết lập CORS và xử lý yêu cầu
  cors(corsOptions)(req, res, () => {
    // Cấu hình để không lưu cache
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");

    // Xử lý yêu cầu POST
    if (req.method === "POST") {
      const userEmail = req.body.email;  // Lấy email người dùng đã đăng nhập
      const mailOptions = {
        from: userEmail,  // Email người dùng làm "from"
        to: "nguyenlyyenthi@gmail.com",  // Gửi thông báo đến email của bạn
        subject: "New Login Notification",
        text: `A new user with email ${userEmail} has logged in.`,  // Thông báo
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
      // Nếu không phải là POST request
      res.status(405).send({ error: "Method Not Allowed" });
    }
  });
});
