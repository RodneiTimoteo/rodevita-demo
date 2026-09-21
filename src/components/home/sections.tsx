import Link from "next/link";
import { whatsappUrl } from "@/utils/whatsapp";
import {
  Button,
  Card,
  Container,
  SearchField,
  SectionTitle,
  buttonStyles,
} from "@/components/ui";
import type { Produto } from "@/data/produtos";
import { ProductCard } from "./product-card";

const whatsapp = whatsappUrl();
const categories = [
  "Dor e Febre",
  "Gripe e Resfriado",
  "Vitaminas e Suplementos",
  "Higiene Pessoal",
  "Cuidados com a Pele",
  "Mamãe e Bebê",
  "Primeiros Socorros",
  "Alergia",
];

const categoryPaths: Record<string, string> = {
  "Dor e Febre":
    "M9 14.5V5a3 3 0 0 1 6 0v9.5a5 5 0 1 1-6 0ZM12 8v9m0 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M17 6h2m-2 4h2",
  "Gripe e Resfriado":
    "M3 12h18v9H3zM3 12l3-4h3m6 0h3l3 4M8 12l1-8 4-2 3 4-2 6M9 16h6",
  "Vitaminas e Suplementos":
    "M8 3a5 5 0 0 1 7 7l-5 5a5 5 0 0 1-7-7l5-5ZM5.5 5.5l7 7M18 14v7m-3.5-3.5h7",
  "Higiene Pessoal":
    "M8 9h8a2 2 0 0 1 2 2v9H6v-9a2 2 0 0 1 2-2ZM12 9V4M9 4h8v2M9 14h6m-6 3h6",
  "Cuidados com a Pele":
    "M7 3h10l-1 14H8L7 3ZM8 17h8v4H8zM7.5 6h9M12 8c-1 2-2 3-2 4a2 2 0 0 0 4 0c0-1-1-2-2-4Z",
  "Mamãe e Bebê":
    "M4 10a8 8 0 0 1 16 0c3 0 3 5 0 5a8 8 0 0 1-16 0c-3 0-3-5 0-5ZM12 4c4 0 3 4 1 4M8 12h.01M16 12h.01M9 16q3 3 6 0",
  "Primeiros Socorros":
    "M8 7V4h8v3M4 7h16a1 1 0 0 1 1 1v12H3V8a1 1 0 0 1 1-1ZM12 10v7m-3.5-3.5h7",
  Alergia:
    "M12 9c-5-7 5-7 0 0Zm3 3c7-5 7 5 0 0Zm-3 3c5 7-5 7 0 0Zm-3-3c-7 5-7-5 0 0Zm3-3a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM18 3h.01M21 6h.01",
};

const iconPaths = [
  "M12 3v18M3 12h18",
  "M8 3v6l-4 8a3 3 0 0 0 3 4h10a3 3 0 0 0 3-4l-4-8V3M7 3h10M7 15h10",
  "M12 21V10M12 14C3 14 3 6 3 6s9-1 9 8Zm0-4C12 3 21 3 21 3s0 8-9 7Z",
  "M12 3C9 8 5 11 5 15a7 7 0 0 0 14 0c0-4-4-7-7-12Z",
  "M12 21s-9-5-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 7-9 12-9 12Z",
  "M5 8a7 7 0 0 1 14 0M4 8h16v6a8 8 0 0 1-16 0V8ZM8 13h.01M16 13h.01M9 17q3 2 6 0",
];

function LineIcon({ path }: { path: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

function Icon({ index = 0 }: { index?: number }) {
  return <LineIcon path={iconPaths[index % iconPaths.length]} />;
}

function HeroActions() {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Link className={buttonStyles()} href="/produtos">
        Explorar produtos <span aria-hidden="true">↗</span>
      </Link>
      <a
        className={buttonStyles("secondary")}
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
      >
        Falar pelo WhatsApp
      </a>
    </div>
  );
}

function ProductComposition() {
  return (
    <div className="product-composition" aria-hidden="true">
      <div className="composition-orbit" />
      <div className="concept-box">
        <span className="text-health">
          <Icon index={2} />
        </span>
        <strong>RodeVita</strong>
        <span>CUIDADO DIÁRIO</span>
        <div className="concept-stripe" />
        <small>
          Bem-estar
          <br />
          em cada detalhe.
        </small>
      </div>
      <div className="concept-bottle">
        <div className="bottle-cap" />
        <Icon index={2} />
        <strong>RodeVita</strong>
        <span>ESSENCIAL</span>
        <small>
          Cuidado para
          <br />
          todos os dias.
        </small>
      </div>
      <div className="composition-note">
        <span className="text-health">
          <Icon index={4} />
        </span>
        <div>
          <strong>O cuidado começa aqui.</strong>
          <small>Mais perto de você, todos os dias.</small>
        </div>
      </div>
      <span className="composition-caption">
        COMPOSIÇÃO CONCEITUAL · RODEVITA
      </span>
    </div>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="hero-section">
      <Container className="grid items-center gap-8 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <p className="eyebrow">Saúde e bem-estar para toda a família</p>
          <SectionTitle as="h1" className="hero-title">
            Cuidado que está sempre{" "}
            <span className="text-health">perto de você.</span>
          </SectionTitle>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Encontre medicamentos, higiene, beleza e produtos para toda a
            família de forma simples, rápida e prática.
          </p>
          <HeroActions />
          <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3 border-t border-border pt-6 text-xs font-medium text-brand">
            {["Catálogo digital", "Atendimento próximo", "Orçamento pelo WhatsApp"].map(
              (text) => (
                <span key={text}>✓ {text}</span>
              ),
            )}
          </div>
        </div>
        <ProductComposition />
      </Container>
    </section>
  );
}

export function HomeSearch({
  busca,
  onSearch,
  onSubmit,
  sugestoes,
  carregando,
  erro,
}: {
  busca: string;
  onSearch: (value: string) => void;
  onSubmit: (value: string) => void;
  sugestoes: Produto[];
  carregando: boolean;
  erro: string | null;
}) {
  return (
    <section className="bg-surface" aria-labelledby="busca-titulo">
      <Container className="py-16 md:py-20">
        <div className="search-panel mx-auto max-w-4xl rounded-3xl bg-background shadow-sm">
          <p className="eyebrow">Seu cuidado a poucos cliques de distância</p>
          <SectionTitle id="busca-titulo" className="text-2xl md:text-3xl">
            O que você está procurando?
          </SectionTitle>
          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit(busca);
            }}
          >
            <SearchField
              aria-label="Busca principal por produto, dosagem ou categoria"
              placeholder="Digite o nome do produto, dosagem ou categoria..."
              value={busca}
              onChange={(event) => onSearch(event.target.value)}
            />
            <Button type="submit" className="shrink-0">
              Buscar produtos ↗
            </Button>
          </form>
          {busca.trim() && (
            <div className="mt-4 flex flex-wrap gap-2" aria-label="Sugestões de produtos">
              {sugestoes.map((produto) => (
                <button
                  key={`${produto.id}-${produto.nome}-${produto.dosagem}`}
                  type="button"
                  className="rounded-lg bg-brand-soft px-3 py-2 text-left text-sm text-brand hover:text-health"
                  onClick={() => onSubmit(produto.nome)}
                >
                  {produto.nome} · {produto.dosagem}
                </button>
              ))}
              <p role="status" className="w-full text-sm text-muted">
                {carregando
                  ? "Carregando sugestões..."
                  : erro
                    ? "Sugestões indisponíveis no momento."
                    : sugestoes.length === 0
                      ? "Nenhuma sugestão encontrada. Consulte o catálogo para ver todas as opções."
                      : "Selecione uma sugestão ou continue sua busca no catálogo."}
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export function CategorySection({
  produtos,
  carregando,
  erro,
  onSelect,
}: {
  produtos: Produto[];
  carregando: boolean;
  erro: string | null;
  onSelect: (value: string) => void;
}) {
  return (
    <section id="categorias" aria-labelledby="categorias-titulo">
      <Container className="py-16 md:py-20">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Para cada momento, um cuidado</p>
            <SectionTitle id="categorias-titulo" className="text-3xl">
              Encontre por categoria
            </SectionTitle>
            <p className="mt-3 text-muted">
              Explore produtos organizados para facilitar sua busca.
            </p>
          </div>
          <Link className={buttonStyles("secondary")} href="/produtos">
            Ver todas as categorias ↗
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => {
            const count = produtos.filter(
              (produto) => produto.categoria.trim() === category,
            ).length;
            return (
              <button
                key={category}
                type="button"
                className="category-card"
                onClick={() => onSelect(category)}
                aria-label={`Explorar ${category}${!carregando && !erro ? `, ${count} produtos` : ""}`}
              >
                <span className="category-icon">
                  <LineIcon path={categoryPaths[category]} />
                </span>
                <span className="text-sm font-semibold">{category}</span>
                <span className="mt-auto pt-3 text-xs text-muted">
                  {carregando
                    ? "Carregando..."
                    : erro
                      ? "Consultar catálogo"
                      : `${count} ${count === 1 ? "produto" : "produtos"}`}
                </span>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function FeaturedProducts({
  produtos,
  carregando,
  erro,
  onAdd,
  getQuantity,
}: {
  produtos: Produto[];
  carregando: boolean;
  erro: string | null;
  onAdd: (produto: Produto) => void;
  getQuantity: (produto: Produto) => number;
}) {
  return (
    <section className="bg-surface" aria-labelledby="destaques-titulo">
      <Container className="py-16 md:py-20">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Uma seleção para o seu dia</p>
            <SectionTitle id="destaques-titulo" className="text-3xl">
              Produtos em destaque
            </SectionTitle>
            <p className="mt-3 text-muted">
              Algumas opções do nosso catálogo demonstrativo.
            </p>
          </div>
        </div>
        {carregando ? (
          <p role="status" className="text-sm text-muted">
            Carregando destaques...
          </p>
        ) : erro ? (
          <p role="alert" className="rounded-2xl bg-warning-soft p-6 text-warning">
            Os destaques estão indisponíveis no momento. O catálogo pode ser
            consultado diretamente.
          </p>
        ) : produtos.length === 0 ? (
          <p className="text-muted">Nenhum destaque disponível no momento.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {produtos.map((produto) => (
              <ProductCard
                key={`${produto.id}-${produto.nome}-${produto.dosagem}`}
                produto={produto}
                onAdd={onAdd}
                quantidade={getQuantity(produto)}
              />
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link className={buttonStyles()} href="/produtos">
            Ver catálogo completo ↗
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function EditorialSection() {
  return (
    <section className="bg-health-soft" aria-labelledby="editorial-titulo">
      <Container className="grid gap-6 py-16 md:py-20 lg:grid-cols-2">
        <article className="editorial bg-surface">
          <span className="editorial-symbol text-health" aria-hidden="true">
            ♡
          </span>
          <p className="eyebrow">Mamãe & bebê</p>
          <SectionTitle id="editorial-titulo" className="relative max-w-sm text-3xl">
            Todo cuidado para os pequenos
          </SectionTitle>
          <p className="relative mt-4 max-w-sm leading-relaxed text-muted">
            Produtos para higiene, conforto e cuidado em cada fase.
          </p>
          <Link
            className={buttonStyles("primary", "relative mt-8")}
            href="/produtos?categoria=Mam%C3%A3e%20e%20Beb%C3%AA"
          >
            Explorar Mamãe e Bebê ↗
          </Link>
        </article>
        <article className="editorial bg-brand-soft">
          <span className="editorial-symbol text-brand" aria-hidden="true">
            ✳
          </span>
          <p className="eyebrow">Cuidados e bem-estar</p>
          <SectionTitle className="relative max-w-sm text-3xl">
            Bem-estar também é cuidar de você.
          </SectionTitle>
          <p className="relative mt-4 max-w-sm leading-relaxed text-muted">
            Uma seleção para transformar pequenos hábitos em momentos de
            cuidado.
          </p>
          <Link
            className={buttonStyles("secondary", "relative mt-8")}
            href="/produtos?categoria=Cuidados%20com%20a%20Pele"
          >
            Explorar cuidados ↗
          </Link>
        </article>
      </Container>
    </section>
  );
}

export function ServicesSummary() {
  const services = [
    ["Aferição de pressão", "Consulte informações e disponibilidade."],
    ["Orientação farmacêutica", "Um canal próximo para esclarecer dúvidas."],
    ["Entrega local", "Conheça o fluxo demonstrativo de entrega."],
    ["Atendimento pelo WhatsApp", "Leve sua lista direto para a conversa."],
  ];
  return (
    <section id="servicos" aria-labelledby="servicos-titulo">
      <Container className="py-16 md:py-20">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Acolher também é cuidar</p>
            <SectionTitle id="servicos-titulo" className="text-3xl">
              Serviços perto de você
            </SectionTitle>
            <p className="mt-3 max-w-2xl text-muted">
              Uma visão resumida dos serviços demonstrativos da RodeVita.
            </p>
          </div>
          <Link className={buttonStyles("secondary")} href="/servicos">
            Conhecer todos os serviços ↗
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(([title, description], index) => (
            <Card key={title} className="h-full">
              <span className="category-icon">
                <Icon index={index} />
              </span>
              <h3 className="mt-5 font-semibold text-brand">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {description}
              </p>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted">
          Serviços fictícios apresentados exclusivamente para demonstração.
        </p>
      </Container>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    ["Encontre", "Pesquise o produto que precisa."],
    ["Adicione", "Monte sua lista de orçamento."],
    ["Solicite", "Envie sua lista pelo WhatsApp."],
  ];
  return (
    <section className="home-steps bg-brand text-surface" aria-labelledby="como-funciona-titulo">
      <Container className="py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold">Como funciona</p>
          <SectionTitle id="como-funciona-titulo" className="text-3xl text-surface md:text-4xl">
            Simples do começo ao fim
          </SectionTitle>
          <p className="mt-4 text-surface/75">
            Do primeiro clique à conversa, a RodeVita organiza sua jornada em
            três etapas claras.
          </p>
        </div>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map(([title, text], index) => (
            <li className="rounded-2xl bg-surface/8 p-7" key={title}>
              <span className="font-heading text-3xl text-gold">0{index + 1}</span>
              <h3 className="mt-5 text-xl font-bold text-surface">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-surface/75">{text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

export function Differentials() {
  const benefits = [
    "Catálogo digital",
    "Atendimento próximo",
    "Facilidade pelo WhatsApp",
    "Organização",
    "Produtos para toda a família",
    "Experiência simples",
  ];
  return (
    <section id="sobre" className="bg-surface" aria-labelledby="diferenciais-titulo">
      <Container className="grid gap-12 py-16 md:py-20 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="eyebrow">Nossa essência</p>
          <SectionTitle id="diferenciais-titulo" className="max-w-sm text-3xl">
            Cuidado em cada detalhe
          </SectionTitle>
          <p className="mt-5 max-w-sm leading-relaxed text-muted">
            Uma experiência pensada para aproximar você do que precisa com
            clareza, acolhimento e praticidade.
          </p>
        </div>
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          {benefits.map((benefit, index) => (
            <div className="flex items-center gap-4" key={benefit}>
              <span className="category-icon shrink-0">
                <Icon index={index} />
              </span>
              <h3 className="text-sm font-semibold text-brand">{benefit}</h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FinalCta() {
  return (
    <section id="contato" className="bg-health-soft">
      <Container className="py-16 md:py-20">
        <div className="final-cta bg-surface">
          <p className="eyebrow">RodeVita · Drogaria & Bem-estar</p>
          <SectionTitle className="mx-auto max-w-2xl text-3xl md:text-4xl">
            Encontre o que precisa de forma simples.
          </SectionTitle>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
            Pesquise produtos, monte sua lista e solicite atendimento pelo
            WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/produtos" className={buttonStyles()}>
              Explorar catálogo ↗
            </Link>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles("whatsapp")}
            >
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
