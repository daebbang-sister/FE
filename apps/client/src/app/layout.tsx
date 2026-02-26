import "@repo/styles/src/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="min-h-screen" suppressHydrationWarning>
        <header className="h-25 w-full fixed top-0 bg-neutral-900">
          Header
        </header>
        <main className="flex justify-center header-h">{children}</main>
        <footer className="h-25 bg-neutral-900">Footer</footer>
      </body>
    </html>
  );
}
