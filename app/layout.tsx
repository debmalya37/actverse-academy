import type { Metadata } from "next";
import { Montserrat, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// 1. Configure the brand fonts
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// 2. Set default global SEO metadata
export const metadata: Metadata = {
  title: "Actverse Academy — Acting Classes in Mumbai",
  description: "Discover acting foundation programs, diplomas, workshops and dance training at Actverse Academy in Versova, Mumbai.",
  icons: {
    icon: "/icon.png", // Ensure you have a favicon in the public/ folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 3. Inject the font variables into the HTML tag so Tailwind can use them
    <html lang="en" className={`${montserrat.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}