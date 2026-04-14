/* ═══════════════════════════════
   Chat — carga datos, renderiza mensajes, controla ventana
═══════════════════════════════ */
const chatWindow = document.getElementById('chat-window');
const chatFrame = document.querySelector('.chat-frame');
const winTitlebar = document.querySelector('.win-titlebar');
const winClose = document.getElementById('win-close');
const winTitleName = document.getElementById('win-title-name');
const chatBody = document.getElementById('chat-body');
const chatStatus = document.getElementById('chat-status');
const chatMeta = document.getElementById('chat-meta');

let timeouts = [];
let chatData = null;

/* ═══════════════════════════════
   Drag — arrastrar ventana desde el header
═══════════════════════════════ */
let isDragging = false;
let dragOffset = { x: 0, y: 0 };

winTitlebar.addEventListener('mousedown', (e) => {
  if (e.target.closest('.win-btn-close')) return;
  isDragging = true;
  const rect = chatFrame.getBoundingClientRect();
  dragOffset.x = e.clientX - rect.left;
  dragOffset.y = e.clientY - rect.top;
  chatFrame.classList.add('dragged');
  e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const x = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 60));
  const y = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 40));
  chatFrame.style.left = x + 'px';
  chatFrame.style.top = y + 'px';
});

document.addEventListener('mouseup', () => { isDragging = false; });

/* ═══════════════════════════════
   Datos — cargar y arrancar
═══════════════════════════════ */
fetch('data.json')
  .then(r => r.json())
  .then(data => {
    chatData = data;
    renderDesktop(data.chats);
    if (data.chats.length > 0) openChat(data.chats.length - 1);
  });

/* ── abrir un chat ── */
function openChat(idx) {
  const chat = chatData.chats[idx];
  if (!chat) return;

  timeouts.forEach(clearTimeout);
  timeouts = [];
  chatBody.innerHTML = '';

  /* resetear posición al centro */
  chatFrame.classList.remove('dragged', 'needs-scroll');
  chatFrame.style.left = '';
  chatFrame.style.top = '';

  winTitleName.textContent = chat.titulo;
  chatWindow.classList.remove('closing');
  chatWindow.classList.add('visible');
  requestAnimationFrame(() => chatWindow.classList.add('open'));
  chatMeta.classList.remove('hidden');
  chatStatus.textContent = 'escribiendo...';

  let delay = 400;
  const msgs = chat.chat;

  msgs.forEach((msg, i) => {
    if (msg.emisor === 1 && i > 0) {
      timeouts.push(setTimeout(() => showTyping(), delay));
      delay += 700;
    }
    timeouts.push(setTimeout(() => {
      removeTyping();
      renderMessage(msg);
      if (i === msgs.length - 1) {
        chatMeta.classList.add('hidden');
      } else if (msgs[i + 1] && msgs[i + 1].emisor === 1) {
        chatStatus.textContent = 'escribiendo...';
      } else {
        chatStatus.textContent = 'en linea';
      }
    }, delay));
    delay += (typeof msg.contenido === 'string') ? 1600 : 1000;
  });
}

/* ── cerrar chat ── */
function closeChat() {
  if (!chatWindow.classList.contains('visible')) return;
  timeouts.forEach(clearTimeout);
  timeouts = [];
  chatWindow.classList.remove('open');
  chatWindow.classList.add('closing');
  chatFrame.addEventListener('animationend', () => {
    chatWindow.classList.remove('visible', 'closing');
  }, { once: true });
}

winClose.addEventListener('click', closeChat);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeChat(); });

/* ═══════════════════════════════
   Renderizar mensajes
═══════════════════════════════ */
const FULLSCREEN_SVG = `<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>`;
const AVATAR_SVG = `<svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#f8a4d0"/><circle cx="11" cy="14" r="2.2" fill="#3a2a2a"/><circle cx="21" cy="14" r="2.2" fill="#3a2a2a"/><ellipse cx="11" cy="13.2" rx="1" ry="0.5" fill="#fff" opacity="0.7"/><ellipse cx="21" cy="13.2" rx="1" ry="0.5" fill="#fff" opacity="0.7"/><path d="M12 20.5 Q16 24 20 20.5" stroke="#e05a7a" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="7" cy="18" r="2.5" fill="#f48fb1" opacity="0.4"/><circle cx="25" cy="18" r="2.5" fill="#f48fb1" opacity="0.4"/></svg>`;

function renderMessage(msg) {
  const isVideo = typeof msg.contenido === 'string' && /\.(webm|mp4)$/i.test(msg.contenido);
  const isBarb = msg.emisor === 1;

  if (isVideo) {
    const el = document.createElement('div');
    el.className = 'msg';
    const id = 'v' + Math.random().toString(36).substr(2, 5);
    el.innerHTML = `
      <div class="msg-av-sm">${AVATAR_SVG}</div>
      <div class="video-wrap">
        <div class="video-box" id="${id}">
          <video src="${msg.contenido}" preload="metadata" playsinline></video>
          <div class="vid-overlay"><div class="vid-play"></div></div>
          <button class="vid-fullscreen" title="Pantalla completa">${FULLSCREEN_SVG}</button>
        </div>
      </div>`;
    addMsg(el);
    setTimeout(() => bindVideo(id), 50);
  } else {
    const ps = Array.isArray(msg.contenido) ? msg.contenido : [msg.contenido];
    const el = document.createElement('div');
    el.className = `msg ${isBarb ? '' : 'user'}`;
    const bc = isBarb ? 'b-in' : 'b-out';
    const html = ps.map(p => `<p>${p}</p>`).join('');
    el.innerHTML = isBarb
      ? `<div class="msg-av-sm">${AVATAR_SVG}</div><div class="bubble ${bc}">${html}</div>`
      : `<div class="bubble ${bc}">${html}</div>`;
    addMsg(el);
  }
}

/* ── vincular eventos de video (play/pause + fullscreen) ── */
function bindVideo(id) {
  const box = document.getElementById(id);
  if (!box) return;
  const v = box.querySelector('video');
  const o = box.querySelector('.vid-overlay');
  const fs = box.querySelector('.vid-fullscreen');

  /* click en overlay → play/pause */
  o.onclick = (e) => {
    e.stopPropagation();
    v.paused ? (v.play(), o.style.opacity = '0') : (v.pause(), o.style.opacity = '1');
  };
  v.onclick = (e) => {
    e.stopPropagation();
    v.paused ? (v.play(), o.style.opacity = '0') : (v.pause(), o.style.opacity = '1');
  };
  v.onended = () => { o.style.opacity = '1'; };

  /* botón fullscreen */
  fs.onclick = (e) => {
    e.stopPropagation();
    if (v.requestFullscreen) v.requestFullscreen();
    else if (v.webkitRequestFullscreen) v.webkitRequestFullscreen();
    else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen(); // iOS
  };
}

/* ── añadir mensaje al DOM con animación ── */
function addMsg(el) {
  el.classList.add('msg-enter');
  chatBody.appendChild(el);
  el.offsetHeight; // forzar reflow
  el.classList.add('msg-enter-active');
  /* detectar si necesita scroll */
  if (!chatFrame.classList.contains('needs-scroll') && chatBody.scrollHeight > chatBody.clientHeight) {
    chatFrame.classList.add('needs-scroll');
  }
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
}

/* ═══════════════════════════════
   Indicador de "escribiendo..."
═══════════════════════════════ */
function showTyping() {
  removeTyping();
  const el = document.createElement('div');
  el.className = 'msg';
  el.id = 'typing-ind';
  el.innerHTML = `
    <div class="msg-av-sm">${AVATAR_SVG}</div>
    <div class="bubble b-in typing-wrap">
      <div class="t-dot" style="animation:bounce-dot .5s ease-in-out infinite"></div>
      <div class="t-dot" style="animation:bounce-dot .5s ease-in-out .12s infinite"></div>
      <div class="t-dot" style="animation:bounce-dot .5s ease-in-out .24s infinite"></div>
    </div>`;
  addMsg(el);
}

function removeTyping() {
  const e = document.getElementById('typing-ind');
  if (e) e.remove();
}
