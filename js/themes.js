/* ============================================
   THEME SWITCHER — 8 visual themes
   ============================================ */

const THEMES = [
  {
    id: 'icarly-retro',
    name: 'iCarly Retro',
    emoji: 'A',
    color: '#b30079',
    description: 'Y2K neón, glitter, nostalgia 2009'
  },
  {
    id: 'icarly-modern',
    name: 'iCarly Modern',
    emoji: 'B',
    color: '#e91e8c',
    description: 'Rosa/cyan limpio y actual'
  },
  {
    id: 'diary',
    name: 'Diario Personal',
    emoji: 'C',
    color: '#ff6b6b',
    description: 'Blog intimista con capitulos'
  },
  {
    id: 'vhs',
    name: 'VHS Lo-fi',
    emoji: 'D',
    color: '#e94560',
    description: 'Cintas analogicas, scanlines'
  },
  {
    id: 'kawaii',
    name: 'Kawaii',
    emoji: 'E',
    color: '#ff69b4',
    description: 'Cute japones, stickers, sparkles'
  },
  {
    id: 'terminal',
    name: 'Terminal',
    emoji: 'F',
    color: '#00ff41',
    description: 'Hacker aesthetic, CLI'
  },
  {
    id: 'scrapbook',
    name: 'Scrapbook',
    emoji: 'G',
    color: '#c0392b',
    description: 'Collage hecho a mano, washi tape'
  },
  {
    id: 'magazine',
    name: 'Magazine',
    emoji: 'H',
    color: '#ff2d55',
    description: 'Editorial, revista digital'
  }
];

const DEFAULT_THEME = 'icarly-retro';
const STORAGE_KEY = 'diariobarbara-theme';

function getCurrentTheme() {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
}

function setTheme(themeId) {
  document.documentElement.setAttribute('data-theme', themeId);
  localStorage.setItem(STORAGE_KEY, themeId);
  updateThemePanel(themeId);
}

function updateThemePanel(activeId) {
  document.querySelectorAll('.theme-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.theme === activeId);
  });
}

function createThemeSwitcher() {
  const switcher = document.createElement('div');
  switcher.className = 'theme-switcher';

  const toggle = document.createElement('button');
  toggle.className = 'theme-switcher-toggle';
  toggle.setAttribute('aria-label', 'Cambiar tema');
  toggle.textContent = '\u{1F3A8}';
  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
  });

  const panel = document.createElement('div');
  panel.className = 'theme-panel';

  const title = document.createElement('div');
  title.className = 'theme-panel-title';
  title.textContent = 'Elige tu vibe';
  panel.appendChild(title);

  THEMES.forEach(theme => {
    const btn = document.createElement('button');
    btn.className = 'theme-option';
    btn.dataset.theme = theme.id;

    const dot = document.createElement('span');
    dot.className = 'theme-option-dot';
    dot.style.background = theme.color;

    const label = document.createElement('span');
    label.textContent = `${theme.emoji}. ${theme.name}`;

    btn.appendChild(dot);
    btn.appendChild(label);

    btn.addEventListener('click', () => {
      setTheme(theme.id);
      panel.classList.remove('open');
    });

    panel.appendChild(btn);
  });

  switcher.appendChild(panel);
  switcher.appendChild(toggle);

  // Close panel when clicking outside
  document.addEventListener('click', (e) => {
    if (!switcher.contains(e.target)) {
      panel.classList.remove('open');
    }
  });

  document.body.appendChild(switcher);
}

// Initialize theme on page load
function initTheme() {
  const saved = getCurrentTheme();
  setTheme(saved);
  createThemeSwitcher();
}

document.addEventListener('DOMContentLoaded', initTheme);
