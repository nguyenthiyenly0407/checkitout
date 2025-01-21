const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Cấu hình transporter với thông tin SMTP của Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nguyenlyyenthi@gmail.com',  // Địa chỉ email của bạn
    pass: 'ueec nqox ieot lczx',     // Sử dụng mật khẩu ứng dụng của bạn
  },
});

// Hàm gửi email thông báo khi người dùng đăng nhập
exports.sendNotification = functions.https.onCall((data, context) => {
  const userEmail = data.email;  // Lấy email người dùng đã đăng nhập
  const mailOptions = {
    from: userEmail,  // Email người dùng làm "from"
    to: 'nguyenlyyenthi@gmail.com',  // Gửi thông báo đến email của bạn
    subject: 'New Login Notification',
    text: `A new user with email ${userEmail} has logged in.`,  // Thông báo
  };

  // Gửi email
  return transporter.sendMail(mailOptions)
    .then(() => {
      console.log('Email sent successfully');
      return { message: 'Email sent successfully' };
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      throw new functions.https.HttpsError('internal', 'Unable to send email');
    });
});
