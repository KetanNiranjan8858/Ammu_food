import type { Metadata } from "next";
import "./globals.css";
import { SiteContentProvider } from "@/context/SiteContentContext";

export const metadata: Metadata = {
  title: "Ammu Foods | 100% Pure Kashmiri Saffron (Grade-1 Mongra) - ₹350/1g",
  description:
    "Buy authentic 100% pure Grade-1 Kashmiri Mongra saffron from Ammu Foods. Direct from Kashmir valley, lab tested, high crocin color & aroma. Inquire online at our official customer desk.",
  keywords: [
    "Ammu Foods",
    "Ammu saffron",
    "buy pure saffron online",
    "Kashmiri saffron 1g price",
    "Mongra saffron India",
    "pure kesar",
    "saffron for pregnancy",
    "grade 1 saffron",
  ],
  openGraph: {
    title: "Ammu Foods | Pure Kashmiri Saffron (Grade-1)",
    description: "Liquid gold in every thread. Handpicked authentic Kashmiri saffron 1g at ₹350.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-[#B33010] selection:text-white">
        <SiteContentProvider>
          {children}
        </SiteContentProvider>
      </body>
    </html>
  );
}

