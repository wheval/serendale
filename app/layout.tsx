import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://serendale.wheval.tech'),
  title: "Serendale AI - Fast Blockchain Scalable AI Technology",
  description: "Experience the future with Serendale AI's fast blockchain scalable AI technology. Join our waitlist to be first to access revolutionary AI solutions.",
  keywords: ["Serendale AI", "blockchain", "artificial intelligence", "AI technology", "scalable AI", "fast blockchain", "crypto", "Web3"],
  authors: [{ name: "Serendale AI Team" }, { name: "Wheval" }],
  creator: "Wheval",
  publisher: "Wheval",
  
  // OpenGraph metadata
  openGraph: {
    title: "Serendale AI - Fast Blockchain Scalable AI Technology",
    description: "Experience the future with Serendale AI's fast blockchain scalable AI technology. Join our waitlist to be first to access revolutionary AI solutions.",
    url: "https://serendale.wheval.tech", 
    siteName: "Serendale AI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Serendale AI - Fast Blockchain Scalable AI Technology",
        type: "image/png",
      },
      {
        url: "/og-image-square.png", 
        width: 1200,
        height: 1200,
        alt: "Serendale AI Logo",
        type: "image/png",
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Serendale AI - Fast Blockchain Scalable AI Technology",
    description: "Experience the future with Serendale AI's fast blockchain scalable AI technology. Join our waitlist today!",
    creator: "@whevaldev",  
    site: "@whevaldev", 
    images: ["/og-image.png"],
  },

  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Categories and classification
  category: "technology",
  
  // App-specific metadata
  applicationName: "Serendale AI",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
};


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional custom meta tags */}
        <link rel="canonical" href="https://serendale.wheval.tech" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body
        className={`${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
