/* Iconos del escritorio */
const iconsArea = document.getElementById('icons-area');
let selectedIcon = null;

function renderDesktop(chats) {
  iconsArea.innerHTML = '';
  chats.forEach((chat, idx) => {
    const el = document.createElement('div');
    el.className = 'desktop-icon';
    el.innerHTML = `
      <div class="icon-emoji">${chat.icono}</div>
      <div class="icon-label">${chat.titulo}</div>
    `;
    el.addEventListener('click', () => {
      if (selectedIcon) selectedIcon.classList.remove('selected');
      el.classList.add('selected');
      selectedIcon = el;
    });
    el.addEventListener('dblclick', () => openChat(idx));
    iconsArea.appendChild(el);
  });
}
