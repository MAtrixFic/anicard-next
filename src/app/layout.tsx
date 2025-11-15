import type { Metadata } from "next";

import '@/styles/main.scss'
import '@/styles/profile.scss'
import '@/styles/battleCards.scss'
import '@/styles/shop.scss'
import '@/styles/twists.scss'
import '@/styles/trades.scss'
import '@/styles/inventory.scss'
import '@/styles/battleSearch.scss'
import '@/styles/fight.scss'
import '@/styles/rating.scss'

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
                {children}
            </body>
        </html>
    );
}
