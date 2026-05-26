# cómo actualizar el diario de barbara

guía corta para añadir capítulos, videos y noticias al portal sin romper nada.

## 1. estructura del repo

```
diarioBarbara/
├── index.html         ← página principal (banner, navegación, breaking news, sidebar)
├── data.json          ← FUENTE DE VERDAD: capítulos y mensajes del chat
├── videos/            ← aquí van los archivos .webm / .mp4
├── assets/
│   ├── fonts/         ← tahoma
│   └── icons/         ← iconos del portal
├── css/
│   ├── portal.css     ← skin del portal (paleta dark cálida)
│   └── chat.css       ← skin de la ventana de chat
├── js/
│   ├── portal.js      ← render del grid de capítulos
│   ├── chat.js        ← lógica del chat
│   └── caritas.js     ← svg de las caritas (feliz, timida, etc.)
├── caritas.html       ← muestra todas las caritas disponibles
└── formatter.html     ← editor visual para crear capítulos sin tocar json a mano
```

el archivo **clave** es `data.json`. casi todo lo que verás en la web sale de ahí.

## 2. añadir un capítulo nuevo (chat)

cada capítulo es un objeto dentro del array `chats` en `data.json`:

```json
{
  "titulo": "mi cuarto",
  "slug": "mi-cuarto",
  "icono": "muyfeliz",
  "fecha": "2026-04-05",
  "chat": [
    { "emisor": 1, "contenido": ["hola otra vez :risueña:"] },
    { "emisor": 1, "contenido": ["hoy les enseno mi cuarto"] },
    { "emisor": 1, "contenido": "videos/mi-cuarto.webm" },
    { "emisor": 2, "contenido": ["wow se ve precioso!"] },
    { "emisor": 1, "contenido": [":timida: gracias"] }
  ]
}
```

**campos:**
- `titulo` — el que aparece en la card del portal (ponlo en minúsculas, el css ya lo fuerza igual)
- `slug` — id corto sin espacios ni acentos
- `icono` — nombre de una carita (`feliz`, `risueña`, `timida`, `muyfeliz`, `nerviosa`, `estrellada`, `enamorada`, `risa`). para ver todas abre `caritas.html`
- `fecha` — formato `aaaa-mm-dd`
- `chat` — array de mensajes

**mensajes:**
- `emisor: 1` → barbara (mensaje recibido, burbuja verde-musgo a la izquierda)
- `emisor: 2` → tú (mensaje enviado, burbuja naranja a la derecha)
- `contenido` puede ser:
  - un string normal: `"hola mundo"`
  - un array de strings (varias líneas en una misma burbuja): `["linea 1", "linea 2"]`
  - una ruta a video: `"videos/archivo.webm"` — el chat detecta `.webm` o `.mp4` y lo renderiza con reproductor
- **caritas inline en texto**: escribe `:nombre:` (ej. `:enamorada:`, `:risa:`). el parser las sustituye por el svg automáticamente.

> truco fácil: abre `formatter.html` en el navegador. te deja redactar un chat visual y exporta el json listo para pegar.

## 3. añadir un video

1. mete el archivo en la carpeta `videos/`. preferiblemente `.webm` (pesa menos que mp4).
2. en `data.json`, dentro del capítulo correspondiente, añade un mensaje:
   ```json
   { "emisor": 1, "contenido": "videos/nombre-del-archivo.webm" }
   ```
3. listo. el chat lo monta solo.

**recomendaciones de tamaño:**
- resolución máxima útil: 720p (no se ve más grande de todos modos)
- bitrate moderado: el chat es ventana pequeña, no hace falta calidad de cine
- si el archivo pesa >50 mb, intenta recomprimirlo (handbrake, ffmpeg, o cualquier herramienta online tipo cloudconvert)

## 4. cambiar el "breaking news" y el sidebar

los textos de breaking news, "lo último", "downloads" y "fan stuff" están **escritos directamente en `index.html`**, no en `data.json`. abre el archivo y busca el bloque `<!-- module: breaking news -->` o `<aside class="portal-col-side">`.

todo en minúsculas (el css también lo fuerza por si acaso).

## 5. cambiar el banner ascii

en `index.html`, dentro de `<header class="portal-hero">`, hay dos bloques `<pre class="hero-ascii">`. puedes pegar cualquier ascii art ahí — respeta espacios y saltos de línea tal cual.

## 6. cambiar colores

toda la paleta vive en `css/portal.css`, al principio, bajo `:root { ... }`. son variables css. cambia los hex y se actualiza todo el sitio. la paleta de chat está duplicada al inicio de `css/chat.css`.

paleta actual (dark cálida):
- naranja principal: `#d96a1c`
- verde musgo: `#6fb84a`
- amarillo mostaza: `#d4b834`
- azul: `#3a7ea5`
- fondo: `#1a1310` (marrón muy oscuro, no negro puro — más amable con la vista)

## 7. publicar los cambios (paso a paso)

### opción a — desde github web (la más fácil, sin terminal)

1. ve al repo en github.com
2. para subir un video: entra en la carpeta `videos/` y arrastra el archivo
3. para editar `data.json`: ábrelo y dale al lápiz arriba a la derecha
4. abajo del editor, escribe un mensaje corto en "commit changes" (ej. "añade capítulo 04: mi cuarto") y dale al botón verde
5. github publica el cambio automáticamente. en 1-2 minutos está online.

### opción b — desde el ordenador con git

```bash
git pull                          # traer cambios remotos primero
# (haces tus ediciones)
git add .
git commit -m "añade capítulo 04: mi cuarto"
git push
```

## 8. probar en local antes de subir

para ver los cambios sin publicar todavía, abre un servidor estático en la carpeta del repo:

```bash
python3 -m http.server 8085
```

y luego en el navegador: `http://localhost:8085`

(abrir `index.html` directamente con doble clic **no funciona** porque el sitio carga `data.json` por fetch y los navegadores lo bloquean en `file://`).

## 9. caché del navegador

el sitio usa cache-busting automático para los js, pero **no para data.json**. si haces cambios y no los ves, prueba:
- ctrl+shift+r (windows/linux) o cmd+shift+r (mac) para recarga forzada
- o abre en una ventana de incógnito

## 10. ¿qué no tocar?

- `js/caritas.js` — los svg de las caritas. si quieres añadir una nueva, hay que editar este archivo y también `caritas.html` para previsualizarlas.
- la estructura html de la ventana de chat (`<div class="chat-window">` en `index.html`). los js esperan exactamente esos ids.
- el cache-busting del final de `index.html` — sirve para que el navegador no se quede pillado con js viejo.

---

dudas → preguntar a manu.
