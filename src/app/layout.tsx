import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { CatalogProvider } from "@/components/catalog/catalog-provider";
import { Header, Footer } from "@/components/site-shell";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, getSiteUrl } from "@/utils/site";
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
  metadataBase: getSiteUrl(),
  title: {
    default: "RodeVita | Drogaria & Bem-estar",
    template: "%s | RodeVita",
  },
  description:
    "Projeto demonstrativo da RodeVita, uma experiência digital de drogaria e bem-estar com catálogo de produtos, busca, categorias e solicitação de orçamento pelo WhatsApp.",
  applicationName: "RodeVita",
  authors: [
    {
      name: "RODE Soluções Inteligentes",
      url: "https://rodesolucoes.com.br",
    },
  ],
  creator: "RODE Soluções Inteligentes",
  publisher: "RODE Soluções Inteligentes",
  keywords: ["drogaria digital", "bem-estar", "catálogo demonstrativo"],
  icons: {
    icon: [{ url: "/brand/rodevita-simbolo.png", type: "image/png" }],
    apple: [{ url: "/brand/rodevita-simbolo.png", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "RodeVita",
    title: "RodeVita | Drogaria & Bem-estar",
    description: "Cuidado para todos os dias.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "RodeVita | Drogaria & Bem-estar",
    description: "Cuidado para todos os dias.",
  },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  const siteUrl = absoluteUrl("/");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: "RodeVita",
        alternateName: "RodeVita Drogaria & Bem-estar",
        description:
          "Projeto demonstrativo de uma experiência digital de drogaria e bem-estar.",
        inLanguage: "pt-BR",
        publisher: { "@id": `${siteUrl}#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: "RodeVita",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/brand/rodevita-logo-horizontal.png"),
        },
        description:
          "Marca fictícia e projeto conceitual desenvolvido pela RODE Soluções Inteligentes para demonstrar soluções digitais para farmácias.",
      },
    ],
  };

  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={structuredData} />
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
