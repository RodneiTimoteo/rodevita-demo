import type { Produto } from "@/data/produtos";
export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
export function productSlug(
  produto: Pick<Produto, "nome" | "dosagem">,
): string {
  const dosage = produto.dosagem.replace(/(\d)\s+(?=[a-zA-Zµμ])/g, "$1");
  return slugify(`${produto.nome} ${dosage}`);
}
