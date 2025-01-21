import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();

export const sendLoginNotification = async (email) => {
  try {
    const sendEmailFunction = httpsCallable(functions, "sendEmailNotification");
    await sendEmailFunction({ email }); // Gửi thông tin email người dùng
    console.log("Email notification sent!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
