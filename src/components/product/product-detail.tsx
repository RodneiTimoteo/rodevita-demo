"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import type { Produto } from "@/data/produtos";
import {
  Badge,
  Button,
  Container,
  SectionTitle,
  buttonStyles,
} from "@/components/ui";
import { useCatalog } from "@/components/catalog/catalog-provider";
import { QuotePanel } from "@/components/catalog/quote-panel";
import { ProductCard } from "@/components/home/product-card";
import { whatsappUrl } from "@/utils/whatsapp";

export function ProductLoadError() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <main id="catalogo" className="flex-1">
      <Container className="py-16">
        <section role="alert" className="ui-card text-center">
          <SectionTitle as="h1" className="text-3xl">
            Não foi possível carregar o produto.
          </SectionTitle>
          <p className="mt-4 text-muted">
            Tente novamente em alguns instantes.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              disabled={pending}
              onClick={() => startTransition(() => router.refresh())}
            >
              {pending ? "Tentando novamente…" : "Tentar novamente"}
            </Button>
            <Link href="/produtos" className={buttonStyles("secondary")}>
              Ver catálogo
            </Link>
          </div>
        </section>
        <div className="mx-auto mt-10 max-w-3xl">
          <QuotePanel />
        </div>
      </Container>
    </main>
  );
}
export function ProductDetail({
  produto,
  related,
}: {
  produto: Produto;
  related: Produto[];
}) {
  const { carrinho, adicionarAoCarrinho } = useCatalog();
  const [feedback, setFeedback] = useState<{
    nome: string;
    time: number;
  } | null>(null);
  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(null), 2800);
    return () => window.clearTimeout(timer);
  }, [feedback]);
  function add(item: Produto) {
    adicionarAoCarrinho(item);
    setFeedback({ nome: item.nome, time: Date.now() });
  }
  const quantidade = (item: Produto) =>
    carrinho.find(
      (p) =>
        p.id === item.id && p.nome === item.nome && p.dosagem === item.dosagem,
    )?.quantidade ?? 0;
  const categoryHref = `/produtos?categoria=${encodeURIComponent(produto.categoria)}`;
  const contact = whatsappUrl(
    `Olá! Gostaria de consultar a disponibilidade de ${produto.nome} ${produto.dosagem}.${produto.exigeReceita ? " Estou ciente de que este produto exige apresentação de receita médica." : ""}`,
  );
  return (
    <main id="catalogo" tabIndex={-1} className="flex-1">
      <Container className="py-8 md:py-12">
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex flex-wrap items-center gap-2 text-xs leading-relaxed text-muted"
        >
          <Link href="/" className="hover:text-health">
            Início
          </Link>
          <span aria-hidden="true">›</span>
          <Link href="/produtos" className="hover:text-health">
            Produtos
          </Link>
          <span aria-hidden="true">›</span>
          <Link href={categoryHref} className="hover:text-health">
            {produto.categoria}
          </Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page" className="text-brand">
            {produto.nome} {produto.dosagem}
          </span>
        </nav>
        <section
          className="grid items-center gap-8 md:grid-cols-2 lg:gap-16"
          aria-label="Detalhes do produto"
        >
          <div
            className="product-visual"
            aria-label="Embalagem conceitual ilustrativa, não representa o produto real"
            role="img"
          >
            <div className="product-visual-shape" />
            <div className="product-mockup">
              <span className="text-lg font-bold text-brand">RodeVita</span>
              <span className="text-xs text-health">Drogaria & Bem-estar</span>
              <div className="product-monogram">
                {produto.nome
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")}
              </div>
              <strong className="break-words text-xl text-brand">
                {produto.nome}
              </strong>
              <span className="mt-2 text-sm text-muted">{produto.dosagem}</span>
              <span className="mt-auto pt-5 text-xs text-health">
                Cuidado para todos os dias.
              </span>
            </div>
            <p className="relative mt-7 text-center text-[10px] uppercase tracking-widest text-muted">
              Embalagem conceitual · Imagem ilustrativa
            </p>
          </div>
          <div className="min-w-0">
            <Link
              href={categoryHref}
              className="eyebrow inline-block hover:underline"
            >
              {produto.categoria}
            </Link>
            <SectionTitle as="h1" className="break-words text-3xl md:text-4xl">
              {produto.nome}
            </SectionTitle>
            <p className="mt-3 text-xl text-muted">{produto.dosagem}</p>
            <div className="mt-6">
              <Badge variant={produto.exigeReceita ? "prescription" : "free"} />
            </div>
            <p className="mt-6 max-w-lg leading-relaxed text-muted">
              Consulte disponibilidade e condições de atendimento diretamente
              com a farmácia.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Button onClick={() => add(produto)}>
                Adicionar ao orçamento
              </Button>
              <a
                href={contact}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles("secondary")}
              >
                Consultar pelo WhatsApp
              </a>
            </div>
            <p className="mt-4 min-h-5 text-sm text-health" aria-live="polite">
              {quantidade(produto) > 0
                ? `${quantidade(produto)} na sua lista de orçamento`
                : ""}
            </p>
            <Link
              href="#orcamento"
              className="mt-2 inline-block text-sm font-semibold text-health underline underline-offset-4"
            >
              Ver meu orçamento
            </Link>
          </div>
        </section>
        <section className="ui-card mt-12" aria-labelledby="product-info">
          <SectionTitle id="product-info" className="text-2xl">
            Informações do produto
          </SectionTitle>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Nome", produto.nome],
              ["Dosagem", produto.dosagem],
              ["Categoria", produto.categoria],
              [
                "Necessidade de receita",
                produto.exigeReceita ? "Exige receita" : "Venda livre",
              ],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="mt-2 font-medium text-brand">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
        {produto.exigeReceita && (
          <section className="mt-6 rounded-2xl border border-gold bg-warning-soft p-6 text-warning">
            <h2 className="font-semibold">
              Este produto exige apresentação de receita médica.
            </h2>
            <p className="mt-2 text-sm leading-relaxed">
              A dispensação está sujeita à apresentação e validação da receita
              conforme a legislação aplicável.
            </p>
          </section>
        )}
        <section className="py-14">
          <p className="eyebrow">Simples do começo ao fim</p>
          <SectionTitle className="text-2xl">Como solicitar</SectionTitle>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              "Adicione ao orçamento",
              "Continue escolhendo seus produtos",
              "Envie sua lista pelo WhatsApp",
            ].map((text, i) => (
              <div className="step" key={text}>
                <span className="step-number">0{i + 1}</span>
                <h3 className="mt-4 font-semibold text-brand">{text}</h3>
              </div>
            ))}
          </div>
        </section>
        {related.length > 0 && (
          <section aria-labelledby="related-title" className="py-6">
            <div className="section-heading">
              <SectionTitle id="related-title" className="text-2xl">
                Produtos relacionados
              </SectionTitle>
              <Link
                href={categoryHref}
                className="text-sm font-semibold text-health"
              >
                Ver categoria ↗
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {related.map((item) => (
                <ProductCard
                  key={item.id}
                  produto={item}
                  onAdd={add}
                  quantidade={quantidade(item)}
                />
              ))}
            </div>
          </section>
        )}
        <section className="final-cta my-12">
          <SectionTitle className="text-3xl">Precisa de ajuda?</SectionTitle>
          <p className="mt-4 text-muted">
            Fale com nossa equipe pelo WhatsApp para consultar disponibilidade.
          </p>
          <a
            href={contact}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles("whatsapp", "mt-6")}
          >
            Falar pelo WhatsApp
          </a>
        </section>
        <div className="mx-auto max-w-3xl">
          <QuotePanel />
        </div>
        <Link
          href="/produtos"
          className="mt-10 inline-block font-semibold text-health"
        >
          ← Voltar para produtos
        </Link>
        <p className="mt-6 text-xs leading-relaxed text-muted">
          Catálogo demonstrativo. Produtos e informações apresentados neste
          projeto são fictícios e não representam disponibilidade comercial.
        </p>
        <div
          role="status"
          aria-live="polite"
          className={feedback ? "catalog-feedback" : "sr-only"}
        >
          {feedback && (
            <>
              <strong className="block">Adicionado ao orçamento</strong>
              <span className="text-xs">{feedback.nome}</span>
            </>
          )}
        </div>
      </Container>
    </main>
  );
}
