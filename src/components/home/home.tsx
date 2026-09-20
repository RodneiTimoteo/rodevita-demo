"use client";

import { useMemo, useState } from "react";
import { Button, Container, SearchField, SectionTitle } from "@/components/ui";
import { useRouter } from "next/navigation";
import { useCatalog } from "@/components/catalog/catalog-provider";
import { QuotePanel } from "@/components/catalog/quote-panel";
import {
  CATEGORIAS_PRINCIPAIS,
  CATEGORIAS_ADICIONAIS,
} from "@/data/categorias";
import { filterProducts } from "@/components/catalog/filter-products";
import {
  LandingIntro,
  EditorialSections,
  ServiceSections,
  FinalCta,
} from "@/components/home/sections";
import { ProductCard } from "@/components/home/product-card";

export default function Home() {
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [mostrarMaisCategorias, setMostrarMaisCategorias] = useState(false);
  const router = useRouter();
  const {
    produtos,
    carregandoProdutos,
    erroProdutos,
    quantidadeTotal,
    adicionarAoCarrinho,
  } = useCatalog();
  const produtosFiltrados = useMemo(
    () => filterProducts(produtos, busca, categoriaSelecionada),
    [produtos, busca, categoriaSelecionada],
  );
  function renderizarCategoria(categoria: string) {
    const selecionada = categoriaSelecionada === categoria;

    return (
      <button
        key={categoria}
        type="button"
        aria-pressed={selecionada}
        onClick={() => setCategoriaSelecionada(categoria)}
        className={`shrink-0 rounded-full border px-4 py-3 text-sm font-semibold transition focus-visible:ring-4 focus-visible:ring-brand-soft ${
          selecionada
            ? "border-brand bg-brand text-surface shadow-sm"
            : "border-border bg-surface text-muted hover:border-brand hover:bg-brand-soft hover:text-brand-hover"
        }`}
      >
        {categoria}
      </button>
    );
  }

  function selecionarCategoria(categoria: string) {
    router.push(
      categoria === "Todos"
        ? "/produtos"
        : `/produtos?categoria=${encodeURIComponent(categoria)}`,
    );
  }
  return (
    <>
      <main id="inicio" className="flex-1 bg-background">
        <LandingIntro
          produtos={produtos}
          busca={busca}
          onSearch={setBusca}
          sugestoes={produtosFiltrados.slice(0, 5)}
          onSelect={selecionarCategoria}
          carregando={carregandoProdutos}
          erro={erroProdutos}
          onAdd={adicionarAoCarrinho}
        />
        <EditorialSections onSelect={selecionarCategoria} />
        <ServiceSections />
        <section id="catalogo" tabIndex={-1} aria-label="Catálogo completo">
          <Container className="py-12">
            <div className="mb-10">
              <p className="mb-2 text-sm font-semibold text-brand">
                RodeVita • Drogaria & Bem-estar
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <SectionTitle as="h2" className="text-3xl md:text-4xl">
                    Encontre o produto que você procura
                  </SectionTitle>

                  <p className="mt-3 text-muted">
                    Pesquise por nome, dosagem ou categoria.
                  </p>
                </div>

                <div className="rounded-full bg-brand px-5 py-3 font-semibold text-surface">
                  Orçamento: {quantidadeTotal} item(ns)
                </div>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              {/* Catálogo */}
              <div className="min-w-0">
                <SearchField
                  aria-label="Buscar produtos por nome, dosagem ou categoria"
                  value={busca}
                  onChange={(event) => setBusca(event.target.value)}
                  placeholder="Ex.: Dipirona, 500 mg, Analgésicos..."
                  className="mb-5"
                />

                <section aria-label="Filtrar por categoria" className="mb-8">
                  <div className="flex gap-2 overflow-x-auto p-1 pb-3 sm:flex-wrap sm:overflow-visible">
                    {CATEGORIAS_PRINCIPAIS.map(renderizarCategoria)}
                    <button
                      type="button"
                      aria-expanded={mostrarMaisCategorias}
                      aria-controls="categorias-adicionais"
                      onClick={() =>
                        setMostrarMaisCategorias((atual) => !atual)
                      }
                      className={`shrink-0 rounded-full border border-dashed px-4 py-3 text-sm font-semibold transition focus-visible:ring-4 focus-visible:ring-brand-soft ${
                        CATEGORIAS_ADICIONAIS.includes(categoriaSelecionada)
                          ? "border-brand bg-brand-soft text-brand-hover"
                          : "border-border bg-surface text-muted hover:bg-border"
                      }`}
                    >
                      Mais categorias {mostrarMaisCategorias ? "−" : "+"}
                    </button>
                  </div>

                  <div
                    id="categorias-adicionais"
                    hidden={!mostrarMaisCategorias}
                    className="mt-2 rounded-2xl border border-border bg-border/70 p-3"
                  >
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIAS_ADICIONAIS.map(renderizarCategoria)}
                    </div>
                  </div>

                  {CATEGORIAS_ADICIONAIS.includes(categoriaSelecionada) && (
                    <p className="mt-3 text-sm font-medium text-brand-hover">
                      Categoria selecionada: {categoriaSelecionada}
                    </p>
                  )}
                </section>

                {carregandoProdutos ? (
                  <p role="status" className="mb-5 text-sm text-muted">
                    Carregando produtos...
                  </p>
                ) : erroProdutos ? (
                  <div
                    role="alert"
                    className="mb-5 rounded-2xl border border-gold bg-warning-soft p-6 text-sm text-warning"
                  >
                    {erroProdutos}
                  </div>
                ) : (
                  <p className="mb-5 text-sm text-muted">
                    {produtosFiltrados.length} produto(s) encontrado(s)
                  </p>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  {produtosFiltrados.map((produto) => (
                    <ProductCard
                      key={produto.id}
                      produto={produto}
                      onAdd={adicionarAoCarrinho}
                    />
                  ))}
                </div>

                {!carregandoProdutos &&
                  !erroProdutos &&
                  produtosFiltrados.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
                      <p className="font-medium text-foreground">
                        Nenhum produto encontrado com esses filtros.
                      </p>

                      <p className="mt-2 text-sm text-muted">
                        Tente pesquisar por outro nome, dosagem ou categoria.
                      </p>
                      <Button
                        type="button"
                        onClick={() => {
                          setBusca("");
                          setCategoriaSelecionada("Todos");
                        }}
                        variant="primary"
                        className="mt-5"
                      >
                        Limpar filtros
                      </Button>
                    </div>
                  )}
              </div>

              {/* Carrinho */}
              <QuotePanel className="lg:sticky lg:top-28" />
            </div>
          </Container>
        </section>
        <FinalCta />
      </main>
    </>
  );
}
