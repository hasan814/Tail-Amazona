import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TailAmazons App",
  description: "Online Shopping",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
