import Header from "@/components/base/Header";
import Navigation from "@/components/base/Navigation";

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
      <Navigation />
    </>
  );
}
