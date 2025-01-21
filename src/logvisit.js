import { logVisit } from "./firebase";

const GoogleAuth = ({ onLoginSuccess }) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = {
        email: tokenResponse.email,
        name: tokenResponse.name,
      };
      await logVisit(userInfo);
      onLoginSuccess(tokenResponse);
    },
  });
};
