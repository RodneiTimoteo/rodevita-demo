"use client";

import { useCatalog } from "@/components/catalog/catalog-provider";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/brand/rodevita-logo-horizontal.png";
import { Container, buttonStyles } from "@/components/ui";

function BrandLogo() {
  return (
    <Link
      href="/"
      aria-label="RodeVita — Drogaria & Bem-estar, início"
      className="brand-logo"
    >
      <Image
        src={logo}
        alt="RodeVita — Drogaria & Bem-estar. Cuidado para todos os dias."
        sizes="280px"
        loading="eager"
      />
    </Link>
  );
}
const navigation = [
  ["Início", "/#inicio"],
  ["Produtos", "/produtos"],
  ["Categorias", "/#categorias"],
  ["Ofertas", "/ofertas"],
  ["Serviços", "/servicos"],
  ["Sobre", "/sobre"],
  ["Contato", "/contato"],
];
export function Header() {
  const { quantidadeTotal: quantidade } = useCatalog();
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();
  const cartHref = pathname === "/produtos" ? "#orcamento" : "/produtos#orcamento";
  return (
    <header className="site-header">
      <Container className="header-inner">
        <BrandLogo />
        <nav aria-label="Navegação principal" className="desktop-nav">
          {navigation.map(([label, id]) => (
            <Link key={id} href={id}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            className={buttonStyles("secondary", "cart-link")}
            href={cartHref}
            aria-label={`Meu orçamento: ${quantidade} ${
              quantidade === 1 ? "item" : "itens"
            }`}
          >
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M3 3h2l3 13h11l3-9H6M9 20h.01M18 20h.01" />
            </svg>
            <span aria-live="polite">{quantidade}</span>
          </Link>
          <button
            className="menu-toggle"
            aria-expanded={aberto}
            aria-controls="mobile-nav"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setAberto(!aberto)}
          >
            {aberto ? "✕" : "☰"}
          </button>
        </div>
        <nav
          id="mobile-nav"
          aria-label="Navegação mobile"
          className="mobile-nav"
          hidden={!aberto}
        >
          {navigation.map(([label, id]) => (
            <Link key={id} href={id} onClick={() => setAberto(false)}>
              {label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="flex flex-wrap items-center justify-between gap-8 py-10">
        <BrandLogo />
        <div className="max-w-sm text-sm text-muted">
          <p className="font-heading font-semibold text-brand">
            Cuidado para todos os dias.
          </p>
          <p className="mt-2">
            Explore o catálogo e solicite seu orçamento pelo WhatsApp na sua
            lista de produtos.
          </p>
          <Link
            href="/produtos"
            className="mt-4 inline-block font-semibold text-health"
          >
            Voltar ao catálogo ↑
          </Link>
        </div>
      </Container>
      <Container className="border-t border-border py-8">
        <nav
          aria-label="Navegação do rodapé"
          className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-brand"
        >
          {navigation.slice(1).map(([label, id]) => (
            <Link href={id} key={id}>
              {label}
            </Link>
          ))}
        </nav>
        <p className="mt-6 text-sm text-muted">
          Endereço fictício: Rua do Bem-estar, 123 · Cidade Exemplo, SP
          <br />
          Contato fictício: contato@rodevita.example
        </p>
        <p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted">
          Projeto demonstrativo. Informações, produtos, preços, endereço e
          contatos apresentados são fictícios. Este site não realiza vendas.
        </p>
        <p className="mt-6 text-xs font-medium text-brand">
          Desenvolvido por RODE Soluções Inteligentes
        </p>
      </Container>
    </footer>
  );
}
