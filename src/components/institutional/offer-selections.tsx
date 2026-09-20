"use client";
import Link from "next/link";
import { useCatalog } from "@/components/catalog/catalog-provider";
import { CatalogLoading } from "@/components/catalog/catalog-controls";
import { ProductCard } from "@/components/home/product-card";
import { Button, SectionTitle } from "@/components/ui";

export function OfferSelections() {
  const {
    produtos,
    carregandoProdutos,
    erroProdutos,
    tentarNovamente,
    adicionarAoCarrinho,
    carrinho,
  } = useCatalog();
  const categories = [
    "Vitaminas e Suplementos",
    "Mamãe e Bebê",
    "Cuidados com a Pele",
    "Higiene Pessoal",
  ];
  if (carregandoProdutos) return <CatalogLoading />;
  if (erroProdutos)
    return (
      <div role="alert" className="ui-card text-center">
        <p className="text-muted">
          Não foi possível carregar as seleções agora.
        </p>
        <Button className="mt-5" onClick={tentarNovamente}>
          Tentar novamente
        </Button>
      </div>
    );
  return (
    <div className="space-y-12">
      {categories.map((category) => {
        const selection = produtos
          .filter((p) => p.categoria.trim() === category)
          .slice(0, 3);
        return (
          <section key={category} aria-label={category}>
            <div className="section-heading">
              <SectionTitle as="h3" className="text-xl">
                {category}
              </SectionTitle>
              <Link
                href={`/produtos?categoria=${encodeURIComponent(category)}`}
                className="text-sm font-semibold text-health"
              >
                Explorar categoria ↗
              </Link>
            </div>
            {selection.length ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {selection.map((produto) => (
                  <ProductCard
                    key={produto.id}
                    produto={produto}
                    onAdd={adicionarAoCarrinho}
                    quantidade={
                      carrinho.find(
                        (item) =>
                          item.id === produto.id &&
                          item.nome === produto.nome &&
                          item.dosagem === produto.dosagem,
                      )?.quantidade ?? 0
                    }
                  />
                ))}
              </div>
            ) : (
              <p className="rounded-xl border border-border p-5 text-sm text-muted">
                Nenhum produto disponível nesta seleção no momento.
              </p>
            )}
          </section>
        );
      })}
    </div>
  );
}
