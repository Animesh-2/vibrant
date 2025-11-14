"use client";

import { useState } from "react";
import { registerUser } from "./register-service";

export function useRegister() {
  const [loading, setLoading] = useState(false);

  const signup = async (payload: any) => {
    try {
      setLoading(true);

      const res = await registerUser(payload);

      if (!res.success) {
        return { success: false, message: res.message };
      }

      const { token, user } = res.data;

      // store auth
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      return { success: true, user, token };
    } catch (err) {
      return { success: false, message: "Something went wrong" };
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
}
