import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const signup = async ({
    fullName,
    userName,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputError({
      fullName,
      userName,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          userName,
          password,
          confirmPassword,
          gender,
        }),
      });
      const data = await res.json();

     
      
      if (data.statusCode == 201) {
        toast.success(data.message);
        localStorage.setItem('chat-user', JSON.stringify(data.user))
        setAuthUser(data.user);
      } else {
        toast.error(data.error);
      }

      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputError({
  fullName,
  userName,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !userName || !password || !confirmPassword || !gender) {
    toast.error("please fill all the fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("password and confirm password should be the same!");
    return false;
  }
  if (password.length < 6) {
    toast.error("password must be at least 6 characters");
    return false;
  }
  return true;
}
