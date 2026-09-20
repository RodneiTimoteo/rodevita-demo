"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Produto } from "@/data/produtos";
const URL_PRODUTOS =
  "https://script.google.com/macros/s/AKfycbzW9i1xHF_fG-hES1yWNi0bZl-L05Bf9NjhVuUJJuAdT_cc72KK5GrFQM06RZzusKp5zg/exec";

type ProdutoApi = Produto & {
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

function mesmoProduto(a: Produto, b: Produto): boolean {
  return a.id === b.id && a.nome === b.nome && a.dosagem === b.dosagem;
}

type ItemCarrinho = Produto & {
  quantidade: number;
};

function useCatalogState() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [carrinhoCarregado, setCarrinhoCarregado] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [produtos, setProdutos] = useState<ProdutoApi[]>([]);
  const [carregandoProdutos, setCarregandoProdutos] = useState(true);
  const [erroProdutos, setErroProdutos] = useState<string | null>(null);

  const [tentativa, setTentativa] = useState(0);
  function tentarNovamente() {
    setErroProdutos(null);
    setCarregandoProdutos(true);
    setTentativa((value) => value + 1);
  }

  // O catálogo remoto é independente do carrinho salvo.
  useEffect(() => {
    const controller = new AbortController();
    let ativo = true;
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    async function carregarProdutos() {
      try {
        const resposta = await fetch(URL_PRODUTOS, {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!resposta.ok) throw new Error("Falha ao carregar o catálogo");

        const dados: unknown = await resposta.json();
        if (!Array.isArray(dados) || !dados.every(ehProdutoApi)) {
          throw new Error("Formato de catálogo inválido");
        }

        if (ativo) {
          setProdutos(dados.filter((produto) => produto.disponivel === true));
        }
      } catch {
        if (ativo) {
          setErroProdutos(
            "Não foi possível carregar os produtos agora. Tente atualizar a página em alguns instantes. Os itens do seu carrinho foram mantidos.",
          );
        }
      } finally {
        window.clearTimeout(timeout);
        if (ativo) setCarregandoProdutos(false);
      }
    }

    void carregarProdutos();

    return () => {
      ativo = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [tentativa]);

  // Carrega o carrinho salvo no navegador
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho-drogaria-luisa");

    if (carrinhoSalvo) {
      try {
        // Restaura o estado do navegador após a hidratação, antes de permitir a persistência.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCarrinho(JSON.parse(carrinhoSalvo));
      } catch {
        localStorage.removeItem("carrinho-drogaria-luisa");
      }
    }

    setCarrinhoCarregado(true);
  }, []);

  // Salva automaticamente sempre que o carrinho mudar
  useEffect(() => {
    if (!carrinhoCarregado) return;

    if (carrinho.length === 0) {
      localStorage.removeItem("carrinho-drogaria-luisa");
      return;
    }

    localStorage.setItem("carrinho-drogaria-luisa", JSON.stringify(carrinho));
  }, [carrinho, carrinhoCarregado]);

  function adicionarAoCarrinho(produto: Produto) {
    setCarrinho((carrinhoAtual) => {
      const produtoExistente = carrinhoAtual.find((item) =>
        mesmoProduto(item, produto),
      );

      if (produtoExistente) {
        return carrinhoAtual.map((item) =>
          mesmoProduto(item, produto)
            ? { ...item, quantidade: item.quantidade + 1 }
            : item,
        );
      }

      return [...carrinhoAtual, { ...produto, quantidade: 1 }];
    });
  }

  function aumentarQuantidade(produto: Produto) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.map((item) =>
        mesmoProduto(item, produto)
          ? { ...item, quantidade: item.quantidade + 1 }
          : item,
      ),
    );
  }

  function diminuirQuantidade(produto: Produto) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual
        .map((item) =>
          mesmoProduto(item, produto)
            ? { ...item, quantidade: item.quantidade - 1 }
            : item,
        )
        .filter((item) => item.quantidade > 0),
    );
  }

  function removerProduto(produto: Produto) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.filter((item) => !mesmoProduto(item, produto)),
    );
  }

  function solicitarOrcamento() {
    if (carrinho.length === 0) return;

    const numeroWhatsApp = "5511973288576";

    const itens = carrinho
      .map(
        (item) =>
          `• ${item.quantidade}x ${item.nome} ${item.dosagem}${
            item.exigeReceita ? " — exige receita" : ""
          }`,
      )
      .join("\n");

    const possuiReceita = carrinho.some((item) => item.exigeReceita);

    const mensagem = `Olá! Gostaria de consultar a disponibilidade e solicitar um orçamento dos seguintes produtos:

${itens}

${
  possuiReceita
    ? "Estou ciente de que alguns itens podem exigir apresentação de receita médica.\n\n"
    : ""
}Aguardo o retorno. Obrigado!`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
      mensagem,
    )}`;

    window.open(url, "_blank");
    setMostrarConfirmacao(true);
  }

  function limparCarrinho() {
    localStorage.removeItem("carrinho-drogaria-luisa");
    setCarrinho([]);
    setMostrarConfirmacao(false);
  }

  const quantidadeTotal = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0,
  );

  return {
    produtos,
    carregandoProdutos,
    erroProdutos,
    tentarNovamente,
    carrinho,
    quantidadeTotal,
    mostrarConfirmacao,
    setMostrarConfirmacao,
    adicionarAoCarrinho,
    aumentarQuantidade,
    diminuirQuantidade,
    removerProduto,
    solicitarOrcamento,
    limparCarrinho,
  };
}
const CatalogContext = createContext<ReturnType<typeof useCatalogState> | null>(
  null,
);
export function CatalogProvider({ children }: { children: ReactNode }) {
  const value = useCatalogState();
  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}
export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) throw new Error("CatalogProvider ausente");
  return context;
}
