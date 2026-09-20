"use client";
import { Button } from "@/components/ui";
import { useCatalog } from "./catalog-provider";
export function QuotePanel({ className = "" }: { className?: string }) {
  const {
    carrinho,
    quantidadeTotal,
    mostrarConfirmacao,
    setMostrarConfirmacao,
    aumentarQuantidade,
    diminuirQuantidade,
    removerProduto,
    solicitarOrcamento,
    limparCarrinho,
  } = useCatalog();
  return (
    <aside
      id="orcamento"
      aria-label="Meu orçamento"
      className={`ui-card h-fit ${className}`}
    >
      <h2 className="text-xl font-bold text-foreground">Meu orçamento</h2>

      <p className="mt-1 text-sm text-muted">
        {quantidadeTotal} item(ns) selecionado(s)
      </p>

      {carrinho.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-sm text-muted">Nenhum produto adicionado.</p>
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
                  <h3 className="font-semibold text-foreground">{item.nome}</h3>

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
                  aria-label={`Diminuir quantidade de ${item.nome}`}
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
                  aria-label={`Aumentar quantidade de ${item.nome}`}
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
            Se o orçamento já foi enviado pelo WhatsApp, você pode limpar o
            carrinho.
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
  );
}
