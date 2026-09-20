import { Badge, Button, Card } from "@/components/ui";
import type { Produto } from "@/data/produtos";
export function ProductCard({
  produto,
  onAdd,
  quantidade,
}: {
  produto: Produto;
  quantidade?: number;
  onAdd: (produto: Produto) => void;
}) {
  return (
    <Card className="flex h-full flex-col">
      <span className="text-xs font-semibold uppercase tracking-wide text-health">
        {produto.categoria}
      </span>
      <h3 className="mt-3 text-xl font-bold">{produto.nome}</h3>
      <p className="mt-1 text-muted">{produto.dosagem}</p>
      <div className="mb-6 mt-5">
        <Badge variant={produto.exigeReceita ? "prescription" : "free"} />
      </div>
      {quantidade !== undefined && (
        <p className="mb-3 text-xs font-medium text-health">
          {quantidade > 0
            ? `${quantidade} na sua lista de orçamento`
            : "Adicione à sua lista"}
        </p>
      )}
      <Button onClick={() => onAdd(produto)} className="mt-auto w-full">
        Adicionar ao orçamento
      </Button>
    </Card>
  );
}
