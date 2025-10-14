import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm_plex_sans",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${ibmPlexSans.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
