import Header from "@/components/base/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="main">
        {children}
      </main>
    </>
  );
}
