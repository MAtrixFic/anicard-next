export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main style={{padding: '1rem'}}>
            {children}
        </main>
    );
}
