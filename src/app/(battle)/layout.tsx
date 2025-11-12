export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main style={{ paddingInline: '1rem', paddingBlock: 0 }}>
            {children}
        </main>
    );
}
