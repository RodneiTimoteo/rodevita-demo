import { whatsappUrl } from "@/utils/whatsapp";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  // Termômetro, caixa de lenços, cápsula, sabonete, creme, bebê, maleta e flor.
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
function CategoryIcon({ category }: { category: string }) {
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
      <path d={categoryPaths[category]} />
    </svg>
  );
}
function Icon({ index = 0 }: { index?: number }) {
  const paths = [
    "M12 3v18M3 12h18",
    "M8 3v6l-4 8a3 3 0 0 0 3 4h10a3 3 0 0 0 3-4l-4-8V3M7 3h10M7 15h10",
    "M12 21V10M12 14C3 14 3 6 3 6s9-1 9 8Zm0-4C12 3 21 3 21 3s0 8-9 7Z",
    "M12 3C9 8 5 11 5 15a7 7 0 0 0 14 0c0-4-4-7-7-12Z",
    "M12 21s-9-5-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 7-9 12-9 12Z",
    "M5 8a7 7 0 0 1 14 0M4 8h16v6a8 8 0 0 1-16 0V8ZM8 13h.01M16 13h.01M9 17q3 2 6 0",
  ];
  return (
    <svg
      aria-hidden="true"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[index % paths.length]} />
    </svg>
  );
}
function Actions() {
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
function ProductComposition({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`product-composition ${compact ? "composition-small" : ""}`}
      aria-hidden="true"
    >
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
export function LandingIntro({
  produtos,
  busca,
  onSearch,
  sugestoes,
  onSelect,
  carregando,
  erro,
  onAdd,
}: {
  produtos: Produto[];
  busca: string;
  onSearch: (value: string) => void;
  sugestoes: Produto[];
  onSelect: (value: string) => void;
  carregando: boolean;
  erro: string | null;
  onAdd: (produto: Produto) => void;
}) {
  const router = useRouter();
  return (
    <>
      <section className="hero-section">
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
            <Actions />
            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3 border-t border-border pt-6 text-xs font-medium text-brand">
              {[
                "Catálogo digital",
                "Atendimento próximo",
                "Orçamento pelo WhatsApp",
              ].map((text) => (
                <span key={text}>✓ {text}</span>
              ))}
            </div>
          </div>
          <ProductComposition />
        </Container>
      </section>
      <Container className="py-10">
        <section
          className="ui-card search-panel"
          aria-labelledby="busca-titulo"
        >
          <div>
            <p className="eyebrow">Seu cuidado a poucos cliques de distância</p>
            <SectionTitle id="busca-titulo" className="text-2xl">
              O que você está procurando?
            </SectionTitle>
          </div>
          <form
            className="mt-5 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              router.push(
                `/produtos?busca=${encodeURIComponent(busca.trim())}`,
              );
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
            <div
              className="mt-4 flex flex-wrap gap-2"
              aria-label="Sugestões de produtos"
            >
              {sugestoes.map((produto) => (
                <button
                  key={produto.id}
                  className="rounded-lg bg-brand-soft px-3 py-2 text-left text-sm text-brand"
                  onClick={() => {
                    router.push(
                      `/produtos?busca=${encodeURIComponent(produto.nome)}`,
                    );
                  }}
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
                      ? "Nenhum produto encontrado com os filtros atuais."
                      : "Selecione uma sugestão para consultar no catálogo."}
              </p>
            </div>
          )}
        </section>
      </Container>
      <Container className="py-12">
        <div id="categorias" className="section-heading">
          <div>
            <p className="eyebrow">Para cada momento, um cuidado</p>
            <SectionTitle className="text-3xl">
              Encontre por categoria
            </SectionTitle>
            <p className="mt-3 text-muted">
              Explore produtos organizados para facilitar sua busca.
            </p>
          </div>
          <button
            className="text-sm font-semibold text-health"
            onClick={() => onSelect("Todos")}
          >
            Ver todas as categorias ↗
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className="category-card"
              onClick={() => onSelect(category)}
            >
              <span className="category-icon">
                <CategoryIcon category={category} />
              </span>
              <span className="text-sm font-semibold">{category}</span>
              <span className="mt-auto pt-3 text-xs text-muted">
                {carregando
                  ? "Carregando..."
                  : erro
                    ? "Consultar catálogo"
                    : `${produtos.filter((p) => p.categoria.trim() === category).length} produtos`}
              </span>
            </button>
          ))}
        </div>
      </Container>
      <Container className="py-8">
        <section id="ofertas" className="promotion">
          <div>
            <p className="eyebrow text-gold">
              Uma semana para se cuidar · campanha fictícia
            </p>
            <SectionTitle className="text-3xl text-surface md:text-4xl">
              Semana da Saúde
            </SectionTitle>
            <p className="mt-3 text-xl">
              Cuidados para toda a família em um só lugar.
            </p>
            <p className="mt-3 text-sm text-surface/80">
              Explore nosso catálogo digital e monte sua lista em poucos
              minutos.
            </p>
          </div>
          <Link
            className={buttonStyles("secondary", "shrink-0")}
            href="/produtos"
          >
            Ver produtos ↗
          </Link>
        </section>
      </Container>
      <Container className="py-14">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Uma seleção para o seu dia</p>
            <SectionTitle className="text-3xl">
              Produtos em destaque
            </SectionTitle>
          </div>
          <Link className="text-sm font-semibold text-health" href="/produtos">
            Ver todos os produtos ↗
          </Link>
        </div>
        {carregando ? (
          <p role="status">Carregando destaques...</p>
        ) : erro ? (
          <p role="status">Os destaques estão indisponíveis no momento.</p>
        ) : produtos.length === 0 ? (
          <p>Nenhum destaque disponível no momento.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {produtos.slice(0, 6).map((produto) => (
              <ProductCard key={produto.id} produto={produto} onAdd={onAdd} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
export function EditorialSections({
  onSelect,
}: {
  onSelect: (value: string) => void;
}) {
  return (
    <Container className="grid gap-6 py-10 lg:grid-cols-2">
      <section className="editorial bg-health-soft">
        <span className="editorial-symbol text-health" aria-hidden="true">
          ♡
        </span>
        <p className="eyebrow">Mamãe & bebê</p>
        <SectionTitle className="relative max-w-sm text-3xl">
          Todo cuidado para os pequenos
        </SectionTitle>
        <p className="relative mt-4 max-w-xs leading-relaxed text-muted">
          Produtos para higiene, conforto e cuidado em cada fase.
        </p>
        <Button
          className="relative mt-8"
          onClick={() => onSelect("Mamãe e Bebê")}
        >
          Ver Mamãe e Bebê ↗
        </Button>
      </section>
      <section className="editorial bg-brand-soft">
        <span className="editorial-symbol text-brand" aria-hidden="true">
          ✳
        </span>
        <p className="eyebrow">Seu momento de cuidado</p>
        <SectionTitle className="relative max-w-sm text-3xl">
          Bem-estar também é cuidar de você.
        </SectionTitle>
        <div className="relative mt-5 flex max-w-sm flex-wrap gap-2">
          {[
            "Cuidados com a Pele",
            "Higiene Pessoal",
            "Cabelos",
            "Vitaminas e Suplementos",
          ].map((c) => (
            <button
              className="rounded-full border border-brand/15 bg-surface/60 px-3 py-2 text-xs text-brand"
              key={c}
              onClick={() => onSelect(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <Button
          className="relative mt-7"
          onClick={() => onSelect("Cuidados com a Pele")}
        >
          Explorar cuidados ↗
        </Button>
      </section>
    </Container>
  );
}
export function ServiceSections() {
  const services = [
    "Aferição de pressão",
    "Aferição de glicemia",
    "Orientação farmacêutica",
    "Aplicação de injetáveis",
    "Entrega local",
    "Atendimento pelo WhatsApp",
  ];
  const benefits = [
    "Atendimento próximo",
    "Catálogo digital",
    "Facilidade pelo WhatsApp",
    "Produtos para toda a família",
    "Informações organizadas",
    "Experiência simples",
  ];
  return (
    <>
      <Container className="py-16">
        <section id="servicos">
          <p className="eyebrow">Acolher também é cuidar</p>
          <SectionTitle className="text-3xl">
            Mais cuidado para você
          </SectionTitle>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Card key={s} className="flex items-center gap-4">
                <span className="category-icon shrink-0">
                  <Icon index={i} />
                </span>
                <h3 className="text-sm font-semibold">{s}</h3>
              </Card>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted">
            Os serviços apresentados fazem parte do projeto demonstrativo. Não
            estão disponíveis para agendamento ou realização.
          </p>
        </section>
      </Container>
      <section id="sobre" className="border-y border-border bg-surface">
        <Container className="grid gap-12 py-16 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="eyebrow">Nossa essência</p>
            <SectionTitle className="max-w-sm text-3xl">
              Por que escolher a RodeVita?
            </SectionTitle>
            <p className="mt-5 max-w-sm leading-relaxed text-muted">
              Cuidado para todos os dias. Uma experiência pensada para aproximar
              você do que precisa, com clareza, acolhimento e praticidade.
            </p>
          </div>
          <div className="grid gap-7 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <div className="flex items-center gap-4" key={b}>
                <span className="text-health">
                  <Icon index={i} />
                </span>
                <h3 className="text-sm font-semibold">{b}</h3>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <Container className="py-16">
        <div className="text-center">
          <p className="eyebrow">Simples do começo ao fim</p>
          <SectionTitle className="text-3xl">
            Seu orçamento em três passos
          </SectionTitle>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            ["Encontre", "Pesquise o produto que precisa."],
            ["Adicione", "Monte sua lista de orçamento."],
            ["Solicite", "Envie tudo pelo WhatsApp."],
          ].map(([title, text], i) => (
            <div className="step" key={title}>
              <span className="step-number">0{i + 1}</span>
              <h3 className="mt-5 text-xl font-bold text-brand">{title}</h3>
              <p className="mt-2 text-muted">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
export function FinalCta() {
  return (
    <Container className="py-16">
      <section id="contato" className="final-cta">
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
      </section>
    </Container>
  );
}
