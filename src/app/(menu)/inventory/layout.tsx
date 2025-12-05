import Link from "next/link";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="inventory">
            <div className="inventory__top">
                <nav className="inventory__navigation">
                    <Link href={'/inventory'} className="inventory__link">
                        Инвентарь
                    </Link>
                    <Link href={'/inventory/battle-cards'} className="inventory__link">
                        Боевые
                    </Link>
                    <Link href={'/inventory/special-cards'} className="inventory__link">
                        Специальные
                    </Link>
                </nav>
            </div>
            {children}
        </div>
    );
}
