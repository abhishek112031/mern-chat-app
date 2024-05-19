import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async (userName, password) => {
    const success = handleInputError({
      userName,
      password,
    });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });

      console.log("hitted!!!");
      const data = await res.json();

      if (data.statusCode == 200) {
        toast.success(data.message);
        localStorage.setItem("chat-user", JSON.stringify(data.user));
        setAuthUser(data.user);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

function handleInputError({ userName, password, confirmPassword, gender }) {
  if (!userName || !password) {
    toast.error("please fill all the fields");
    return false;
  }
  if (password.length < 6) {
    toast.error("password must be at least 6 characters");
    return false;
  }
  return true;
}
