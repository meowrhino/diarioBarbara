/* Iconos del escritorio */
const iconsArea = document.getElementById('icons-area');
let selectedIcon = null;
let iconIndex = null;

/* Cargar índice de iconos */
fetch('assets/icons/index.json')
  .then(r => r.json())
  .then(idx => { iconIndex = idx; });

function getIconSrc(key) {
  if (iconIndex && iconIndex[key]) {
    return 'assets/icons/' + iconIndex[key].file;
  }
  return null;
}

function renderDesktop(chats) {
  iconsArea.innerHTML = '';
  chats.forEach((chat, idx) => {
    const el = document.createElement('div');
    el.className = 'desktop-icon';

    const iconSrc = getIconSrc(chat.icono);
    const iconHtml = iconSrc
      ? `<img class="icon-img" src="${iconSrc}" alt="${chat.icono}" draggable="false">`
      : `<div class="icon-emoji">${chat.icono}</div>`;

    el.innerHTML = `
      ${iconHtml}
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
