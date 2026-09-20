import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogPage } from "@/components/catalog/catalog-page";
import { CatalogLoading } from "@/components/catalog/catalog-controls";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Produtos | RodeVita Drogaria & Bem-estar",
  description:
    "Explore o catálogo demonstrativo da RodeVita. Pesquise medicamentos, vitaminas, higiene, beleza e outros produtos.",
};
export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main id="catalogo" className="flex-1">
          <Container className="py-16">
            <CatalogLoading />
          </Container>
        </main>
      }
    >
      <CatalogPage />
    </Suspense>
  );
}
