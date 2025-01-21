// src/firebaseFunctions.js
import { getFunctions, httpsCallable } from "firebase/functions";
import { auth, provider, signInWithPopup } from "./firebase";

// Khởi tạo Firebase Functions
const functions = getFunctions();

// Hàm gửi thông báo đăng nhập qua email
export const sendLoginNotification = async (email) => {
  try {
    const sendEmailFunction = httpsCallable(functions, "sendEmailNotification");
    await sendEmailFunction({ email });
    console.log("Email notification sent!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
