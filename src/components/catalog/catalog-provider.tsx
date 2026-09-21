"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Produto } from "@/data/produtos";
import { fetchProducts, type ProdutoApi } from "@/services/products";
import {
  criarMensagemOrcamento,
  isFormaPagamento,
  type FormaPagamento,
} from "@/utils/quote-message";
import { whatsappUrl } from "@/utils/whatsapp";

const CART_STORAGE_KEY = "carrinho-drogaria-luisa";
const ADDRESS_STORAGE_KEY = "rodevita-endereco-orcamento";
const PAYMENT_STORAGE_KEY = "rodevita-pagamento-orcamento";
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
  const [enderecoOrcamento, setEnderecoOrcamento] = useState("");
  const [formaPagamento, setFormaPagamento] =
    useState<FormaPagamento>("Não informar");
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
        const dados = await fetchProducts(controller.signal);
        if (ativo) setProdutos(dados);
      } catch (error) {
        if (ativo) {
          console.error("[RodeVita] Falha ao consultar a API de produtos", {
            tipo: controller.signal.aborted
              ? "timeout"
              : error instanceof Error
                ? error.name
                : "desconhecido",
            detalhe:
              error instanceof Error ? error.message : "Falha desconhecida",
          });
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
    const carrinhoSalvo = localStorage.getItem(CART_STORAGE_KEY);
    const enderecoSalvo = localStorage.getItem(ADDRESS_STORAGE_KEY);
    const pagamentoSalvo = localStorage.getItem(PAYMENT_STORAGE_KEY);

    if (carrinhoSalvo) {
      try {
        // Restaura o estado do navegador após a hidratação, antes de permitir a persistência.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCarrinho(JSON.parse(carrinhoSalvo));
      } catch {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }

    if (enderecoSalvo) {
      setEnderecoOrcamento(enderecoSalvo);
    }

    if (pagamentoSalvo && isFormaPagamento(pagamentoSalvo)) {
      setFormaPagamento(pagamentoSalvo);
    }

    setCarrinhoCarregado(true);
  }, []);

  // Salva automaticamente sempre que o carrinho mudar
  useEffect(() => {
    if (!carrinhoCarregado) return;

    if (carrinho.length === 0) {
      localStorage.removeItem(CART_STORAGE_KEY);
      return;
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(carrinho));
  }, [carrinho, carrinhoCarregado]);

  useEffect(() => {
    if (!carrinhoCarregado) return;

    if (!enderecoOrcamento.trim()) {
      localStorage.removeItem(ADDRESS_STORAGE_KEY);
      return;
    }

    localStorage.setItem(ADDRESS_STORAGE_KEY, enderecoOrcamento);
  }, [carrinhoCarregado, enderecoOrcamento]);

  useEffect(() => {
    if (!carrinhoCarregado) return;

    if (formaPagamento === "Não informar") {
      localStorage.removeItem(PAYMENT_STORAGE_KEY);
      return;
    }

    localStorage.setItem(PAYMENT_STORAGE_KEY, formaPagamento);
  }, [carrinhoCarregado, formaPagamento]);

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

    const mensagem = criarMensagemOrcamento({
      itens: carrinho,
      endereco: enderecoOrcamento,
      formaPagamento,
    });

    const url = whatsappUrl(mensagem);

    window.open(url, "_blank");
    setMostrarConfirmacao(true);
  }

  function limparCarrinho() {
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(ADDRESS_STORAGE_KEY);
    localStorage.removeItem(PAYMENT_STORAGE_KEY);
    setCarrinho([]);
    setEnderecoOrcamento("");
    setFormaPagamento("Não informar");
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
    enderecoOrcamento,
    setEnderecoOrcamento,
    formaPagamento,
    setFormaPagamento,
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
