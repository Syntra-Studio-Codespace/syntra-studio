import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import { CurrencyProvider } from "@/components/currency/CurrencyProvider";
import { siteSettings } from "@/data/site-settings";
import { getPublicSiteUrl } from "@/lib/seo/site-url";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Syntra.studio",
    template: "%s | Syntra.studio",
  },
  description:
    "Premium web development studio for business websites, nonprofit websites, landing pages, full-stack applications, WordPress sites, and maintenance plans.",
  metadataBase: new URL(getPublicSiteUrl()),
  alternates: {
    canonical: "/",
  },
  applicationName: "Syntra.studio",
  authors: [{ name: "Syntra.studio" }],
  creator: "Syntra.studio",
  keywords: [
    "web development studio",
    "business websites",
    "NGO websites",
    "landing pages",
    "full-stack web applications",
    "WordPress sites",
    "website maintenance",
  ],
  openGraph: {
    title: "Syntra.studio",
    description:
      "Premium web development studio for business websites, nonprofit websites, landing pages, full-stack applications, WordPress sites, and maintenance plans.",
    locale: "en_US",
    siteName: "Syntra.studio",
    type: "website",
    url: "/",
  },
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Syntra.studio",
    description:
      "Premium web development studio for business websites, nonprofit websites, landing pages, full-stack applications, WordPress sites, and maintenance plans.",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteSettings.name,
  description: siteSettings.tagline,
  sameAs: [siteSettings.instagramUrl],
  url: getPublicSiteUrl(),
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
          type="application/ld+json"
        />
        <CurrencyProvider>
          <SmoothScrollProvider>
            <Header />
            {children}
            <Footer />
          </SmoothScrollProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
