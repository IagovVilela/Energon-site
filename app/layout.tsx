import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/app/contexts/LanguageContext";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { AuthProvider } from "@/app/components/AuthProvider";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Energon | Soluções Digitais para o Seu Negócio",
  description: "Sistemas e sites sob medida para aumentar vendas, visibilidade e credibilidade da sua empresa no mercado.",
  keywords: ["sistemas sob medida", "site profissional", "aumentar vendas", "gestão de negócios", "presença digital"],
  openGraph: {
    title: "Energon | Soluções Digitais para o Seu Negócio",
    description: "Sistemas e sites sob medida para aumentar vendas, visibilidade e credibilidade da sua empresa.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="font-body">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            <LanguageProvider>
              {children}
              <Toaster />
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
