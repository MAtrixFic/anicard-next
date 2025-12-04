import type { Metadata } from "next";
import QueryProvider from "@/components/server/QueryProvider";
import MessageController from "@/components/additionals/messages/MessageController";

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
    icons: {
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
            <body>
                <QueryProvider>
                    {children}
                    <MessageController />
                </QueryProvider>
            </body>
        </html>
    );
}
