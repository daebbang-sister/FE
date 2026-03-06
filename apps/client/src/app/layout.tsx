import "@repo/styles/src/globals.css";
import Header from "../shared/components/layout/Header";
import Footer from "../shared/components/layout/Footer";
import SideNavi from "apps/client/src/shared/components/layout/SideNavi";
import SearchBar from "apps/client/src/shared/components/layout/SearchBar";
import { LayoutUIProvider } from "apps/client/src/shared/context/layout-ui.context";

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
        <LayoutUIProvider>
          <Header></Header>
          <SideNavi></SideNavi>
          <SearchBar></SearchBar>
          <main className="flex justify-center header-m min-h-[calc(100vh-var(--size-header-h)-var(--size-footer-h))]">
            {children}
          </main>
          <Footer></Footer>
        </LayoutUIProvider>
      </body>
    </html>
  );
}
