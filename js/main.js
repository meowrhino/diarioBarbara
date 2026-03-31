/* ============================================
   MAIN.JS — Video loading + interactivity
   ============================================ */

const DATA_URL = 'videos/data.json';

/* ── Load and render videos ── */
async function loadVideos() {
  try {
    const res = await fetch(DATA_URL);
    const data = await res.json();
    renderFeatured(data.videos);
    renderGrid(data.videos);
  } catch (err) {
    console.warn('No se pudo cargar data.json, usando datos demo:', err);
    renderEmptyState();
  }
}

function renderFeatured(videos) {
  if (!videos.length) return;

  const latest = videos[videos.length - 1];
  const player = document.getElementById('featured-player');
  const title = document.getElementById('featured-title');
  const date = document.getElementById('featured-date');
  const desc = document.getElementById('featured-description');
  const note = document.getElementById('featured-note');

  if (latest.file) {
    player.querySelector('source').src = latest.file;
    player.load();
  }

  if (latest.thumbnail) {
    player.poster = latest.thumbnail;
  }

  title.textContent = `Cap. ${latest.chapter} — ${latest.title}`;
  date.textContent = formatDate(latest.date);
  desc.textContent = latest.description;

  if (latest.note) {
    note.textContent = `"${latest.note}"`;
  }
}

function renderGrid(videos) {
  const grid = document.getElementById('video-grid');
  grid.innerHTML = '';

  const sorted = [...videos].reverse();

  sorted.forEach(video => {
    const card = createVideoCard(video);
    grid.appendChild(card);
  });
}

function createVideoCard(video) {
  const card = document.createElement('article');
  card.className = 'video-card';

  const thumbnailSrc = video.thumbnail || createPlaceholderThumbnail(video.chapter);

  card.innerHTML = `
    <div class="video-card-thumbnail">
      <img src="${thumbnailSrc}" alt="${video.title}" loading="lazy"
           onerror="this.src='${createPlaceholderThumbnail(video.chapter)}'">
      <span class="video-card-duration">${video.duration}</span>
    </div>
    <div class="video-card-body">
      <h3 class="video-card-title">${video.title}</h3>
      <div class="video-card-meta">
        <span class="video-card-chapter">Cap. ${video.chapter}</span>
        <span class="video-card-date">${formatDate(video.date)}</span>
      </div>
      ${video.tags ? `<div style="margin-top: var(--space-sm); display: flex; gap: 4px; flex-wrap: wrap;">
        ${video.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>` : ''}
    </div>
  `;

  card.addEventListener('click', () => {
    scrollToFeatured(video);
  });

  return card;
}

function scrollToFeatured(video) {
  const player = document.getElementById('featured-player');
  const title = document.getElementById('featured-title');
  const date = document.getElementById('featured-date');
  const desc = document.getElementById('featured-description');
  const note = document.getElementById('featured-note');

  if (video.file) {
    player.querySelector('source').src = video.file;
    player.load();
  }

  if (video.thumbnail) {
    player.poster = video.thumbnail;
  }

  title.textContent = `Cap. ${video.chapter} — ${video.title}`;
  date.textContent = formatDate(video.date);
  desc.textContent = video.description;
  note.textContent = video.note ? `"${video.note}"` : '';

  document.getElementById('featured-video').scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

function renderEmptyState() {
  const grid = document.getElementById('video-grid');
  grid.innerHTML = `
    <div class="empty-state" style="grid-column: 1 / -1;">
      <h3>Aun no hay videos</h3>
      <p>Barbara esta preparando su primer video. Vuelve pronto.</p>
    </div>
  `;
}

/* ── Placeholder thumbnail (SVG data URI) ── */
function createPlaceholderThumbnail(chapter) {
  const colors = ['#b30079', '#e91e8c', '#ff6b6b', '#e94560', '#ff69b4', '#00ff41', '#c0392b', '#ff2d55'];
  const color = colors[(chapter - 1) % colors.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
    <rect fill="${color}" width="640" height="360" opacity="0.15"/>
    <rect fill="${color}" width="640" height="360" opacity="0.08"/>
    <text x="320" y="170" text-anchor="middle" font-family="sans-serif" font-size="48" fill="${color}" opacity="0.6">Cap. ${chapter}</text>
    <text x="320" y="210" text-anchor="middle" font-family="sans-serif" font-size="18" fill="${color}" opacity="0.4">Diario de Barbara</text>
    <polygon points="290,150 290,210 340,180" fill="${color}" opacity="0.3"/>
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/* ── Date formatting ── */
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/* ── Fake visitor counter ── */
function initVisitorCounter() {
  const el = document.getElementById('visitor-count');
  if (!el) return;

  let count = parseInt(localStorage.getItem('diariobarbara-visitors') || '41', 10);
  count += 1;
  localStorage.setItem('diariobarbara-visitors', count.toString());
  el.textContent = count.toString().padStart(6, '0');
}

/* ── Marquee visibility per theme ── */
function updateMarqueeVisibility() {
  const marquee = document.getElementById('marquee');
  if (!marquee) return;

  const theme = document.documentElement.getAttribute('data-theme');
  const showMarquee = ['icarly-retro', 'kawaii', 'vhs'].includes(theme);
  marquee.style.display = showMarquee ? 'block' : 'none';
}

// Watch for theme changes
const observer = new MutationObserver(() => {
  updateMarqueeVisibility();
});
observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['data-theme']
});

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  loadVideos();
  initVisitorCounter();
  updateMarqueeVisibility();
});
