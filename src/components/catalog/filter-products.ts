import type { Produto } from "@/data/produtos";
export function filterProducts<T extends Produto>(
  produtos: T[],
  busca: string,
  categoria: string,
): T[] {
  const termo = busca.toLowerCase().trim();
  return produtos.filter(
    (produto) =>
      (categoria === "Todos" ||
        produto.categoria.trim() === categoria.trim()) &&
      (!termo ||
        produto.nome.toLowerCase().includes(termo) ||
        produto.dosagem.toLowerCase().includes(termo) ||
        produto.categoria.toLowerCase().includes(termo)),
  );
}
