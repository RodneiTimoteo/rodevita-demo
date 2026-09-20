import type { Metadata } from "next";
import Link from "next/link";
import { Card, Container, SectionTitle, buttonStyles } from "@/components/ui";
import {
  InstitutionalHero,
  InstitutionalIcon,
} from "@/components/institutional/shared";
export const metadata: Metadata = {
  title: "Sobre a RodeVita | Drogaria & Bem-estar",
  description:
    "Conheça a RodeVita, marca fictícia e projeto conceitual da RODE Soluções Inteligentes para demonstrar soluções digitais para farmácias.",
};
const pillars = [
  {
    title: "Cuidado",
    text: "Uma experiência pensada para ser simples, acolhedora e humana.",
    icon: "heart",
  },
  {
    title: "Praticidade",
    text: "Informações organizadas e acesso rápido ao que o cliente procura.",
    icon: "search",
  },
  {
    title: "Tecnologia",
    text: "Ferramentas digitais que aproximam o atendimento do dia a dia.",
    icon: "digital",
  },
] as const;
export default function AboutPage() {
  return (
    <main id="catalogo" tabIndex={-1} className="flex-1">
      <InstitutionalHero
        eyebrow="Sobre a RodeVita"
        title="Cuidado para todos os dias."
        description="A RodeVita é uma marca fictícia criada para demonstrar como tecnologia, organização e proximidade podem transformar a experiência digital de uma drogaria."
      />
      <Container className="py-14">
        <section className="grid gap-10 lg:grid-cols-[.8fr_1.5fr]">
          <div>
            <p className="eyebrow">O que nos inspira</p>
            <SectionTitle className="text-3xl">Nossa essência</SectionTitle>
            <p className="mt-5 leading-relaxed text-muted">
              Um conceito de marca que coloca a experiência das pessoas no
              centro, do primeiro acesso à organização de uma lista de produtos.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <Card key={pillar.title}>
                <span className="text-health">
                  <InstitutionalIcon kind={pillar.icon} />
                </span>
                <h3 className="mt-6 text-lg font-bold text-brand">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {pillar.text}
                </p>
              </Card>
            ))}
          </div>
        </section>
        <section className="my-16 rounded-3xl bg-brand-soft p-7 md:p-12">
          <p className="eyebrow">Do primeiro clique à conversa</p>
          <SectionTitle className="text-3xl">
            Uma experiência conectada
          </SectionTitle>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            Navegue pelo catálogo, encontre o que procura e organize os itens em
            um orçamento. A lista acompanha você até o WhatsApp.
          </p>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Catálogo digital", "Explore as categorias."],
              ["Busca", "Encontre nome ou dosagem."],
              ["Orçamento", "Reúna sua lista de produtos."],
              ["WhatsApp", "Leve a lista para a conversa."],
            ].map(([title, text], index) => (
              <li className="rounded-2xl bg-surface p-5" key={title}>
                <div className="flex justify-between text-sm font-semibold text-health">
                  <span>0{index + 1}</span>
                  {index < 3 && <span aria-hidden="true">→</span>}
                </div>
                <h3 className="mt-4 font-bold text-brand">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {text}
                </p>
              </li>
            ))}
          </ol>
          <Link href="/produtos" className={buttonStyles("secondary", "mt-8")}>
            Explorar o catálogo ↗
          </Link>
        </section>
        <section className="institutional-project">
          <div>
            <p className="eyebrow">Conceito, design e tecnologia</p>
            <SectionTitle className="text-3xl">
              Projeto demonstrativo
            </SectionTitle>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted">
              A RodeVita foi criada como projeto conceitual da RODE Soluções
              Inteligentes para demonstrar soluções digitais para farmácias. A
              marca, os produtos e os serviços apresentados são fictícios. Este
              site não realiza vendas nem presta atendimento farmacêutico real.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-8">
            <p className="text-xs uppercase tracking-widest text-muted">
              Desenvolvido por
            </p>
            <h3 className="mt-4 text-xl font-bold text-brand">
              RODE Soluções Inteligentes
            </h3>
            <a
              href="https://rodesolucoes.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles("primary", "mt-6")}
              aria-label="Conhecer a RODE (abre em nova aba)"
            >
              Conhecer a RODE ↗
            </a>
          </div>
        </section>
      </Container>
    </main>
  );
}
