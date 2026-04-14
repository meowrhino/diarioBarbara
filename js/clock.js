/* Reloj de la barra de tareas */
const clockEl = document.getElementById('clock');

function tick() {
  clockEl.textContent = new Date().toLocaleTimeString('es', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

tick();
setInterval(tick, 30000);
