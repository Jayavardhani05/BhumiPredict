import { useEffect } from "react";
import LoginModal from "@/components/LoginModal";

export default function Login() {
  useEffect(() => {
    localStorage.removeItem("bhumipredict_auth");
  }, []);

  const handleLogin = () => {
    localStorage.setItem("bhumipredict_auth", "true");
    window.location.href = "/dashboard";
  };

  return <LoginModal onLogin={handleLogin} />;
}
