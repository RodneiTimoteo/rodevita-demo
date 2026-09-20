"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Container, SearchField, SectionTitle } from "@/components/ui";
import { Header } from "@/components/site-shell";
import {
  LandingIntro,
  EditorialSections,
  ServiceSections,
  FinalCta,
} from "@/components/home/sections";
import { ProductCard } from "@/components/home/product-card";
import type { Produto } from "@/data/produtos";

const URL_PRODUTOS =
  "https://script.google.com/macros/s/AKfycbzW9i1xHF_fG-hES1yWNi0bZl-L05Bf9NjhVuUJJuAdT_cc72KK5GrFQM06RZzusKp5zg/exec";

type ProdutoApi = Produto & {
  disponivel: boolean;
};

function ehProdutoApi(valor: unknown): valor is ProdutoApi {
  if (typeof valor !== "object" || valor === null) return false;

  const produto = valor as Record<string, unknown>;
  return (
    typeof produto.id === "number" &&
    Number.isFinite(produto.id) &&
    typeof produto.nome === "string" &&
    typeof produto.dosagem === "string" &&
    typeof produto.categoria === "string" &&
    typeof produto.exigeReceita === "boolean" &&
    typeof produto.disponivel === "boolean"
  );
}

function mesmoProduto(a: Produto, b: Produto): boolean {
  return a.id === b.id && a.nome === b.nome && a.dosagem === b.dosagem;
}

type ItemCarrinho = Produto & {
  quantidade: number;
};

const CATEGORIAS_PRINCIPAIS = [
  "Todos",
  "Dor e Febre",
  "Gripe e Resfriado",
  "Vitaminas e Suplementos",
  "Higiene Pessoal",
  "Cuidados com a Pele",
  "Mamãe e Bebê",
  "Primeiros Socorros",
];

const CATEGORIAS_ADICIONAIS = [
  "Alergia",
  "Digestão e Estômago",
  "Pressão e Coração",
  "Diabetes",
  "Saúde Bucal",
  "Cabelos",
  "Dermocosméticos",
  "Cuidados Íntimos",
  "Medição e Monitoramento",
];

export default function Home() {
  const [busca, setBusca] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [mostrarMaisCategorias, setMostrarMaisCategorias] = useState(false);
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [carrinhoCarregado, setCarrinhoCarregado] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [produtos, setProdutos] = useState<ProdutoApi[]>([]);
  const [carregandoProdutos, setCarregandoProdutos] = useState(true);
  const [erroProdutos, setErroProdutos] = useState<string | null>(null);

  // O catálogo remoto é independente do carrinho salvo.
  useEffect(() => {
    const controller = new AbortController();
    let ativo = true;
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    async function carregarProdutos() {
      try {
        const resposta = await fetch(URL_PRODUTOS, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!resposta.ok) throw new Error("Falha ao carregar o catálogo");

        const dados: unknown = await resposta.json();
        if (!Array.isArray(dados) || !dados.every(ehProdutoApi)) {
          throw new Error("Formato de catálogo inválido");
        }

        if (ativo) {
          setProdutos(dados.filter((produto) => produto.disponivel === true));
        }
      } catch {
        if (ativo) {
          setErroProdutos(
            "Não foi possível carregar os produtos agora. Tente atualizar a página em alguns instantes. Os itens do seu carrinho foram mantidos.",
          );
        }
      } finally {
        window.clearTimeout(timeout);
        if (ativo) setCarregandoProdutos(false);
      }
    }

    void carregarProdutos();

    return () => {
      ativo = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  // Carrega o carrinho salvo no navegador
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho-drogaria-luisa");

    if (carrinhoSalvo) {
      try {
        // Restaura o estado do navegador após a hidratação, antes de permitir a persistência.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCarrinho(JSON.parse(carrinhoSalvo));
      } catch {
        localStorage.removeItem("carrinho-drogaria-luisa");
      }
    }

    setCarrinhoCarregado(true);
  }, []);

  // Salva automaticamente sempre que o carrinho mudar
  useEffect(() => {
    if (!carrinhoCarregado) return;

    if (carrinho.length === 0) {
      localStorage.removeItem("carrinho-drogaria-luisa");
      return;
    }

    localStorage.setItem("carrinho-drogaria-luisa", JSON.stringify(carrinho));
  }, [carrinho, carrinhoCarregado]);

  const produtosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase().trim();

    return produtos.filter((produto) => {
      const correspondeCategoria =
        categoriaSelecionada === "Todos" ||
        produto.categoria.trim() === categoriaSelecionada.trim();
      const correspondeBusca =
        !termo ||
        produto.nome.toLowerCase().includes(termo) ||
        produto.dosagem.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo);

      return correspondeCategoria && correspondeBusca;
    });
  }, [busca, produtos, categoriaSelecionada]);

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

  function adicionarAoCarrinho(produto: Produto) {
    setCarrinho((carrinhoAtual) => {
      const produtoExistente = carrinhoAtual.find((item) =>
        mesmoProduto(item, produto),
      );

      if (produtoExistente) {
        return carrinhoAtual.map((item) =>
          mesmoProduto(item, produto)
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }

      return [...carrinhoAtual, { ...produto, quantidade: 1 }];
    });
  }

  function aumentarQuantidade(produto: Produto) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.map((item) =>
        mesmoProduto(item, produto)
          ? { ...item, quantidade: item.quantidade + 1 }
          : item,
      ),
    );
  }

  function diminuirQuantidade(produto: Produto) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual
        .map((item) =>
          mesmoProduto(item, produto)
            ? { ...item, quantidade: item.quantidade - 1 }
            : item,
        )
        .filter((item) => item.quantidade > 0),
    );
  }

  function removerProduto(produto: Produto) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.filter((item) => !mesmoProduto(item, produto)),
    );
  }

  function solicitarOrcamento() {
    if (carrinho.length === 0) return;

    const numeroWhatsApp = "5511973288576";

    const itens = carrinho
      .map(
        (item) =>
          `• ${item.quantidade}x ${item.nome} ${item.dosagem}${
            item.exigeReceita ? " — exige receita" : ""
          }`,
      )
      .join("\n");

    const possuiReceita = carrinho.some((item) => item.exigeReceita);

    const mensagem = `Olá! Gostaria de consultar a disponibilidade e solicitar um orçamento dos seguintes produtos:

${itens}

${
  possuiReceita
    ? "Estou ciente de que alguns itens podem exigir apresentação de receita médica.\n\n"
    : ""
}Aguardo o retorno. Obrigado!`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      mensagem,
    )}`;

    window.open(url, "_blank");
    setMostrarConfirmacao(true);
  }

  function limparCarrinho() {
    localStorage.removeItem("carrinho-drogaria-luisa");
    setCarrinho([]);
    setMostrarConfirmacao(false);
  }

  const quantidadeTotal = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0,
  );

  function selecionarCategoria(categoria: string) {
    setBusca("");
    setCategoriaSelecionada(categoria);
    setMostrarMaisCategorias(
      categoria === "Todos" || CATEGORIAS_ADICIONAIS.includes(categoria),
    );
    document.getElementById("catalogo")?.scrollIntoView();
  }
  return (
    <>
      <Header quantidade={quantidadeTotal} />
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
              <aside
                id="orcamento"
                aria-label="Meu orçamento"
                className="ui-card h-fit lg:sticky lg:top-28"
              >
                <h2 className="text-xl font-bold text-foreground">
                  Meu orçamento
                </h2>

                <p className="mt-1 text-sm text-muted">
                  {quantidadeTotal} item(ns) selecionado(s)
                </p>

                {carrinho.length === 0 ? (
                  <div className="py-10 text-center">
                    <p className="text-sm text-muted">
                      Nenhum produto adicionado.
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    {carrinho.map((item) => (
                      <div
                        key={JSON.stringify([item.id, item.nome, item.dosagem])}
                        className="border-b border-border pb-4"
                      >
                        <div className="flex justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {item.nome}
                            </h3>

                            <p className="text-sm text-muted">{item.dosagem}</p>
                          </div>

                          <button
                            type="button"
                            onClick={() => removerProduto(item)}
                            className="text-xs font-medium text-danger hover:text-danger"
                          >
                            Remover
                          </button>
                        </div>

                        <div className="mt-3 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => diminuirQuantidade(item)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border font-bold text-foreground"
                          >
                            −
                          </button>

                          <span className="min-w-6 text-center font-semibold text-foreground">
                            {item.quantidade}
                          </span>

                          <button
                            type="button"
                            onClick={() => aumentarQuantidade(item)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border font-bold text-foreground"
                          >
                            +
                          </button>
                        </div>

                        {item.exigeReceita && (
                          <p className="mt-3 text-xs font-medium text-warning">
                            Este produto exige receita médica.
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {carrinho.length > 0 && (
                  <Button
                    type="button"
                    onClick={solicitarOrcamento}
                    variant="whatsapp"
                    className="mt-6 w-full"
                  >
                    Solicitar orçamento pelo WhatsApp
                  </Button>
                )}

                {mostrarConfirmacao && (
                  <section
                    aria-labelledby="confirmacao-orcamento"
                    aria-live="polite"
                    className="mt-6 rounded-2xl border border-brand-soft bg-brand-soft p-4"
                  >
                    <h3
                      id="confirmacao-orcamento"
                      className="font-semibold text-foreground"
                    >
                      Já enviou sua solicitação?
                    </h3>

                    <p className="mt-2 text-sm text-muted">
                      Se o orçamento já foi enviado pelo WhatsApp, você pode
                      limpar o carrinho.
                    </p>

                    <div className="mt-4 flex flex-col gap-3">
                      <Button
                        type="button"
                        onClick={limparCarrinho}
                        variant="primary"
                        className="w-full"
                      >
                        Sim, limpar carrinho
                      </Button>

                      <Button
                        type="button"
                        onClick={() => setMostrarConfirmacao(false)}
                        variant="secondary"
                        className="w-full"
                      >
                        Continuar comprando
                      </Button>
                    </div>
                  </section>
                )}
              </aside>
            </div>
          </Container>
        </section>
        <FinalCta />
      </main>
    </>
  );
}
