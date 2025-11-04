import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/base/Header";


import '@/styles/main.scss'
import '@/styles/profile.scss'
import '@/styles/battleCards.scss'
import '@/styles/shop.scss'
import '@/styles/twists.scss'

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Anicard",
  description: "Anime gacha game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main className="main">
          {children}
        </main>
      </body>
    </html>
  );
}
