import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductCatalog } from "@/services/product-catalog";
import { productSlug } from "@/utils/slug";
import {
  ProductDetail,
  ProductLoadError,
} from "@/components/product/product-detail";

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { products, error } = await getProductCatalog();
  const produto = products.find((p) => productSlug(p) === slug);
  if (!produto)
    return {
      title: error
        ? "Produto indisponível | RodeVita"
        : "Produto não encontrado | RodeVita",
      robots: { index: false, follow: true },
    };
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    title: `${produto.nome} ${produto.dosagem} | RodeVita`,
    description: `Consulte ${produto.nome} ${produto.dosagem} no catálogo demonstrativo da RodeVita e solicite disponibilidade pelo WhatsApp.`,
    ...(site && /^https?:\/\//.test(site)
      ? {
          alternates: {
            canonical: new URL(
              `/produtos/${productSlug(produto)}`,
              site,
            ).toString(),
          },
        }
      : {}),
  };
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const { products, error } = await getProductCatalog();
  if (error) return <ProductLoadError />;
  const produto = products.find((p) => productSlug(p) === slug);
  if (!produto) notFound();
  const related = products
    .filter(
      (p) =>
        p.categoria.trim() === produto.categoria.trim() && p.id !== produto.id,
    )
    .slice(0, 4);
  return <ProductDetail produto={produto} related={related} />;
}
