/* ==========================================================================
   Emergency Talks — Catálogo de parceiros
   1) Descrição curta embaixo do título de cada divisão
   2) Balão "Está com alguma dúvida?" ao lado do botão de WhatsApp

   Não depende de nada: carrega sozinho, não mexe no HTML do plugin além de
   inserir os textos, e se o botão de WhatsApp não existir simplesmente não
   mostra o balão.
   ========================================================================== */
(function () {
  'use strict';

  /* ---- Textos (edite aqui) ------------------------------------------------ */
  var CATEGORY_DESCRIPTIONS = [
    { match: /on-?line/i,
      text: 'Cursos virtuais para você assistir de onde quiser, voltados para a prática médica e sempre atualizados.' },
    { match: /\bteme\b/i,
      text: 'Escolha a modalidade do preparatório que vai te levar ao título de especialista em Medicina de Emergência.' },
    { match: /\btemi\b/i,
      text: 'Escolha a modalidade do preparatório que vai te levar ao título de especialista em Medicina Intensiva.' }
  ];

  var BUBBLE_TITLE   = 'Está com alguma dúvida?';
  var BUBBLE_TEXT    = 'Fale com a gente ';
  var BUBBLE_EMOJI   = '😊';          // troque por 💡 se preferir
  var SHOW_AFTER_MS  = 6000;          // quanto tempo até o balão aparecer
  var HIDE_AFTER_MS  = 14000;         // quanto tempo ele fica na tela (0 = até fechar)
  var DISMISS_KEY    = 'et-wa-bubble-dismissed';

  /* ---- 1) Descrições das divisões ---------------------------------------- */
  function addCategoryDescriptions() {
    var titles = document.querySelectorAll('.vp-showcase__section-title');
    Array.prototype.forEach.call(titles, function (title) {
      var next = title.nextElementSibling;
      if (next && next.classList.contains('vp-showcase__section-desc')) return;

      var label = title.textContent || '';
      for (var i = 0; i < CATEGORY_DESCRIPTIONS.length; i++) {
        if (CATEGORY_DESCRIPTIONS[i].match.test(label)) {
          var p = document.createElement('p');
          p.className = 'vp-showcase__section-desc';
          p.textContent = CATEGORY_DESCRIPTIONS[i].text;
          title.insertAdjacentElement('afterend', p);
          return;
        }
      }
    });
  }

  /* ---- 2) Balão do WhatsApp ---------------------------------------------- */
  function wasDismissed() {
    try { return window.sessionStorage.getItem(DISMISS_KEY) === '1'; } catch (e) { return false; }
  }
  function rememberDismissed() {
    try { window.sessionStorage.setItem(DISMISS_KEY, '1'); } catch (e) { /* sem storage: tudo bem */ }
  }

  function findWhatsAppButton() {
    return document.querySelector('.e-contact-buttons__chat-button, .et-wa');
  }

  function showWhatsAppBubble() {
    var button = findWhatsAppButton();
    if (!button || wasDismissed()) return;

    var bubble = document.createElement('div');
    bubble.className = 'et-wa-bubble';
    bubble.setAttribute('role', 'status');

    var link = document.createElement('a');
    link.className = 'et-wa-bubble__link';
    link.href = button.href || 'https://wa.me/5585998302705';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    var strong = document.createElement('strong');
    strong.textContent = BUBBLE_TITLE;
    var emoji = document.createElement('span');
    emoji.className = 'et-wa-bubble__emoji';
    emoji.setAttribute('aria-hidden', 'true');
    emoji.textContent = BUBBLE_EMOJI;
    link.appendChild(strong);
    link.appendChild(document.createTextNode(BUBBLE_TEXT));
    link.appendChild(emoji);

    var close = document.createElement('button');
    close.type = 'button';
    close.className = 'et-wa-bubble__close';
    close.setAttribute('aria-label', 'Fechar');
    close.innerHTML = '&times;';

    bubble.appendChild(link);
    bubble.appendChild(close);
    document.body.appendChild(bubble);

    function place() {
      var r = button.getBoundingClientRect();
      var vw = document.documentElement.clientWidth;
      bubble.style.right = Math.max(12, vw - r.left + 14) + 'px';
      bubble.style.bottom = Math.max(12, window.innerHeight - r.bottom + 2) + 'px';
      bubble.style.maxWidth = Math.max(160, Math.min(300, r.left - 14 - 12)) + 'px';
    }

    var hideTimer;
    function hide(remember) {
      window.clearTimeout(hideTimer);
      window.removeEventListener('resize', place);
      document.removeEventListener('keydown', onKey);
      button.classList.remove('et-wa-nudge');
      bubble.classList.remove('is-visible');
      if (remember) rememberDismissed();
      window.setTimeout(function () {
        if (bubble.parentNode) bubble.parentNode.removeChild(bubble);
      }, 350);
    }
    function onKey(e) { if (e.key === 'Escape') hide(true); }

    place();
    window.addEventListener('resize', place);
    document.addEventListener('keydown', onKey);
    close.addEventListener('click', function () { hide(true); });
    link.addEventListener('click', function () { rememberDismissed(); });

    // dois frames para a transição de entrada rodar
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        bubble.classList.add('is-visible');
        button.classList.add('et-wa-nudge');
      });
    });
    if (HIDE_AFTER_MS > 0) hideTimer = window.setTimeout(function () { hide(false); }, HIDE_AFTER_MS);
  }

  /* ---- Início ------------------------------------------------------------- */
  function init() {
    addCategoryDescriptions();
    window.setTimeout(showWhatsAppBubble, SHOW_AFTER_MS);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
