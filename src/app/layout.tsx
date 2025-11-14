"use client";

import { ThemeProvider } from "next-themes";
import QueryProvider from "@/tanstack/providers/query-provider";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNavAndSidebar =
    pathname === "/signin" || pathname === "/signup";

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-dark-gradient text-white">

        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <QueryProvider>
            <Toaster position="top-center" />

            {/* AUTH PAGES (no navbar/sidebar) */}
            {hideNavAndSidebar ? (
              <main className="relative flex flex-col min-h-screen">
                {children}
              </main>
            ) : (
              <div className="h-screen flex flex-col">

                {/* NAVBAR */}
                {/* <Navbar /> */}

                <div className="flex flex-1">

                  {/* SIDEBAR */}
                  {/* <div className="min-w-[25px]">
                    <MainSidebar />
                  </div> */}

                  {/* MAIN CONTENT WITH NAVBAR SPACE */}
                  <main className="flex-1 bg-main overflow-y-auto rounded-tl-2xl">
                    {children}
                  </main>
                </div>
              </div>
            )}

          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
