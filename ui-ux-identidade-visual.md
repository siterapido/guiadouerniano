# 🎨 Guia do UERNIANO — Design System & Identidade Visual
### Versão 1.0 · Movimento Correnteza × UERN · 2026

---

## Índice

1. [Essência da Marca](#1-essência-da-marca)
2. [Logotipo & Símbolo](#2-logotipo--símbolo)
3. [Paleta de Cores](#3-paleta-de-cores)
4. [Tipografia](#4-tipografia)
5. [Espaçamento & Grid](#5-espaçamento--grid)
6. [Iconografia](#6-iconografia)
7. [Componentes UI](#7-componentes-ui)
8. [Padrões de Layout Mobile-First](#8-padrões-de-layout-mobile-first)
9. [Navegação & Interações](#9-navegação--interações)
10. [Ilustrações & Imagens](#10-ilustrações--imagens)
11. [Motion & Animações](#11-motion--animações)
12. [Acessibilidade](#12-acessibilidade)
13. [Princípios de Design](#13-princípios-de-design)
14. [Exemplos de Telas](#14-exemplos-de-telas)

---

## 1. Essência da Marca

### Missão
O **Guia do UERNIANO** é o portal central para estudantes da Universidade do Estado do Rio Grande do Norte. Uma plataforma viva, combativa e acolhedora — que centraliza informações acadêmicas, movimentos estudantis, lutas sociais e comunidade.

### Personalidade da Marca
A marca tem quatro traços centrais que devem guiar todas as decisões de design:

**Combativa & Acolhedora** — A plataforma é criada por estudantes para estudantes. O design deve transmitir ao mesmo tempo a energia do movimento e o calor de uma comunidade que cuida de quem chega.

**Acessível & Direta** — A informação precisa chegar. Sem barreiras, sem jargões desnecessários. Interface limpa, hierarquia clara, respostas rápidas.

**Atual & Enraizada** — Visual contemporâneo sem perder a identidade do movimento. Não é uma startup tech genérica — é da UERN, do Nordeste, do movimento estudantil brasileiro.

**Confiável & Transparente** — Os estudantes precisam confiar no conteúdo. Design que transmite seriedade sem ser burocrático.

### Tom Visual
> Moderno · Político · Popular · Limpo · Acessível · Nordestino

---

## 2. Logotipo & Símbolo

### Logotipo Principal
O logotipo combina o símbolo do Correnteza (onda/corrente) com a identidade textual "Guia do UERNIANO". A tipografia deve ser em **bold weight** com tracking levemente expandido.

```
Estrutura:
[Símbolo Onda] + [GUIA DO] + [UERNIANO]
                  (menor)      (destaque)
```

### Variações
| Variação | Uso |
|---|---|
| **Principal (Azul)** | Fundo branco/claro — uso padrão |
| **Negativa (Branco)** | Fundo azul escuro, dark mode |
| **Compacta (Símbolo)** | Favicon, avatar, ícone de app |
| **Horizontal** | Header desktop |
| **Vertical (Empilhada)** | Splash screen, cartazes |

### Zona de Proteção
Reservar ao redor do logotipo um espaço equivalente à altura da letra "U" em todas as direções. Nunca inserir outros elementos dentro dessa zona.

### Proibições
- Não distorcer as proporções
- Não aplicar sombra, gradiente ou efeito 3D
- Não usar sobre fundos com baixo contraste
- Não recolorizar com cores fora da paleta oficial
- Não rotacionar

---

## 3. Paleta de Cores

### Filosofia de Cor
A paleta une o **azul institucional da UERN** com o **azul vibrante do Correnteza**, elevados por um **vermelho-laranja de ação** que representa energia e luta. Neutros limpos garantem legibilidade e respiro visual.

---

### Cores Primárias

#### Azul UERN (Institucional)
```
Nome:     Azul UERN
Hex:      #003087
RGB:      0, 48, 135
HSL:      221°, 100%, 26%
Uso:      Logotipo, headers, elementos institucionais
```

#### Azul Correnteza (Movimento)
```
Nome:     Azul Correnteza
Hex:      #1A5FB4
RGB:      26, 95, 180
HSL:      214°, 75%, 40%
Uso:      Botões primários, links ativos, destaque de navegação
```

#### Azul Brilhante (Interactive)
```
Nome:     Azul Brilhante
Hex:      #2870D4
RGB:      40, 112, 212
HSL:      214°, 70%, 49%
Uso:      Hover states, foco, links
```

---

### Cor de Ação (Accent)

#### Vermelho Luta
```
Nome:     Vermelho Luta
Hex:      #E63946
RGB:      230, 57, 70
HSL:      356°, 77%, 56%
Uso:      CTAs principais, badges urgentes, destaques críticos
```

#### Laranja Energia
```
Nome:     Laranja Energia
Hex:      #F4732A
RGB:      244, 115, 42
HSL:      22°, 90%, 56%
Uso:      Tags de notícias quentes, indicadores de novidade
```

---

### Cores Neutras

```
Branco        #FFFFFF   Fundos principais
Gelo          #F8F9FC   Fundos alternativos, cards
Prata         #E8EAED   Bordas, divisores
Cinza Claro   #C4C9D4   Textos desabilitados, placeholders
Cinza Médio   #6B7280   Textos secundários, legendas
Cinza Escuro  #374151   Textos de corpo
Quase Preto   #1A202C   Títulos, textos primários
Preto UERN    #0D1117   Dark mode, contraste máximo
```

---

### Dark Mode

```
Background    #0D1117   Fundo principal
Surface       #161B22   Cards, modais
Surface Alt   #21262D   Hover, inputs
Border        #30363D   Bordas sutis
Text Primary  #F0F6FC   Títulos
Text Body     #C9D1D9   Texto de corpo
Text Muted    #8B949E   Textos secundários
```

---

### Semântica de Cores

```
Sucesso       #1A7F37   Ações concluídas, confirmações
Aviso         #9A6700   Alertas, informações importantes
Erro          #CF222E   Erros, validações negativas
Info          #0969DA   Informações neutras, tooltips
```

---

### Gradientes

#### Gradiente Institucional
```css
background: linear-gradient(135deg, #003087 0%, #1A5FB4 100%);
```
*Uso: Hero section, banners principais, splash screen*

#### Gradiente Movimento
```css
background: linear-gradient(135deg, #1A5FB4 0%, #2870D4 60%, #E63946 100%);
```
*Uso: Banners de campanha, CTAs especiais*

#### Gradiente Sutil
```css
background: linear-gradient(180deg, #F8F9FC 0%, #FFFFFF 100%);
```
*Uso: Seções alternadas, fundos de cards*

---

## 4. Tipografia

### Filosofia Tipográfica
Dois níveis: uma fonte de display com personalidade para títulos e uma fonte altamente legível para leitura no corpo do texto. Ambas com excelente suporte a caracteres do português e ótima renderização em telas mobile.

---

### Família de Fontes

#### Display — Syne
```
Uso:      Títulos, headlines, hero text, chamadas
Pesos:    700 (Bold), 800 (ExtraBold)
Source:   Google Fonts / CDN
Import:   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap')
```
> Syne traz personalidade forte e contemporânea. Seu caráter expressivo remete à energia gráfica dos movimentos — sem perder modernidade.

#### Body — Inter
```
Uso:      Corpo de texto, UI, labels, captions
Pesos:    400 (Regular), 500 (Medium), 600 (SemiBold)
Source:   Google Fonts / CDN
Import:   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap')
```
> Inter é otimizada para telas digitais com foco em legibilidade. Funciona perfeitamente em tamanhos pequenos — essencial para mobile.

#### Mono — JetBrains Mono (opcional)
```
Uso:      Códigos, datas, números de protocolo, IDs
Peso:     400 (Regular)
```

---

### Escala Tipográfica (Type Scale)

#### Mobile (base: 16px)

| Token | Tamanho | Peso | Line-height | Uso |
|---|---|---|---|---|
| `display-xl` | 40px | 800 | 1.1 | Hero principal |
| `display-lg` | 32px | 800 | 1.15 | Títulos de seção hero |
| `heading-xl` | 28px | 700 | 1.2 | Títulos de página |
| `heading-lg` | 24px | 700 | 1.25 | Títulos de seção |
| `heading-md` | 20px | 700 | 1.3 | Subtítulos, cards |
| `heading-sm` | 18px | 600 | 1.35 | Labels de destaque |
| `body-lg` | 18px | 400 | 1.6 | Textos longos, artigos |
| `body-md` | 16px | 400 | 1.6 | Corpo padrão |
| `body-sm` | 14px | 400 | 1.5 | Textos secundários |
| `caption` | 12px | 500 | 1.4 | Legendas, metadados |
| `overline` | 11px | 600 | 1.3 | Labels de categoria (UPPERCASE) |

#### Desktop (base: 16px)

| Token | Tamanho | Peso |
|---|---|---|
| `display-xl` | 72px | 800 |
| `display-lg` | 56px | 800 |
| `heading-xl` | 40px | 700 |
| `heading-lg` | 32px | 700 |
| `heading-md` | 24px | 700 |

---

### Regras Tipográficas

**Comprimento de linha:** Máximo de 65–75 caracteres por linha para texto de corpo. No mobile, 100% da largura do container.

**Hierarquia visual:** Nunca usar mais de 3 níveis tipográficos diferentes em uma mesma tela.

**Casing:** `overline` sempre em UPPERCASE com `letter-spacing: 0.1em`. Títulos em Title Case. Corpo em sentence case.

**Combinações proibidas:** Nunca usar Syne para texto de corpo (acima de 4 linhas). Nunca usar Inter regular em títulos abaixo de 20px.

---

## 5. Espaçamento & Grid

### Escala de Espaçamento
Base multiplicadora: **4px**

```
4xs   →   2px
3xs   →   4px
2xs   →   8px
xs    →   12px
sm    →   16px
md    →   24px
lg    →   32px
xl    →   48px
2xl   →   64px
3xl   →   96px
4xl   →   128px
```

---

### Grid System

#### Mobile (< 768px)
```
Colunas:    4
Gutter:     16px
Margin:     16px (laterais)
Max-width:  100%
```

#### Tablet (768px – 1024px)
```
Colunas:    8
Gutter:     24px
Margin:     32px
Max-width:  100%
```

#### Desktop (> 1024px)
```
Colunas:    12
Gutter:     32px
Margin:     auto
Max-width:  1280px (container)
```

---

### Breakpoints

```css
--bp-mobile:   375px    /* Referência mínima */
--bp-sm:       480px    /* Mobile grande */
--bp-md:       768px    /* Tablet */
--bp-lg:       1024px   /* Desktop pequeno */
--bp-xl:       1280px   /* Desktop padrão */
--bp-2xl:      1440px   /* Desktop grande */
```

### Princípio Mobile-First
Todo CSS deve partir do mobile como base. Desktop é uma expansão, não o padrão:

```css
/* ✅ CORRETO — Mobile First */
.container { padding: 16px; }
@media (min-width: 768px) { .container { padding: 32px; } }

/* ❌ ERRADO — Desktop First */
.container { padding: 32px; }
@media (max-width: 768px) { .container { padding: 16px; } }
```

---

### Zonas de Toque (Touch Targets)
Todo elemento interativo deve ter área de toque mínima de **44×44px** (padrão WCAG e Apple HIG). Mesmo que o visual pareça menor, o padding deve compensar.

---

## 6. Iconografia

### Biblioteca Principal: Lucide Icons
Lucide é open-source, com traços uniformes e estilo que complementa o Inter. Usar sempre com `stroke-width: 1.5` e tamanho base de **24px** (mobile) / **20px** (denso/desktop).

### Tamanhos de Ícone

```
xs:   16px   Indicadores inline em texto
sm:   20px   Botões compactos, listas
md:   24px   Uso geral (padrão)
lg:   32px   Cards de feature, seções
xl:   48px   Ícones ilustrativos, onboarding
```

### Ícones Customizados do Sistema
Para ícones específicos da UERN e do movimento, criar SVGs customizados seguindo o mesmo `stroke-width` e grid de 24×24px. Exportar em SVG otimizado (sem grupos desnecessários).

### Uso com Cor
Ícones sempre herdam a cor do texto pai (`currentColor`) por padrão. Quando usados isolados em destaque, aplicar a cor correspondente ao contexto semântico.

---

## 7. Componentes UI

### 7.1 Botões

#### Hierarquia de Botões

**Primary (Primário)**
```
Background:  --azul-correnteza (#1A5FB4)
Text:        #FFFFFF
Border:      none
Radius:      8px
Padding:     12px 24px (mobile) / 14px 28px (desktop)
Font:        Inter SemiBold 16px
Hover:       background #1650A0, transform translateY(-1px)
Active:      background #0E3D7A
Focus:       outline 2px solid #2870D4, offset 2px
```

**Danger/CTA (Ação Principal)**
```
Background:  --vermelho-luta (#E63946)
Text:        #FFFFFF
Uso:         Inscrições, chamadas urgentes, CTAs principais
```

**Secondary (Secundário)**
```
Background:  transparent
Border:      2px solid --azul-correnteza
Text:        --azul-correnteza
Hover:       background rgba(26, 95, 180, 0.08)
```

**Ghost (Terciário)**
```
Background:  transparent
Border:      none
Text:        --azul-correnteza
Hover:       background rgba(26, 95, 180, 0.06)
Padding:     12px 16px
```

#### Tamanhos de Botão
```
sm:   height 36px, padding 8px 16px, font 14px
md:   height 44px, padding 12px 24px, font 16px (padrão)
lg:   height 52px, padding 14px 32px, font 18px
full: width 100%, display block (mobile padrão para CTAs)
```

#### Estado de Loading
Substituir texto por spinner circular de 16px. Desabilitar o botão durante o carregamento. Nunca remover o botão da tela.

---

### 7.2 Cards

#### Card de Conteúdo (Blog / Notícia)
```
Border-radius:    12px
Background:       #FFFFFF
Shadow:           0 1px 3px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)
Shadow Hover:     0 4px 12px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)
Padding:          0 (imagem full-width no topo) + 16px (conteúdo)
Transition:       transform 200ms ease, box-shadow 200ms ease
Hover Transform:  translateY(-4px)
```

**Estrutura interna do Card:**
```
[Imagem (aspect-ratio 16/9)]
[Tag de Categoria — overline + cor]
[Título — heading-md]
[Resumo — body-sm, 2 linhas max (line-clamp)]
[Footer: Avatar + Nome + Data]
```

#### Card de Serviço / Funcionalidade
```
Border-radius:    16px
Border:           1px solid --prata (#E8EAED)
Padding:          24px
Hover border:     1px solid --azul-brilhante
Ícone:            48px, cor --azul-correnteza
```

#### Card de Destaque (Hero Card)
```
Background:       gradiente institucional
Text:             #FFFFFF
Border-radius:    16px
Padding:          32px 24px
```

---

### 7.3 Tags & Badges

```
Estrutura:    texto + border-radius 100px (pill)
Padding:      4px 12px
Font:         Inter Medium 12px, uppercase, tracking 0.05em

Cores por categoria:
  Acadêmico     → fundo #EBF5FF, texto #1A5FB4
  Movimento     → fundo #FEF2F2, texto #DC2626
  Serviços      → fundo #F0FDF4, texto #16A34A
  Urgente       → fundo #E63946, texto #FFFFFF
  Novo          → fundo #FFF7ED, texto #C2410C
```

---

### 7.4 Formulários & Inputs

```
Height:           48px (padrão, confortável para touch)
Border:           1.5px solid --prata (#E8EAED)
Border-radius:    8px
Background:       #FFFFFF
Font:             Inter Regular 16px (evita zoom automático iOS!)
Padding:          12px 16px
Color:            --cinza-escuro (#374151)
Placeholder:      --cinza-médio (#6B7280)

Focus:
  border-color: --azul-correnteza
  box-shadow:   0 0 0 3px rgba(26, 95, 180, 0.12)
  outline:      none

Error:
  border-color: #CF222E
  box-shadow:   0 0 0 3px rgba(207, 34, 46, 0.12)

Success:
  border-color: #1A7F37
```

**Label:**
```
Font:     Inter Medium 14px
Color:    --cinza-escuro
Margin:   0 0 6px
```

**Helper text / Error message:**
```
Font:     Inter Regular 12px
Margin:   6px 0 0
Error:    color #CF222E
```

---

### 7.5 Navegação

#### Bottom Navigation Bar (Mobile Principal)
A barra de navegação inferior é o elemento central da experiência mobile. Máximo de 5 itens.

```
Height:           64px (+ safe-area-inset-bottom)
Background:       #FFFFFF
Border-top:       1px solid --prata
Position:         fixed, bottom 0
Z-index:          1000

Item:
  Ícone:    24px
  Label:    Inter Medium 10px (abaixo do ícone)
  Espaço:   8px entre ícone e label

Item Ativo:
  Ícone:    preenchido / peso mais espesso
  Cor:      --azul-correnteza

Item Inativo:
  Cor:      --cinza-médio
```

**Itens sugeridos:**
```
🏠 Início      → Feed principal
🔍 Explorar    → Busca e categorias
📋 Guia        → Informações da UERN
📣 Movimento   → Blog e notícias
👤 Perfil      → Área do membro
```

#### Top App Bar (Mobile)
```
Height:     56px
Background: --azul-uern (ou branco em telas internas)
Padding:    0 16px
Shadow:     0 1px 4px rgba(0,0,0,0.1)
Position:   sticky, top 0
Z-index:    999
```

#### Navbar Desktop
```
Height:     72px
Background: #FFFFFF
Border-bottom: 1px solid --prata
Max-width:  1280px (centrado)
```

---

### 7.6 Chips de Filtro

```
Border-radius:    100px
Border:           1.5px solid --prata
Padding:          8px 16px
Font:             Inter Medium 14px
Min-height:       36px

Estado padrão:    fundo branco, texto --cinza-escuro
Estado ativo:     fundo --azul-correnteza, texto branco, sem borda
```

---

### 7.7 Modais & Sheets

#### Bottom Sheet (Mobile)
Preferir bottom sheets a modais centralizados no mobile. Ocupa menos área visual e é mais natural para o polegar.

```
Border-radius:    20px 20px 0 0 (topo arredondado)
Max-height:       90vh
Padding:          20px 16px
Handle:           barra de 4x32px, fundo --cinza-claro, centralizada no topo
Backdrop:         rgba(0,0,0,0.5)
Animation:        slide-up 300ms cubic-bezier(0.16, 1, 0.3, 1)
```

---

### 7.8 Toast / Snackbar

```
Position:       fixed, bottom 80px (acima do tab bar)
Max-width:      calc(100% - 32px)
Margin:         0 auto
Border-radius:  8px
Padding:        12px 16px
Background:     --quase-preto (#1A202C)
Text:           #FFFFFF, Inter Medium 14px
Shadow:         0 4px 12px rgba(0,0,0,0.25)
Animation:      slide-up + fade 250ms
Auto-dismiss:   4 segundos
```

---

### 7.9 Skeleton Loading

Para melhorar a percepção de performance, usar skeleton screens ao invés de spinners para listas e cards.

```css
/* Animação base */
@keyframes skeleton-pulse {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, #E8EAED 25%, #F8F9FC 50%, #E8EAED 75%);
  background-size: 200% 100%;
  animation: skeleton-pulse 1.5s ease infinite;
  border-radius: 6px;
}
```

---

## 8. Padrões de Layout Mobile-First

### 8.1 Home / Feed Principal

```
[Top App Bar — Logo + Ícone Notificação + Avatar]
─────────────────────────────────────────────────
[Chips de Filtro — scroll horizontal]
─────────────────────────────────────────────────
[Card Destaque — Banner principal com gradiente]
─────────────────────────────────────────────────
[Seção: Notícias Recentes]
  [Card Notícia]
  [Card Notícia]
  [Card Notícia]
[Ver todas →]
─────────────────────────────────────────────────
[Seção: Serviços Rápidos — Grid 2x2]
  [Ícone Biblioteca] [Ícone Calendário]
  [Ícone Grêmio]     [Ícone Denúncias]
─────────────────────────────────────────────────
[Seção: Do Movimento — scroll horizontal]
─────────────────────────────────────────────────
[Bottom Navigation Bar]
```

---

### 8.2 Página de Artigo / Blog

```
[Top App Bar — Botão Voltar + "Artigo" + Compartilhar]
─────────────────────────────────────────────────
[Imagem Hero — aspect-ratio 16/9, edge-to-edge]
─────────────────────────────────────────────────
[Padding: 16px]
[Tag Categoria]
[Título — display-lg]
[Metadados: Avatar + Nome + Data + Tempo de leitura]
[Divisor]
[Corpo do texto — body-lg, máx 65 chars/linha]
─────────────────────────────────────────────────
[Seção: Relacionados]
  [Cards horizontais — scroll]
─────────────────────────────────────────────────
[Bottom Navigation Bar]
```

---

### 8.3 Guia da UERN (Estrutura de Informação)

```
[App Bar — "Guia da UERN"]
─────────────────────────────────────────────────
[SearchBar — "Buscar no guia..."]
─────────────────────────────────────────────────
[Lista de Categorias Principais]
  [→ Matrícula e Documentos]
  [→ Serviços Acadêmicos]
  [→ Restaurante Universitário]
  [→ Assistência Estudantil]
  [→ Órgãos Colegiados]
  [→ Campi e Endereços]
  [→ Calendário Acadêmico]
  [→ Movimento Estudantil]
─────────────────────────────────────────────────
[Aviso Importante — card amarelo/âmbar]
─────────────────────────────────────────────────
[Bottom Navigation Bar]
```

---

### 8.4 Área de Membros

```
[App Bar — "Área do Membro"]
─────────────────────────────────────────────────
[Card de Perfil — fundo gradiente]
  [Avatar 64px]
  [Nome e Curso]
  [Status: Membro Ativo ✓]
─────────────────────────────────────────────────
[Seção: Materiais Exclusivos]
  [Card Material PDF]
  [Card Material PDF]
─────────────────────────────────────────────────
[Seção: Eventos Próximos]
  [Lista de eventos com data]
─────────────────────────────────────────────────
[Bottom Navigation Bar]
```

---

### 8.5 Layout Desktop (12 colunas)

```
[Header — 12 cols — Logo | Nav Links | CTA Login]
═══════════════════════════════════════════════════

[Hero — 12 cols]
  [Texto (6 cols)] [Imagem (6 cols)]

─────────────────────────────────────────────────
[Seção Notícias]
  [Destaque (8 cols)] [Sidebar (4 cols)]

[Grid de Cards — 3 cols × N linhas]

─────────────────────────────────────────────────
[Seção Guia — Full width com fundo alternado]
  [Grid de serviços — 4 cols]

─────────────────────────────────────────────────
[Footer — 12 cols]
  [Logo (3)] [Links (3)] [Links (3)] [Social (3)]
```

---

## 9. Navegação & Interações

### Padrão de Navegação por Hierarquia

```
Nível 0 (Bottom Tab):   Início / Explorar / Guia / Movimento / Perfil
Nível 1 (List):         Subcategorias dentro de cada aba
Nível 2 (Detail):       Página de artigo, página de serviço
Nível 3 (Modal):        Formulários rápidos, confirmações
```

### Gestos Mobile Suportados

| Gesto | Ação |
|---|---|
| Swipe down | Refresh da lista / fechar bottom sheet |
| Swipe left/right | Navegação entre abas |
| Long press em card | Opções contextuais (salvar, compartilhar) |
| Pinch | Zoom em imagens |
| Pull to refresh | Atualizar conteúdo |

### Estados de Interação
Todo elemento interativo deve ter 5 estados visuais distintos:

```
default   → estado inicial
hover     → cursor sobre o elemento (desktop)
focus     → navegação por teclado / acessibilidade
active    → durante o toque/clique
disabled  → elemento não disponível
```

---

## 10. Ilustrações & Imagens

### Estilo de Imagens
Fotografias preferentemente em **preto e branco com overlay de cor** (tint azul) para eventos e histórias do movimento. Isso cria consistência mesmo com fotos de origens diversas e reforça a identidade visual.

```css
.image-overlay {
  filter: grayscale(30%);
  /* ou aplicar overlay CSS */
  background-blend-mode: multiply;
  background-color: rgba(0, 48, 135, 0.15);
}
```

### Ratio de Imagens Recomendados
```
Cards de notícia:   16/9 (padrão)
Cards quadrados:    1/1
Hero section:       21/9 (wide) mobile: 16/9
Avatar:             1/1 (circular)
Banner de evento:   3/1
```

### Ilustrações
Para ícones de seção e estados vazios (empty states), usar ilustrações vetoriais no estilo **line art** com as cores primárias. Personagens devem ser diversificados e representar a realidade dos estudantes nordestinos.

### Empty States
```
Estrutura:
  [Ilustração: 160px × 160px]
  [Título: heading-md]
  [Descrição: body-sm, --cinza-médio]
  [CTA: botão secondary (opcional)]
```

---

## 11. Motion & Animações

### Princípios de Motion

**Propósito:** Animações comunicam estado, não decoram. Cada transição deve ter um motivo funcional.

**Performance:** Usar apenas `transform` e `opacity` em animações (GPU-accelerated). Evitar `width`, `height`, `top`, `left` animados.

**Respeito:** Sempre verificar `prefers-reduced-motion` e desabilitar animações não essenciais.

---

### Curvas de Easing

```css
/* Easing padrão — uso geral */
--ease-default:   cubic-bezier(0.16, 1, 0.3, 1);

/* Entrada — elementos entrando na tela */
--ease-in:        cubic-bezier(0.4, 0, 1, 1);

/* Saída — elementos saindo da tela */
--ease-out:       cubic-bezier(0, 0, 0.2, 1);

/* Enfático — ações importantes */
--ease-emphasis:  cubic-bezier(0.2, 0, 0, 1);

/* Spring — interações de toque */
--ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

### Duração das Transições

```
instantânea:   0ms     Mudanças de estado sem animação (reduced-motion)
rápida:        150ms   Hover, focus states, color changes
curta:         200ms   Botões, chips, badges
média:         300ms   Cards, modais, dropdowns
longa:         400ms   Páginas, bottom sheets
muito longa:   500ms+  Onboarding, splash, transições especiais
```

---

### Transições de Página

```css
/* Transição de entrada de página */
.page-enter {
  opacity: 0;
  transform: translateX(24px);
}
.page-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 300ms var(--ease-out);
}

/* Bottom Sheet */
.sheet-enter {
  transform: translateY(100%);
}
.sheet-enter-active {
  transform: translateY(0);
  transition: transform 350ms var(--ease-default);
}
```

---

### Prefers-Reduced-Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 12. Acessibilidade

### Padrão: WCAG 2.1 AA

O Guia do UERNIANO deve ser acessível a todos os estudantes, incluindo usuários com deficiências visuais, motoras e cognitivas.

---

### Contraste Mínimo

| Combinação | Contraste | Status |
|---|---|---|
| Texto branco em Azul UERN | 12.1:1 | ✅ AAA |
| Texto branco em Azul Correnteza | 5.8:1 | ✅ AA |
| Cinza Escuro em Branco | 8.3:1 | ✅ AAA |
| Azul Correnteza em Branco | 5.8:1 | ✅ AA |

> Mínimo exigido: **4.5:1** para texto normal, **3:1** para texto grande (≥18px bold / ≥24px regular)

---

### Targets de Toque
```
Mínimo:     44 × 44px (WCAG 2.5.5)
Recomendado: 48 × 48px
Entre targets: 8px de espaço mínimo
```

### Foco Visível
```css
:focus-visible {
  outline: 2px solid #2870D4;
  outline-offset: 2px;
  border-radius: 4px;
}
```
Nunca usar `outline: none` sem fornecer alternativa visível.

### Semântica HTML
- Usar sempre elementos semânticos: `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`
- Hierarquia de headings nunca deve pular níveis (h1 → h2 → h3)
- Todo `<img>` com conteúdo deve ter `alt` descritivo
- Imagens decorativas: `alt=""` e `role="presentation"`
- Ícones sem texto: `aria-label` obrigatório

### Leitores de Tela
```html
<!-- Ícone como botão -->
<button aria-label="Compartilhar artigo">
  <svg aria-hidden="true">...</svg>
</button>

<!-- Loading state -->
<div aria-live="polite" aria-busy="true">
  <span class="sr-only">Carregando conteúdo...</span>
</div>

<!-- Classe utilitária para ocultar visualmente mas manter para screen readers -->
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); border: 0;
}
```

---

## 13. Princípios de Design

### 1. Mobile em Primeiro Lugar
Mais de 85% dos estudantes universitários acessam conteúdo pelo celular. O design parte do mobile e expande para desktop — nunca o contrário.

### 2. Conteúdo em Primeiro Lugar
A informação é o produto. Elementos de interface existem para servir o conteúdo, não competir com ele. Se um elemento não serve à informação, ele não deveria existir.

### 3. Velocidade é Funcionalidade
Em conexões instáveis (comum em campi universitários), uma interface rápida não é luxo — é necessidade. Skeleton loaders, lazy loading, e offline-first onde possível.

### 4. Inclusão é Padrão
Acessibilidade não é uma feature opcional. O guia deve funcionar para estudantes com deficiências visuais, motoras ou cognitivas. WCAG 2.1 AA é o mínimo aceitável.

### 5. Identidade sem Ruído
A identidade visual do Correnteza e da UERN deve estar presente sem sufocar o conteúdo. Cores institucionais em toques estratégicos, não em todo elemento.

### 6. Feedback Imediato
Toda interação deve ter resposta visual em menos de 100ms. O usuário nunca deve duvidar se sua ação foi registrada. Estados de loading e confirmação são obrigatórios.

### 7. Linguagem Direta
Mensagens de erro explicam o que aconteceu e como resolver. Labels são descritivos. Microcopy é amigável e em português brasileiro natural — sem tecnicismo.

---

## 14. Exemplos de Telas

### Tela Home — Mobile (375px)

```
┌─────────────────────────────┐
│ ≡  Guia do UERNIANO    🔔 👤 │  ← Top Bar 56px
├─────────────────────────────┤
│ ┌──────────────────────────┐ │
│ │ Todos  Acadêmico  Luta   │ │  ← Chips scroll horizontal
│ └──────────────────────────┘ │
├─────────────────────────────┤
│ ┌──────────────────────────┐ │
│ │         [Foto]           │ │  ← Card Destaque
│ │  🔴 URGENTE              │ │    Gradiente + texto branco
│ │  Assembleia Geral        │ │
│ │  amanhã às 14h           │ │
│ │  [Ver mais →]            │ │
│ └──────────────────────────┘ │
├─────────────────────────────┤
│ Notícias do Movimento        │
│ ┌──────────────────────────┐ │
│ │  [img]                   │ │  ← Card Notícia
│ │  MOVIMENTO               │ │
│ │  Correnteza conquista... │ │
│ │  ★ Marcos A. · 2h       │ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │  [img]                   │ │
│ │  ACADÊMICO               │ │
│ │  Calendário 2026...      │ │
│ └──────────────────────────┘ │
├─────────────────────────────┤
│  Acesso Rápido               │
│ ┌──────────┐ ┌──────────┐   │
│ │ 📚       │ │ 📅       │   │  ← Grid 2x2
│ │ Biblioteca│ │ Calendário│  │
│ └──────────┘ └──────────┘   │
│ ┌──────────┐ ┌──────────┐   │
│ │ 🍽️       │ │ 📢       │   │
│ │ R.U.     │ │ Denúncias│   │
│ └──────────┘ └──────────┘   │
├─────────────────────────────┤
│ 🏠    🔍    📋    📣    👤  │  ← Bottom Nav 64px
└─────────────────────────────┘
```

---

### Card de Notícia — Anatomy

```
┌─────────────────────────────────────┐
│                                     │
│         [ IMAGEM 16/9 ]             │  ← border-radius: 12px 12px 0 0
│                                     │
├─────────────────────────────────────┤
│ MOVIMENTO  ·  3 min de leitura      │  ← overline / caption
│                                     │
│ Correnteza assume DCE da UERN       │  ← heading-md, Syne Bold
│ em eleição histórica                │
│                                     │
│ A vitória representa uma virada     │  ← body-sm, 2 linhas, line-clamp
│ histórica para os estudantes...     │
│                                     │
│ ─────────────────────────────────── │  ← divisor 1px
│ [Avatar] Marcos Alexandre  · Hoje   │  ← caption
└─────────────────────────────────────┘
```

---

### Estados do Botão Primário

```
[  ENTRAR NO GUIA  ]  ← default: azul sólido
[  ENTRAR NO GUIA  ]  ← hover: mais escuro + sombra
[ ENTRAR NO GUIA ↓ ]  ← active: mais escuro + sem sombra
[     ◌ ◌ ◌        ]  ← loading: spinner centralizado
[  ENTRAR NO GUIA  ]  ← disabled: opacidade 40%, cursor not-allowed
```

---

## Tokens CSS (Design Tokens)

```css
:root {
  /* === CORES === */
  --color-primary-900:    #001F5A;
  --color-primary-800:    #003087;
  --color-primary-700:    #0E3D7A;
  --color-primary-600:    #1A5FB4;
  --color-primary-500:    #2870D4;
  --color-primary-400:    #5A94E0;
  --color-primary-300:    #8AB6EC;
  --color-primary-200:    #BDD6F5;
  --color-primary-100:    #EBF5FF;

  --color-accent-600:     #B91C1C;
  --color-accent-500:     #E63946;
  --color-accent-400:     #F87171;
  --color-accent-100:     #FEE2E2;

  --color-neutral-950:    #0D1117;
  --color-neutral-900:    #1A202C;
  --color-neutral-800:    #374151;
  --color-neutral-600:    #6B7280;
  --color-neutral-400:    #C4C9D4;
  --color-neutral-200:    #E8EAED;
  --color-neutral-100:    #F8F9FC;
  --color-neutral-0:      #FFFFFF;

  /* === TIPOGRAFIA === */
  --font-display:         'Syne', system-ui, sans-serif;
  --font-body:            'Inter', system-ui, sans-serif;

  --text-display-xl:      clamp(32px, 8vw, 72px);
  --text-display-lg:      clamp(28px, 6vw, 56px);
  --text-heading-xl:      clamp(24px, 4vw, 40px);
  --text-heading-lg:      clamp(20px, 3vw, 32px);
  --text-heading-md:      clamp(18px, 2.5vw, 24px);
  --text-body-lg:         18px;
  --text-body-md:         16px;
  --text-body-sm:         14px;
  --text-caption:         12px;

  /* === ESPAÇAMENTO === */
  --space-1:    4px;
  --space-2:    8px;
  --space-3:    12px;
  --space-4:    16px;
  --space-5:    20px;
  --space-6:    24px;
  --space-8:    32px;
  --space-10:   40px;
  --space-12:   48px;
  --space-16:   64px;
  --space-20:   80px;
  --space-24:   96px;

  /* === BORDAS === */
  --radius-sm:    4px;
  --radius-md:    8px;
  --radius-lg:    12px;
  --radius-xl:    16px;
  --radius-2xl:   20px;
  --radius-full:  9999px;

  /* === SOMBRAS === */
  --shadow-sm:    0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06);
  --shadow-md:    0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
  --shadow-lg:    0 8px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.06);
  --shadow-xl:    0 16px 40px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.06);

  /* === MOTION === */
  --ease-default:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out:       cubic-bezier(0, 0, 0.2, 1);
  --ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast:  150ms;
  --duration-base:  250ms;
  --duration-slow:  400ms;
}
```

---

*Guia do UERNIANO — Design System v1.0*
*Movimento Correnteza × UERN · Mossoró, RN · 2026*
*Este documento é vivo e deve ser atualizado conforme o produto evolui.*
