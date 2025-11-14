import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";

export const metadata = {
  title: "MerilCare — Rental & Post-Discharge Care",
  description: "Medical equipment rental & caregiver marketplace",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0C0C0C] text-gray-100 flex flex-col">

        <ReactQueryProvider>
          <Navbar />

          <main className="flex-1 mx-auto px-4 py-10 w-full">
            {children}
          </main>

          <Footer />
        </ReactQueryProvider>

      </body>
    </html>
  );
}
