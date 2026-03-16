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
                        ИВ
                    </Link>
                    <Link href={'/inventory/battle-cards'} className="inventory__link">
                        БК
                    </Link>
                    <Link href={'/inventory/pets'} className="inventory__link">
                        ПК
                    </Link>
                </nav>
            </div>
            {children}
        </div>
    );
}
