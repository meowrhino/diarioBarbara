/* Ventana de chat */
const chatWindow = document.getElementById('chat-window');
const chatBody = document.getElementById('chat-body');
const taskItem = document.getElementById('task-item');

let timeouts = [];
let chatData = null;

/* Cargar datos y arrancar */
fetch('data.json')
  .then(r => r.json())
  .then(data => {
    chatData = data;
    renderDesktop(data.chats);
    if (data.chats.length > 0) openChat(data.chats.length - 1);
  });

/* Abrir un chat */
function openChat(idx) {
  const chat = chatData.chats[idx];
  if (!chat) return;

  timeouts.forEach(clearTimeout);
  timeouts = [];
  chatBody.innerHTML = '';

  taskItem.textContent = '\u{1F4AC} ' + chat.titulo;
  taskItem.classList.add('visible', 'active');
  chatWindow.classList.add('open');

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
    }, delay));
    delay += (typeof msg.contenido === 'string') ? 1600 : 1000;
  });
}

/* Cerrar chat */
function closeChat() {
  chatWindow.classList.remove('open');
  taskItem.classList.remove('visible', 'active');
  timeouts.forEach(clearTimeout);
  timeouts = [];
}

taskItem.addEventListener('click', () => {
  if (chatWindow.classList.contains('open')) closeChat();
  else chatWindow.classList.add('open');
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeChat(); });

/* Renderizar un mensaje */
function renderMessage(msg) {
  const isVideo = typeof msg.contenido === 'string' && /\.(webm|mp4)$/i.test(msg.contenido);
  const isBarb = msg.emisor === 1;

  if (isVideo) {
    const el = document.createElement('div');
    el.className = 'msg';
    const id = 'v' + Math.random().toString(36).substr(2, 5);
    el.innerHTML = `
      <div class="msg-av-sm">\u{1F338}</div>
      <div class="video-wrap">
        <div class="video-box" id="${id}">
          <video src="${msg.contenido}" preload="metadata" playsinline></video>
          <div class="vid-overlay"><div class="vid-play"></div></div>
        </div>
      </div>`;
    addMsg(el);
    setTimeout(() => {
      const box = document.getElementById(id);
      if (!box) return;
      const v = box.querySelector('video');
      const o = box.querySelector('.vid-overlay');
      box.onclick = () => {
        v.paused ? (v.play(), o.style.opacity = '0') : (v.pause(), o.style.opacity = '1');
      };
      v.onended = () => { o.style.opacity = '1'; };
    }, 50);
  } else {
    const ps = Array.isArray(msg.contenido) ? msg.contenido : [msg.contenido];
    const el = document.createElement('div');
    el.className = `msg ${isBarb ? '' : 'user'}`;
    const bc = isBarb ? 'b-in' : 'b-out';
    const html = ps.map(p => `<p>${p}</p>`).join('');
    el.innerHTML = isBarb
      ? `<div class="msg-av-sm">\u{1F338}</div><div class="bubble ${bc}">${html}</div>`
      : `<div class="bubble ${bc}">${html}</div>`;
    addMsg(el);
  }
}

function addMsg(el) {
  el.classList.add('msg-enter');
  chatBody.appendChild(el);
  el.offsetHeight; // force reflow
  el.classList.add('msg-enter-active');
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
}

/* Indicador de "escribiendo..." */
function showTyping() {
  removeTyping();
  const el = document.createElement('div');
  el.className = 'msg';
  el.id = 'typing-ind';
  el.innerHTML = `
    <div class="msg-av-sm">\u{1F338}</div>
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
