import { Inter } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { AuthProvider } from "@/components/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
       
        <AuthProvider>
          <Toaster />
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}


