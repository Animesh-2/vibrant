"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SplashScreen() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    // const token = localStorage.getItem("authToken");
    const token = true;
    const splashShown = localStorage.getItem("splashShown");

    if (splashShown) {
      // Already shown: skip splash
      setShowSplash(false);
      router.replace(token ? "/dashboard" : "/signin");
    } else {
      // Show splash for 2 seconds
      const timer = setTimeout(() => {
        localStorage.setItem("splashShown", "true");
        setShowSplash(false);
        router.replace(token ? "/dashboard" : "/signin");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [router]);

  if (!mounted || !showSplash) return null;

  return (
    <section className="flex flex-col items-center justify-center  text-center">
    </section>
  );
}
