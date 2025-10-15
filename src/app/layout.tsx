import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="pl" suppressHydrationWarning>
      <body className={`${ibmPlexSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
