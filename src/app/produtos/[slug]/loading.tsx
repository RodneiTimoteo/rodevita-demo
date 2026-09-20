import { Container } from "@/components/ui";
export default function LoadingProduct() {
  return (
    <main id="catalogo" className="flex-1">
      <Container className="py-16">
        <div
          role="status"
          aria-label="Carregando produto"
          className="grid gap-10 md:grid-cols-2"
        >
          <div
            aria-hidden="true"
            className="min-h-80 rounded-3xl bg-health-soft"
          />
          <div aria-hidden="true" className="space-y-6 py-8">
            <div className="h-5 w-1/3 rounded bg-health-soft" />
            <div className="h-12 rounded bg-brand-soft" />
            <div className="h-6 w-1/2 rounded bg-brand-soft" />
            <div className="h-14 rounded-xl bg-brand-soft" />
          </div>
          <span className="sr-only">Carregando produto...</span>
        </div>
      </Container>
    </main>
  );
}
