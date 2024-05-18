import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/style/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizz musical",
  description: "Quizz musical créé par Yann Lauwers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen">{children}</main>
      </body>
    </html>
  );
}
