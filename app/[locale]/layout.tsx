import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "COLOMBIA WELLNESS WEEK",
  description: "La Semana Más Importante del Bienestar en Latinoamérica",
};

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children, params } = props;
  const { locale } = await params; // Se espera la resolución de params

  let messages;
  try {
    // Import asíncrono de las traducciones
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    return notFound();
  }

  return (
    <html lang={locale} className="relative">
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
