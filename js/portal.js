/* ═══════════════════════════════
   Portal — render de paneles de capítulos del diario
   Carga data.json + assets/icons/index.json y dibuja la cuadrícula.
   Cada panel es un capítulo; al hacer click invoca openChat(idx),
   que está definido en js/chat.js.
═══════════════════════════════ */
const chaptersGrid = document.getElementById('chapters-grid');
const topbarDate = document.getElementById('topbar-date');
let iconIndex = null;

/* Cargar índice de iconos (se mantiene para los thumbnails de las cards) */
const iconIndexReady = fetch('assets/icons/index.json')
  .then(r => r.json())
  .then(idx => { iconIndex = idx; })
  .catch(() => { iconIndex = {}; });

function getIconSrc(key) {
  if (iconIndex && iconIndex[key]) {
    return 'assets/icons/' + iconIndex[key].file;
  }
  return null;
}

/* ── primer mensaje de texto del chat (para preview de la card) ── */
function firstTextPreview(chat) {
  const msg = chat.find(m => Array.isArray(m.contenido) || (typeof m.contenido === 'string' && !/\.(webm|mp4)$/i.test(m.contenido)));
  if (!msg) return '...';
  const text = Array.isArray(msg.contenido) ? msg.contenido[0] : msg.contenido;
  return text.length > 70 ? text.slice(0, 67) + '...' : text;
}

/* ── formatear fecha estilo Y2K (MAR 15 · 26) ── */
const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
function formatDateY2K(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return `${MESES[d.getMonth()]} ${String(d.getDate()).padStart(2,'0')} · ${String(d.getFullYear()).slice(-2)}`;
}

/* ── renderizar paneles del portal ── */
function renderDesktop(chats) {
  chaptersGrid.innerHTML = '';
  chats.forEach((chat, idx) => {
    const el = document.createElement('div');
    el.className = 'chapter-card';

    const iconSrc = getIconSrc(chat.icono);
    const iconHtml = iconSrc
      ? `<img src="${iconSrc}" alt="${chat.icono}" draggable="false">`
      : `<span class="emoji-fallback">${chat.icono}</span>`;

    const epNum = String(idx + 1).padStart(2, '0');
    const fecha = formatDateY2K(chat.fecha || '');
    const preview = firstTextPreview(chat.chat);

    el.innerHTML = `
      <div class="chapter-card-head">
        <span>EP. ${epNum}</span>
        <span>${fecha}</span>
      </div>
      <div class="chapter-card-icon">${iconHtml}</div>
      <div class="chapter-card-title">${chat.titulo}</div>
      <div class="chapter-card-preview">"${preview}"</div>
      <div class="chapter-card-cta">entrar ›</div>
    `;
    el.addEventListener('click', () => openChat(idx));
    chaptersGrid.appendChild(el);
  });

  /* fecha del topbar = fecha del último capítulo */
  if (topbarDate && chats.length) {
    const last = chats[chats.length - 1];
    topbarDate.textContent = formatDateY2K(last.fecha || '');
  }
}
