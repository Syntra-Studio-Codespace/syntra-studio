import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Syntra.studio",
    template: "%s | Syntra.studio",
  },
  description:
    "Premium web development studio for business websites, nonprofit websites, landing pages, full-stack applications, WordPress sites, and maintenance plans.",
  metadataBase: new URL("https://syntra.studio"),
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
