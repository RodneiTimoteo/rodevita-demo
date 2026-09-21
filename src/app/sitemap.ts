import type { MetadataRoute } from "next";
import { fetchProducts } from "@/services/products";
import { productSlug } from "@/utils/slug";
import { absoluteUrl } from "@/utils/site";

const staticRoutes = ["/", "/produtos", "/ofertas", "/servicos", "/sobre", "/contato"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: absoluteUrl(path),
  }));

  try {
    const products = await fetchProducts(AbortSignal.timeout(10000));
    const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
      url: absoluteUrl(`/produtos/${productSlug(product)}`),
    }));

    return [...staticEntries, ...productEntries];
  } catch {
    return staticEntries;
  }
}
