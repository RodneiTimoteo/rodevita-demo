import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { CatalogProvider } from "@/components/catalog/catalog-provider";
import { Header, Footer } from "@/components/site-shell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RodeVita | Drogaria & Bem-estar",
  description:
    "Cuidado para todos os dias. Consulte nosso catálogo e solicite seu orçamento pelo WhatsApp.",
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#catalogo" className="skip-link">
          Pular para o conteúdo
        </a>
        <CatalogProvider>
          <Header />
          {children}
          <Footer />
        </CatalogProvider>
      </body>
    </html>
  );
}
