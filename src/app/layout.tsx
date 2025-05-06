import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from '@/components/ThemeProvider';
import "./globals.css";
import NavSwitcher from "@/components/NavSwitcher";
import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Università degli Studi di Padova",
  description: "WebApp per attività laboratoriali di OpenDay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <html lang="en" suppressHydrationWarning className="scroll-smooth">
        <head />
        <body>
          {/* Skip Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:outline-2 focus:outline-blue-500 focus:rounded"
          >
            Vai al contenuto
          </a>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="md:hidden block">
              <Header />
            </div>
            <NavSwitcher />
            <main tabIndex={-1}>
              {children}
            </main>
            <BackToTop />
            <Footer />
          </ThemeProvider>

        </body>
      </html>
    </>
  )
}


