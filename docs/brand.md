# Identidade visual RodeVita

**Nome:** RodeVita  
**Assinatura:** Drogaria & Bem-estar  
**Slogan:** Cuidado para todos os dias.

## Paleta

| Cor              | Valor   | Uso                                       |
| ---------------- | ------- | ----------------------------------------- |
| Azul Profundo    | #0B3D4A | Institucional, títulos e ações principais |
| Verde Saúde      | #2E7D6B | Saúde, ações positivas e WhatsApp         |
| Dourado Suave    | #D4B574 | Acabamentos discretos                     |
| Off-white        | #F8FAF9 | Fundo geral                               |
| Cinza Suave      | #E5EAE9 | Bordas e divisores                        |
| Texto principal  | #17313A | Conteúdo                                  |
| Texto secundário | #66777D | Informações auxiliares                    |

Tokens centralizados em src/app/globals.css e expostos ao Tailwind por @theme inline.
Use classes semânticas como bg-brand, text-muted e border-border; não repita hexadecimais nos componentes.
Superfícies brancas, sombras, raios e tons auxiliares de hover, azul, verde, âmbar e vermelho estão no mesmo arquivo.
O tema é claro, independentemente da preferência do dispositivo.

## Tipografia

- **Montserrat:** títulos, botões e destaques (font-heading).
- **Inter:** textos, formulários e interface (font-sans).

Fontes variáveis carregadas com next/font/google no layout, display swap e subset latin.
O build precisa acessar o provedor das fontes; os arquivos resultantes são servidos pelo próprio site, sem requisições do visitante ao Google.

## Logos

- /brand/rodevita-logo-horizontal.png: Header e Footer.
- /brand/rodevita-logo-vertical.png: reservada para composições verticais.
- /brand/rodevita-simbolo.png: reservado para aplicações compactas.

Originais em public/brand/. Não distorcer, recolorir, aplicar filtros ou remover elementos da arte.
Usar sobre fundo claro, com respiro e proporção preservada. O componente desconta apenas as margens transparentes do PNG por CSS, sem modificar o arquivo.
Fornecer texto alternativo e nome acessível nos links da marca.

## Componentes reutilizáveis

Importar de @/components/ui:

- Button: variantes primary, secondary e whatsapp; tipo padrão button.
- buttonStyles: mesmas variantes para links com semântica de navegação.
- Card: article com borda, cantos arredondados e sombra discreta; ui-card atende outros elementos semânticos.
- SearchField: campo search; informar label ou aria-label.
- Badge: free (Venda livre, verde), prescription (Exige receita, âmbar), retained (Receita retida, vermelho suave), offer (Oferta, azul).
- Container: largura máxima de 80rem e espaçamento lateral responsivo.
- SectionTitle: h2 por padrão; aceita h1 e h3.

Os componentes preservam atributos HTML, eventos e className.
Os estilos incluem foco visível e estado desabilitado para botões.
Badges incluem texto; a informação não depende somente de cor.
O texto âmbar usa tom escuro legível; dourado claro é acabamento.

## Regras de composição

Priorizar espaço em branco, fundos claros, bordas suaves e sombras discretas.
Usar azul como base institucional e verde para saúde/WhatsApp. Evitar grandes superfícies douradas.
Preservar hierarquia dos títulos e navegação por teclado. Respeitar preferência por movimento reduzido.

## Escopo desta etapa

Estrutura do catálogo e orçamento mantida. Header e Footer compartilhados no layout.
API, validação dos produtos, filtros, quantidades e mensagem/número do WhatsApp permanecem iguais.
A chave legada carrinho-drogaria-luisa foi preservada para manter carrinhos existentes.
Receita retida e Oferta são variantes para uso futuro: o catálogo atual informa apenas exigeReceita; não inferir outros estados.
