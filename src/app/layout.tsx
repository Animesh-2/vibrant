import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import { getUserRole } from "@/utils/getRole";
import { AuthProvider } from "./AuthProvider/page";

export const metadata = {
  title: "VIBRANT | Rent devices, hire nurses, verify care with AI",
  description:
    "A healthcare commerce platform to rent medical devices, book caregivers, manage slots, and verify procedures through AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = getUserRole();
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-[#03060d] text-gray-100">
        <AuthProvider>
          <ReactQueryProvider>
            <Navbar initialRole={role} />
            <main className="mx-auto w-full flex-1 px-4 py-10 sm:px-6 lg:px-10">
              {children}
            </main>
            <Footer />
          </ReactQueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
