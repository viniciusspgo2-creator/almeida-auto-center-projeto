import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/site.css";
import { getSettings, siteUrl } from "@/lib/settings";
import { Analytics } from "@/components/site/analytics";
import { TempDownloadButton } from "@/components/site/temp-download-button";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const baseUrl = siteUrl(settings);
  const image = settings.seoOgImage.startsWith("http")
    ? settings.seoOgImage
    : `${baseUrl}${settings.seoOgImage}`;
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: settings.seoHomeTitle,
      template: `%s | ${settings.siteName}`,
    },
    description: settings.seoHomeDescription,
    applicationName: settings.siteName,
    icons: { icon: "/images/favicon.webp", apple: "/images/favicon.webp" },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: settings.siteName,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const settings = await getSettings();
  return {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: settings.seoThemeColor,
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} js`}>
      <body className="antialiased">
        <Analytics />
        {children}
        <TempDownloadButton />
        <Toaster />
        <SonnerToaster position="bottom-left" richColors theme="dark" />
      </body>
    </html>
  );
}
