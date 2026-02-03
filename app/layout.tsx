import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/app/contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistemas Web Personalizados | Desenvolvimento Sob Medida",
  description: "Desenvolvimento de sistemas web personalizados sob medida para empresas e pessoas. Soluções modernas, escaláveis e de alta performance.",
  keywords: ["sistemas web", "desenvolvimento web", "sistemas personalizados", "aplicações web"],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    title: "Sistemas Web Personalizados | Desenvolvimento Sob Medida",
    description: "Desenvolvimento de sistemas web personalizados sob medida para empresas e pessoas.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="smooth-scroll">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}

