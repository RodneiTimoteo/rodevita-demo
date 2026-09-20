import type { Metadata } from "next";
import Link from "next/link";
import { Container, SectionTitle, buttonStyles } from "@/components/ui";
import { InstitutionalHero } from "@/components/institutional/shared";
import { OfferSelections } from "@/components/institutional/offer-selections";
export const metadata: Metadata = {
  title: "Ofertas | RodeVita Drogaria & Bem-estar",
  description:
    "Explore seleções demonstrativas da RodeVita para higiene, cuidados e bem-estar. Campanhas fictícias, sem ofertas comerciais reais.",
};
export default function OffersPage() {
  return (
    <main id="catalogo" tabIndex={-1} className="flex-1">
      <InstitutionalHero
        eyebrow="Ofertas RodeVita"
        title="Cuidados que combinam com o seu dia."
        description="Explore seleções demonstrativas de produtos para saúde, higiene e bem-estar."
        note="Conteúdo demonstrativo. Ofertas e valores apresentados são fictícios."
      />
      <Container className="py-12">
        <section className="promotion">
          <div>
            <p className="eyebrow">Campanha conceitual</p>
            <SectionTitle className="text-3xl text-surface md:text-4xl">
              Semana da Saúde
            </SectionTitle>
            <p className="mt-4 text-lg">Cuidados para toda a família</p>
          </div>
          <Link href="/produtos" className={buttonStyles("secondary")}>
            Explorar produtos ↗
          </Link>
        </section>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section className="editorial bg-health-soft">
            <span className="editorial-symbol text-health" aria-hidden="true">
              ♡
            </span>
            <p className="eyebrow">Seleção demonstrativa</p>
            <SectionTitle className="relative text-2xl">
              Especial Mamãe e Bebê
            </SectionTitle>
            <p className="relative mt-4 text-muted">
              Mais carinho em cada fase
            </p>
            <Link
              href="/produtos?categoria=Mam%C3%A3e%20e%20Beb%C3%AA"
              className={buttonStyles("secondary", "relative mt-7")}
            >
              Conhecer seleção ↗
            </Link>
          </section>
          <section className="editorial bg-brand-soft">
            <span className="editorial-symbol text-brand" aria-hidden="true">
              ✳
            </span>
            <p className="eyebrow">Seleção demonstrativa</p>
            <SectionTitle className="relative text-2xl">
              Bem-estar e beleza
            </SectionTitle>
            <p className="relative mt-4 text-muted">
              Cuidados que fazem parte da sua rotina
            </p>
            <Link
              href="/produtos?categoria=Cuidados%20com%20a%20Pele"
              className={buttonStyles("secondary", "relative mt-7")}
            >
              Explorar cuidados ↗
            </Link>
          </section>
        </div>
        <section className="py-16" aria-labelledby="offer-selections">
          <p className="eyebrow">Inspire sua lista</p>
          <SectionTitle id="offer-selections" className="mb-10 text-3xl">
            Seleções em destaque
          </SectionTitle>
          <OfferSelections />
        </section>
        <div className="border-t border-border pt-8 text-center">
          <Link href="/produtos" className={buttonStyles()}>
            Ver catálogo completo ↗
          </Link>
        </div>
      </Container>
    </main>
  );
}
