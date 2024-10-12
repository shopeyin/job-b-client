import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Job Board",
  description: "Job board app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
