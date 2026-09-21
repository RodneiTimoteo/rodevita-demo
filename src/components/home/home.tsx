"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCatalog } from "@/components/catalog/catalog-provider";
import { filterProducts } from "@/components/catalog/filter-products";
import {
  CategorySection,
  Differentials,
  EditorialSection,
  FeaturedProducts,
  FinalCta,
  Hero,
  HomeSearch,
  HowItWorks,
  ServicesSummary,
} from "@/components/home/sections";

export default function Home() {
  const [busca, setBusca] = useState("");
  const router = useRouter();
  const {
    produtos,
    carregandoProdutos,
    erroProdutos,
    carrinho,
    adicionarAoCarrinho,
  } = useCatalog();

  const sugestoes = useMemo(
    () =>
      busca.trim()
        ? filterProducts(produtos, busca, "Todos").slice(0, 5)
        : [],
    [produtos, busca],
  );

  const destaques = useMemo(() => {
    const selecionados = [];
    const categorias = new Set<string>();

    for (const produto of produtos) {
      const categoria = produto.categoria.trim();
      if (!categorias.has(categoria)) {
        selecionados.push(produto);
        categorias.add(categoria);
      }
      if (selecionados.length === 6) return selecionados;
    }

    for (const produto of produtos) {
      if (!selecionados.includes(produto)) selecionados.push(produto);
      if (selecionados.length === 6) break;
    }

    return selecionados;
  }, [produtos]);

  function abrirBusca(termo: string) {
    const buscaNormalizada = termo.trim();
    router.push(
      buscaNormalizada
        ? `/produtos?busca=${encodeURIComponent(buscaNormalizada)}`
        : "/produtos",
    );
  }

  function abrirCategoria(categoria: string) {
    router.push(`/produtos?categoria=${encodeURIComponent(categoria)}`);
  }

  const quantidadeSelecionada = (id: number, nome: string, dosagem: string) =>
    carrinho.find(
      (item) =>
        item.id === id && item.nome === nome && item.dosagem === dosagem,
    )?.quantidade ?? 0;

  return (
    <main id="catalogo" tabIndex={-1} className="flex-1 bg-background">
      <Hero />
      <HomeSearch
        busca={busca}
        onSearch={setBusca}
        onSubmit={abrirBusca}
        sugestoes={sugestoes}
        carregando={carregandoProdutos}
        erro={erroProdutos}
      />
      <CategorySection
        produtos={produtos}
        carregando={carregandoProdutos}
        erro={erroProdutos}
        onSelect={abrirCategoria}
      />
      <FeaturedProducts
        produtos={destaques}
        carregando={carregandoProdutos}
        erro={erroProdutos}
        onAdd={adicionarAoCarrinho}
        getQuantity={(produto) =>
          quantidadeSelecionada(produto.id, produto.nome, produto.dosagem)
        }
      />
      <EditorialSection />
      <ServicesSummary />
      <HowItWorks />
      <Differentials />
      <FinalCta />
    </main>
  );
}
