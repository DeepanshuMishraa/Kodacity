import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "~/components/ui/toaster";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  title: "Kodacity - For the dev by the dev",
  description:
    "A Practice Platform for developers allowing them to practice various coding concepts",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
