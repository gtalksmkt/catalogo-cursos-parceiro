# Catálogo de cursos parceiro

Novo visual da página de catálogo dos embaixadores/parceiros da Emergency Talks
(`emergencytalks.com.br/parceiro/<nome>/`), baseado no design do site oficial do Grupo Talks
(`grupotalks.com.br/nossos-cursos/`): fundo preto→vinho, cards de vidro, botões vermelhos em
pílula, fonte Linear Grotesk.

A página é gerada por um plugin do WordPress. O redesign **não altera o HTML do plugin**: é só
CSS por cima, mais um pequeno script para as descrições das divisões e o balão do WhatsApp.

## Arquivos

| Arquivo | Para quê |
| --- | --- |
| `parceiro-redesign.css` | O visual novo. **Vai para o WordPress.** |
| `parceiro-redesign.js` | Descrição de cada divisão + balão "Está com alguma dúvida?" no WhatsApp. **Vai para o WordPress.** |
| `assets/fonts/` | **Não está neste repositório** (a Linear Grotesk é uma fonte paga). Ficam só na máquina da equipe: Regular, Medium, Bold e Black, as mesmas usadas no site do Grupo Talks. |
| `assets/logo-emergency-talks.webp` | Logo, usada só na prévia local. |
| `index.html` + `plugin-base.css` | Prévia local da página inteira (com os 12 produtos). `plugin-base.css` é uma cópia do CSS atual do plugin e **não** vai para o WordPress. |

## Como aplicar no WordPress

1. **CSS:** colar o conteúdo de `parceiro-redesign.css` em *Aparência → Personalizar → CSS adicional*.
2. **Fontes:** subir os 4 `.ttf` da Linear Grotesk (os mesmos arquivos do site do Grupo Talks) na
   biblioteca de mídia e trocar as URLs `assets/fonts/...` no início do CSS pelas URLs de lá. (O
   servidor do grupotalks.com.br não libera a fonte para outro domínio, por isso não dá para
   apontar direto para ele. Sem isso a página usa uma fonte parecida.)
3. **JS:** colar o conteúdo de `parceiro-redesign.js` num script de rodapé (Elementor Pro →
   *Custom Code*, ou plugin de snippets). Sem ele a página funciona igual, só não mostra as
   descrições nem o balão.

O CSS vale para a página de **todos** os parceiros.

## Editar textos

No topo de `parceiro-redesign.js`:

- `CATEGORY_DESCRIPTIONS` — descrição de cada divisão (casa pelo nome: on-line / TEME / TEMI).
  Para uma divisão nova (Presenciais, Gratuitos…), acrescentar uma linha.
- `BUBBLE_TITLE`, `BUBBLE_TEXT`, `BUBBLE_EMOJI` — texto e emoji do balão (😊, ou 💡 se preferir).
- `SHOW_AFTER_MS` / `HIDE_AFTER_MS` — quando o balão aparece e quanto tempo fica (6 s / 14 s).

## Prévia local

Abrir `index.html` direto no navegador, ou servir a pasta com qualquer servidor estático.

## Cores e medidas (do site oficial)

- Botão "Comprar": `linear-gradient(#b70412 → #d31c2b)`, pílula de 43px.
- Botão "Saiba mais": contorno `#b70412`.
- Cards dos banners: raio 21–24px.
- Fonte: Linear Grotesk.
