import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthSessionProvider } from "@/components/session-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Para Sua Saúde - Seu guia para uma vida saudável",
  description:
    "Seu guia completo para uma vida mais saudável e equilibrada, com dicas sobre suplementos naturais, fitness, saúde mental, cuidados com o corpo e alimentação saudável.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AuthSessionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
