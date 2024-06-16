import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/style/globals.css";

import ReduxProvider from "./providers/redux";

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
        <ReduxProvider>
          <main className="flex min-h-screen">{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
