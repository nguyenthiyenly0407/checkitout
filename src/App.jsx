import React, { useState, useEffect } from "react";
import { auth, provider } from "./firebase";
import FormPage from "./Formpage";
import { sendLoginNotification } from './firebaseFunctions'; // Đảm bảo rằng tên tệp là firebaseFunctions.jsx


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user); // Lưu thông tin người dùng vào state
        // Gửi email thông báo khi có người đăng nhập
        await sendLoginNotification(user.email);
      }
    });
    return unsubscribe; // Dọn dẹp khi component unmount
  }, []);

  return (
    <div>
      {user ? (
        <FormPage />
      ) : (
        <div>
          
        </div>
      )}
    </div>
  );
};

export default App;
