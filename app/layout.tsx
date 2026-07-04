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
  title: "Energon | Sistemas Web de Alto Nível",
  description: "Desenvolvimento de sistemas web personalizados sob medida para empresas e pessoas. Soluções modernas, escaláveis e de alta performance.",
  keywords: ["sistemas web", "desenvolvimento web", "sistemas personalizados", "aplicações web"],
  openGraph: {
    title: "Energon | Sistemas Web de Alto Nível",
    description: "Desenvolvimento de sistemas web personalizados sob medida para empresas e pessoas.",
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
