import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthCheck } from "@/components/auth/auth-check";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ad Campaign Manager",
  description: "Manage your advertising campaigns efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100`}
      >
        <ThemeProvider attribute={"class"} defaultTheme="dark" enableSystem={false}>
          <AuthCheck />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}



import './globals.css'