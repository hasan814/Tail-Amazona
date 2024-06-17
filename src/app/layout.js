import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { StoreProvider } from "@/utils/Store";
import NextAuthProvider from "@/providers/NextAuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TailAmazons App",
  description: "Online Shopping",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen justify-between`}
      >
        <NextAuthProvider>
          <StoreProvider>
            <Header />
            <main className="container m-auto mt-4 px-4">{children}</main>
            <Footer />
          </StoreProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
