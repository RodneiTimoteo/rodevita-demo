"use client";

import { useState } from "react";
import { Button, Card, SectionTitle } from "@/components/ui";

export function ProductFilters({
  categories,
  selected,
  onSelect,
  loading,
}: {
  categories: { name: string; count: number }[];
  selected: string;
  onSelect: (category: string) => void;
  loading: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <aside className="catalog-filters" aria-label="Filtros do catálogo">
      <Button
        variant="secondary"
        className="w-full justify-between lg:hidden"
        aria-expanded={open}
        aria-controls="catalog-categories"
        onClick={() => setOpen(!open)}
      >
        Filtrar por categoria <span aria-hidden="true">{open ? "−" : "+"}</span>
      </Button>
      <div
        id="catalog-categories"
        className={`${open ? "block" : "hidden"} mt-3 rounded-2xl border border-border bg-surface p-4 lg:mt-0 lg:block`}
      >
        <SectionTitle as="h2" className="mb-4 text-lg">
          Categorias
        </SectionTitle>
        <div className="catalog-category-list">
          {categories.map(({ name, count }) => (
            <button
              type="button"
              key={name}
              aria-pressed={selected === name}
              className={`catalog-filter ${selected === name ? "catalog-filter-active" : ""}`}
              onClick={() => {
                onSelect(name);
                setOpen(false);
              }}
            >
              <span>{name === "Todos" ? "Todos os produtos" : name}</span>
              <span className="text-xs tabular-nums">
                {loading ? "—" : count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
export function CatalogLoading() {
  return (
    <div role="status" aria-label="Carregando catálogo">
      <span className="sr-only">Carregando produtos...</span>
      <div aria-hidden="true" className="catalog-product-grid">
        {Array.from({ length: 6 }, (_, i) => (
          <Card key={i} className="min-h-64">
            <div className="h-3 w-2/3 rounded bg-health-soft" />
            <div className="mt-6 h-6 rounded bg-brand-soft" />
            <div className="mt-3 h-4 w-1/3 rounded bg-brand-soft" />
            <div className="mt-7 h-6 w-1/2 rounded-full bg-health-soft" />
            <div className="mt-8 h-12 rounded-xl bg-brand-soft" />
          </Card>
        ))}
      </div>
    </div>
  );
}
export function CatalogEmptyState({
  emptyCategory,
  onReset,
}: {
  emptyCategory: boolean;
  onReset: () => void;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
      <SectionTitle className="text-xl">
        {emptyCategory
          ? "Nenhum produto disponível nesta categoria no momento."
          : "Nenhum produto encontrado com esses filtros."}
      </SectionTitle>
      <p className="mt-4 text-muted">
        Explore outras categorias ou limpe os filtros para continuar.
      </p>
      <Button className="mt-6" onClick={onReset}>
        Ver todos os produtos
      </Button>
    </div>
  );
}
