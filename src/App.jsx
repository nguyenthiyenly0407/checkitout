import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup } from "./firebase";
import { sendLoginNotification } from "./firebaseFunctions";
import FormPage from "./Formpage";

const App = () => {
  const [user, setUser] = useState(null); // Trạng thái theo dõi thông tin người dùng

  // Kiểm tra trạng thái đăng nhập mỗi khi ứng dụng được tải
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser); // Lưu thông tin người dùng vào state
        console.log("Logged in user:", loggedInUser);
        
        // Gửi thông báo đăng nhập qua email
        await sendLoginNotification(loggedInUser.email);
      }
    });

    // Cleanup khi component unmount
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      setUser(loggedInUser); // Lưu thông tin người dùng vào state
      console.log("Logged in user:", loggedInUser);
      
      // Gửi thông báo đăng nhập qua email
      await sendLoginNotification(loggedInUser.email);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      {!user ? (
        <div>
          
        </div>
      ) : (
        <div>
          <FormPage />
        </div>
      )}
    </div>
  );
};

export default App;
