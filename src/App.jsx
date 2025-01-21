import React, { useState } from "react";
import { auth, provider, signInWithPopup } from "./firebase";
import FormPage from "./Formpage";

const App = () => {
  const [user, setUser] = useState(null); // Trạng thái theo dõi thông tin người dùng

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const loggedInUser = result.user;
      setUser(loggedInUser); // Lưu thông tin người dùng vào state
      console.log("Logged in user:", loggedInUser);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div>
      {!user ? (
        // Hiển thị nút đăng nhập nếu chưa đăng nhập
        <div>
          <h1>Google Login with Firebase</h1>
          <button onClick={handleLogin}>Login with Google</button>
        </div>
      ) : (
        // Hiển thị Google Form sau khi đăng nhập
        <div>
          <FormPage />
        </div>
      )}
    </div>
  );
};

export default App;
