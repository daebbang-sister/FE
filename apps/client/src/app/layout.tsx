import "@repo/styles/src/globals.css";
import { LayoutUIProvider } from "@/shared/context/layout-ui.context";
import Header from "@/shared/components/layout/Header";
import SearchBar from "@/shared/components/layout/SearchBar";
import SideNavi from "@/shared/components/layout/SideNavi";
import Footer from "@/shared/components/layout/Footer";
import QuickBanner from "@/shared/components/floating/QuickBanner";
import Providers from "@/shared/components/Providers";

export const metadata = {
  title: {
    default: "대빵언니",
    template: "%s | 대빵언니",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description: "대빵언니 쇼핑몰",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <LayoutUIProvider>
            <QuickBanner />
            <Header />
            <SideNavi />
            <SearchBar />
            <main className="header-m flex min-h-[calc(100vh-var(--size-header-h)-var(--size-footer-h))] justify-center">
              {children}
            </main>
            <Footer />
          </LayoutUIProvider>
        </Providers>
      </body>
    </html>
  );
}
