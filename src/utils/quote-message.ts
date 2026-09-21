import type { Produto } from "@/data/produtos";

export const FORMAS_PAGAMENTO = [
  "Não informar",
  "Pix",
  "Cartão de Débito",
  "Cartão de Crédito",
  "Dinheiro",
] as const;

export type FormaPagamento = (typeof FORMAS_PAGAMENTO)[number];

type ItemOrcamento = Pick<Produto, "nome" | "dosagem" | "exigeReceita"> & {
  quantidade: number;
};

export function isFormaPagamento(value: string): value is FormaPagamento {
  return FORMAS_PAGAMENTO.some((option) => option === value);
}

export function criarMensagemOrcamento({
  itens,
  endereco,
  formaPagamento,
}: {
  itens: ItemOrcamento[];
  endereco: string;
  formaPagamento: FormaPagamento;
}) {
  const produtos = itens
    .map(
      (item) =>
        `• ${item.quantidade}x ${item.nome} ${item.dosagem}${
          item.exigeReceita ? " — exige receita" : ""
        }`,
    )
    .join("\n");

  const detalhes: string[] = [];
  const enderecoNormalizado = endereco.trim();

  if (enderecoNormalizado) {
    detalhes.push(`Endereço:\n${enderecoNormalizado}`);
  }

  if (formaPagamento !== "Não informar") {
    detalhes.push(`Forma de pagamento:\n${formaPagamento}`);
  }

  if (itens.some((item) => item.exigeReceita)) {
    detalhes.push(
      "Estou ciente de que alguns itens podem exigir apresentação de receita médica.",
    );
  }

  return [
    "Olá! Gostaria de consultar a disponibilidade e solicitar um orçamento dos seguintes produtos:",
    produtos,
    ...detalhes,
    "Aguardo o retorno. Obrigado!",
  ].join("\n\n");
}
