import type { Produto } from "@/data/produtos";
const URL_PRODUTOS =
  "https://script.google.com/macros/s/AKfycbzW9i1xHF_fG-hES1yWNi0bZl-L05Bf9NjhVuUJJuAdT_cc72KK5GrFQM06RZzusKp5zg/exec";

export type ProdutoApi = Produto & {
  disponivel: boolean;
};

function ehProdutoApi(valor: unknown): valor is ProdutoApi {
  if (typeof valor !== "object" || valor === null) return false;

  const produto = valor as Record<string, unknown>;
  return (
    typeof produto.id === "number" &&
    Number.isFinite(produto.id) &&
    typeof produto.nome === "string" &&
    typeof produto.dosagem === "string" &&
    typeof produto.categoria === "string" &&
    typeof produto.exigeReceita === "boolean" &&
    typeof produto.disponivel === "boolean"
  );
}

export async function fetchProducts(
  signal?: AbortSignal,
): Promise<ProdutoApi[]> {
  const resposta = await fetch(URL_PRODUTOS, { signal, cache: "no-store" });
  return readProducts(resposta);
}

async function readProducts(resposta: Response): Promise<ProdutoApi[]> {
  if (!resposta.ok)
    throw new Error(`Falha ao carregar o catálogo (HTTP ${resposta.status})`);
  if (!resposta.headers.get("content-type")?.includes("application/json")) {
    throw new Error(
      "A API retornou conteúdo não JSON; verifique redirecionamentos e permissões do Apps Script",
    );
  }
  const dados: unknown = await resposta.json();
  if (!Array.isArray(dados) || !dados.every(ehProdutoApi))
    throw new Error("Formato de catálogo inválido");
  return dados.filter((produto) => produto.disponivel === true);
}
