/* ═══════════════════════════════
   Caritas — set kawaii Y2K de Barbara
   Cada key es una emoción/concepto. El SVG está pensado para
   renderizarse dentro de un cuadrado amarillo con borde negro
   (ver .msg-av-sm en css/chat.css o .face-box en caritas.html),
   pero también funciona aislado.

   Uso:
   - Como avatar (cards del portal, header del chat): CARITAS.feliz
   - Como inline en mensajes: parseInlineCaritas() en js/chat.js
     reemplaza :feliz:, :timida:, etc. dentro del texto.

   Para ver el set completo: abrir caritas.html
═══════════════════════════════ */

const CARITAS = {

  feliz: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><circle cx="11" cy="14" r="2.2" fill="#1a0f08"/><circle cx="21" cy="14" r="2.2" fill="#1a0f08"/><ellipse cx="11" cy="13.2" rx="1" ry="0.5" fill="#fff" opacity="0.85"/><ellipse cx="21" cy="13.2" rx="1" ry="0.5" fill="#fff" opacity="0.85"/><path d="M12 20.5 Q16 24 20 20.5" stroke="#b8420c" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="7" cy="18" r="2.5" fill="#e85a13" opacity="0.55"/><circle cx="25" cy="18" r="2.5" fill="#e85a13" opacity="0.55"/></svg>`,

  risueña: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><circle cx="11" cy="14" r="2.2" fill="#1a0f08"/><circle cx="21" cy="14" r="2.2" fill="#1a0f08"/><ellipse cx="11" cy="13.2" rx="1" ry="0.5" fill="#fff" opacity="0.85"/><ellipse cx="21" cy="13.2" rx="1" ry="0.5" fill="#fff" opacity="0.85"/><path d="M9 19 Q16 27 23 19 Q16 24 9 19 Z" fill="#b8420c"/><circle cx="7" cy="20" r="2.5" fill="#e85a13" opacity="0.55"/><circle cx="25" cy="20" r="2.5" fill="#e85a13" opacity="0.55"/></svg>`,

  muyfeliz: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><path d="M7 14 Q11 10 15 14" stroke="#1a0f08" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M17 14 Q21 10 25 14" stroke="#1a0f08" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M9 19 Q16 27 23 19 Q16 24 9 19 Z" fill="#b8420c"/><circle cx="7" cy="20" r="2.5" fill="#e85a13" opacity="0.55"/><circle cx="25" cy="20" r="2.5" fill="#e85a13" opacity="0.55"/></svg>`,

  timida: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><circle cx="11" cy="15" r="1.5" fill="#1a0f08"/><circle cx="21" cy="15" r="1.5" fill="#1a0f08"/><path d="M13 22 Q16 23.5 19 22" stroke="#b8420c" stroke-width="1.4" fill="none" stroke-linecap="round"/><circle cx="6" cy="18" r="3" fill="#ff6b1a" opacity="0.75"/><circle cx="26" cy="18" r="3" fill="#ff6b1a" opacity="0.75"/><line x1="2.5" y1="15.5" x2="4.5" y2="14.5" stroke="#ff6b1a" stroke-width="0.9" stroke-linecap="round"/><line x1="29.5" y1="14.5" x2="27.5" y2="15.5" stroke="#ff6b1a" stroke-width="0.9" stroke-linecap="round"/></svg>`,

  enamorada: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><path d="M11 13 C9.5 11.5 7.5 12 7.5 14 C7.5 15.8 11 17.2 11 17.2 C11 17.2 14.5 15.8 14.5 14 C14.5 12 12.5 11.5 11 13 Z" fill="#d12d3d"/><path d="M21 13 C19.5 11.5 17.5 12 17.5 14 C17.5 15.8 21 17.2 21 17.2 C21 17.2 24.5 15.8 24.5 14 C24.5 12 22.5 11.5 21 13 Z" fill="#d12d3d"/><path d="M12 20.5 Q16 24 20 20.5" stroke="#b8420c" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="7" cy="20" r="2.5" fill="#ff6b1a" opacity="0.6"/><circle cx="25" cy="20" r="2.5" fill="#ff6b1a" opacity="0.6"/></svg>`,

  estrellada: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><path d="M11 11 L11.7 13.4 L14.2 14 L11.7 14.6 L11 17 L10.3 14.6 L7.8 14 L10.3 13.4 Z" fill="#1a0f08"/><path d="M21 11 L21.7 13.4 L24.2 14 L21.7 14.6 L21 17 L20.3 14.6 L17.8 14 L20.3 13.4 Z" fill="#1a0f08"/><path d="M10 20.5 Q16 26 22 20.5" stroke="#b8420c" stroke-width="1.7" fill="none" stroke-linecap="round"/><circle cx="7" cy="20" r="2.3" fill="#e85a13" opacity="0.55"/><circle cx="25" cy="20" r="2.3" fill="#e85a13" opacity="0.55"/></svg>`,

  triste: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><circle cx="11" cy="14" r="2.2" fill="#1a0f08"/><circle cx="21" cy="14" r="2.2" fill="#1a0f08"/><ellipse cx="11" cy="13.2" rx="1" ry="0.5" fill="#fff" opacity="0.85"/><ellipse cx="21" cy="13.2" rx="1" ry="0.5" fill="#fff" opacity="0.85"/><path d="M12 23 Q16 20 20 23" stroke="#b8420c" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`,

  llorando: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><circle cx="11" cy="14" r="2.2" fill="#1a0f08"/><circle cx="21" cy="14" r="2.2" fill="#1a0f08"/><path d="M11 16 Q10 18 9 19.5 Q10 20.5 11 19.5 Q11.3 17.5 11 16 Z" fill="#4ab3e8" stroke="#2a7aa8" stroke-width="0.4"/><path d="M21 16 Q22 18 23 19.5 Q22 20.5 21 19.5 Q20.7 17.5 21 16 Z" fill="#4ab3e8" stroke="#2a7aa8" stroke-width="0.4"/><path d="M12 22.5 Q14 21 16 22 Q18 23 20 22.5" stroke="#b8420c" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>`,

  /* dormida — Zs reposicionados para que queden dentro del viewBox */
  dormida: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><path d="M8 14 Q11 16 14 14" stroke="#1a0f08" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M18 14 Q21 16 24 14" stroke="#1a0f08" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M13 22 Q16 23 19 22" stroke="#b8420c" stroke-width="1.3" fill="none" stroke-linecap="round"/><text x="20" y="11" font-family="Tahoma" font-size="6" font-weight="700" fill="#1a0f08">z</text><text x="24.5" y="7.5" font-family="Tahoma" font-size="4.5" font-weight="700" fill="#1a0f08">z</text></svg>`,

  enfadada: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><line x1="7.5" y1="10" x2="13" y2="13" stroke="#1a0f08" stroke-width="1.7" stroke-linecap="round"/><line x1="24.5" y1="10" x2="19" y2="13" stroke="#1a0f08" stroke-width="1.7" stroke-linecap="round"/><circle cx="11" cy="15" r="2.2" fill="#1a0f08"/><circle cx="21" cy="15" r="2.2" fill="#1a0f08"/><line x1="12" y1="22" x2="20" y2="22" stroke="#b8420c" stroke-width="1.6" stroke-linecap="round"/></svg>`,

  sorprendida: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><circle cx="11" cy="14" r="3" fill="#fff" stroke="#1a0f08" stroke-width="1.2"/><circle cx="11" cy="14" r="1.4" fill="#1a0f08"/><circle cx="21" cy="14" r="3" fill="#fff" stroke="#1a0f08" stroke-width="1.2"/><circle cx="21" cy="14" r="1.4" fill="#1a0f08"/><ellipse cx="16" cy="22" rx="2.2" ry="2.7" fill="#1a0f08"/></svg>`,

  guino: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><path d="M7 14 Q11 11 15 14" stroke="#1a0f08" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="21" cy="14" r="2.2" fill="#1a0f08"/><ellipse cx="21" cy="13.2" rx="1" ry="0.5" fill="#fff" opacity="0.85"/><path d="M12 20.5 Q16 24 20 20.5" stroke="#b8420c" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="7" cy="20" r="2.3" fill="#e85a13" opacity="0.55"/><circle cx="25" cy="20" r="2.3" fill="#e85a13" opacity="0.55"/></svg>`,

  risa: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><path d="M8 12 L13 15 L8 16" stroke="#1a0f08" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 12 L19 15 L24 16" stroke="#1a0f08" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 19 Q16 27 23 19 Q16 24 9 19 Z" fill="#b8420c"/><circle cx="7" cy="20" r="2.5" fill="#ff6b1a" opacity="0.6"/><circle cx="25" cy="20" r="2.5" fill="#ff6b1a" opacity="0.6"/></svg>`,

  pensativa: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><circle cx="11" cy="14" r="2.5" fill="#fff" stroke="#1a0f08" stroke-width="1"/><circle cx="9.8" cy="13" r="1.4" fill="#1a0f08"/><circle cx="21" cy="14" r="2.5" fill="#fff" stroke="#1a0f08" stroke-width="1"/><circle cx="19.8" cy="13" r="1.4" fill="#1a0f08"/><line x1="13" y1="22" x2="20" y2="22" stroke="#b8420c" stroke-width="1.5" stroke-linecap="round"/></svg>`,

  mareada: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><circle cx="11" cy="14" r="3" fill="none" stroke="#1a0f08" stroke-width="0.7"/><circle cx="11" cy="14" r="1.6" fill="none" stroke="#1a0f08" stroke-width="0.7"/><circle cx="11" cy="14" r="0.6" fill="#1a0f08"/><circle cx="21" cy="14" r="3" fill="none" stroke="#1a0f08" stroke-width="0.7"/><circle cx="21" cy="14" r="1.6" fill="none" stroke="#1a0f08" stroke-width="0.7"/><circle cx="21" cy="14" r="0.6" fill="#1a0f08"/><path d="M11 22 Q13.5 20.5 16 22 Q18.5 23.5 21 22" stroke="#b8420c" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`,

  silenciosa: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><circle cx="11" cy="14" r="2.2" fill="#1a0f08"/><circle cx="21" cy="14" r="2.2" fill="#1a0f08"/><ellipse cx="11" cy="13.2" rx="1" ry="0.5" fill="#fff" opacity="0.85"/><ellipse cx="21" cy="13.2" rx="1" ry="0.5" fill="#fff" opacity="0.85"/><line x1="13" y1="22" x2="19" y2="22" stroke="#1a0f08" stroke-width="1.4" stroke-linecap="round"/></svg>`,

  /* ñam — lengua reposicionada para que quede dentro del círculo */
  nam: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><circle cx="11" cy="14" r="2.2" fill="#1a0f08"/><circle cx="21" cy="14" r="2.2" fill="#1a0f08"/><ellipse cx="11" cy="13.2" rx="1" ry="0.5" fill="#fff" opacity="0.85"/><ellipse cx="21" cy="13.2" rx="1" ry="0.5" fill="#fff" opacity="0.85"/><path d="M11 19.5 Q16 24.5 21 19.5" stroke="#b8420c" stroke-width="1.4" fill="none" stroke-linecap="round"/><ellipse cx="18.5" cy="22" rx="2" ry="2.2" fill="#ff6b9b" stroke="#b8420c" stroke-width="0.6"/><line x1="18.5" y1="20.5" x2="18.5" y2="23.5" stroke="#b8420c" stroke-width="0.5"/><circle cx="7" cy="20" r="2.3" fill="#e85a13" opacity="0.55"/><circle cx="25" cy="20" r="2.3" fill="#e85a13" opacity="0.55"/></svg>`,

  cool: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><rect x="5.5" y="11" width="8.5" height="6" rx="1.5" fill="#1a0f08"/><rect x="18" y="11" width="8.5" height="6" rx="1.5" fill="#1a0f08"/><line x1="14" y1="14" x2="18" y2="14" stroke="#1a0f08" stroke-width="1.4"/><rect x="6.5" y="12" width="2.6" height="2" fill="#fff" opacity="0.7"/><rect x="19" y="12" width="2.6" height="2" fill="#fff" opacity="0.7"/><path d="M12 22 Q16 25 20 22" stroke="#b8420c" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`,

  nerviosa: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><circle cx="11" cy="14" r="1.8" fill="#1a0f08"/><circle cx="21" cy="14" r="1.8" fill="#1a0f08"/><path d="M12 22 Q14 23 16 22 Q18 21 20 22" stroke="#b8420c" stroke-width="1.4" fill="none" stroke-linecap="round"/><path d="M27 11 C26 13.5 25.5 15.5 26.5 16.5 C27.6 17.5 28.5 16.5 28.5 15.5 C28.5 14 28 12.4 27 11 Z" fill="#4ab3e8" stroke="#2a7aa8" stroke-width="0.5"/></svg>`,

  traviesa: `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#ffd338"/><path d="M7 10 Q11 8.5 14 11" stroke="#1a0f08" stroke-width="1.6" fill="none" stroke-linecap="round"/><line x1="18" y1="11" x2="24.5" y2="11" stroke="#1a0f08" stroke-width="1.6" stroke-linecap="round"/><circle cx="11" cy="14.5" r="1.8" fill="#1a0f08"/><circle cx="21" cy="14.5" r="1.8" fill="#1a0f08"/><path d="M11 21 Q14 23.5 18 22 Q19.5 21 21 21.5" stroke="#b8420c" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>`
};

/* ── Reemplaza :tags: en un string por la carita inline correspondiente ── */
function parseInlineCaritas(text) {
  return text.replace(/:([a-z]+):/g, (match, key) => {
    if (CARITAS[key]) {
      return `<span class="inline-carita">${CARITAS[key]}</span>`;
    }
    return match;
  });
}
