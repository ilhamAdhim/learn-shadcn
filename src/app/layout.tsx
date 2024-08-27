"use client"
// import type { Metadata } from "next";
import '@radix-ui/themes/styles.css';
import "./globals.css";
import { cn } from "@/lib/utils"
import { Inter as FontSans } from "next/font/google"
import { ThemeProvider } from "next-themes";
import { useAtomValue } from "jotai/react";
import { colorMode } from "@/store";
import { Theme } from '@radix-ui/themes';
import { Toaster } from 'sonner';


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialColorMode = useAtomValue(colorMode)
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>
        {/* For Radix UI */}
        <Theme>
          {/* For Dark mode */}
          <ThemeProvider
            attribute="class"
            defaultTheme={initialColorMode}
            enableSystem
          >
            {children}
          </ThemeProvider>
        </Theme>
        <Toaster richColors />

      </body>

    </html>
  );
}
