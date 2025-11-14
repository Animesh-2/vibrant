"use client";

import { useEffect, useState, ComponentType } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { refreshToken as refreshTokenApi } from "@/tanstack/services/authService/authService";

interface DecodedToken {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

interface AuthRouteProps {
  requireAuth?: boolean;
}

const withProtectedRoute = <P extends object>(
  WrappedComponent: ComponentType<P>,
  { requireAuth = false }: AuthRouteProps = {}
) => {
  return function AuthRouteWrapper(props: P) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      const checkAuth = async () => {
        let authToken = Cookies.get("authToken");
        const refreshToken = Cookies.get("refreshToken");

        // No valid token → redirect
        if (!authToken && !refreshToken) {
          if (requireAuth) {
            router.push("/auth/login");
          }
          return;
        }

        // Refresh token if expired or missing
        if (refreshToken) {
          try {
            const response = await refreshTokenApi(refreshToken);
            if (response.success && response.data.accessToken) {
              authToken = response.data.accessToken ?? "";
              Cookies.set("authToken", authToken, { path: "/" });
              if (response.data.refreshToken) {
                Cookies.set("refreshToken", response.data.refreshToken, {
                  path: "/",
                  expires: 30,
                });
              }
            }
            if (!pathname.startsWith("/chat")) {
              router.replace("/chat");
              return;
            }
          } catch (err) {
            console.error("Refresh token failed:", err);
          }
        }
      };

      checkAuth();
    }, [router, requireAuth]);
    return <WrappedComponent {...props} />;
  };
};

export default withProtectedRoute;
