# CHANGELOG — Electro-Caos Mega Store (Lab 2 IA)

## Tabla resumen

| # | Cambio | Archivo(s) | Objetivo de usabilidad |
|---|--------|-----------|----------------------|
| 1 | Scroll nativo restaurado | script.js | Effective |
| 2 | Navegación consolidada (3 navs + floating eliminadas) | index.html, script.js | Efficient |
| 3 | Mensajes seguros, precio visible, sin botón trampa | index.html, styles.css, script.js | Safe |
| 4 | Filtros reales + carrito funcional + ratings corregidos | script.js, index.html | Good utility |
| 5 | Fuente system-ui, fondo #F9FAFB, texto #111827 | styles.css, index.html | Easy to learn |
| 6 | Precio directo sin CAPTCHA matemático | script.js | Effective |
| 7 | Marquees detenidos (textos estáticos visibles) | styles.css | Easy to learn |
| 8 | Pop-ups automáticos eliminados | script.js | Effective |
| 9 | Documentación en CHANGELOG.md | CHANGELOG.md | — |
| 10 | Eliminados `blink` y `rainbow-text` | index.html, script.js, styles.css | Easy to learn |

---

## Detalle por cambio

### Cambio 1 — Scroll nativo restaurado
**Archivo:** script.js  
**Objetivo:** Effective  
**Qué se hizo:** Se eliminó el listener `wheel` que invertía la dirección del scroll y lo ralentizaba al 30%. El navegador recupera su comportamiento nativo.

### Cambio 2 — Consolidar navegación
**Archivos:** index.html, script.js  
**Objetivo:** Efficient  
**Qué se hizo:**
- Eliminada `<nav class="navbar-2">` (DESCUENTOS, MISTERIO, CATEGORÍAS QUE NO EXISTEN…).
- Eliminado `<div id="floating-nav">` (menú flotante con Recetas, Horóscopo Tech, etc.).
- Eliminada `<nav class="bottom-nav">` (GIRAR, NADA, ¿?).
- Eliminado `<button id="toggle-floating">`.
- Eliminado el bloque JS "TOGGLE FLOATING NAV".
- Reetiquetados 3 enlaces en navbar-1: "QUEJAS 😡" → "OFERTAS 💸", "FAQ (sin respuestas)" → "FAQ", "CONTACTO (fax only)" → "CONTACTO".

### Cambio 3 — Mensajes y acciones seguras
**Archivos:** index.html, styles.css, script.js  
**Objetivo:** Safe  
**Qué se hizo:**
- Banner superior reemplazado: de amenaza de venta de datos por mensaje de confianza ("Tus datos están seguros…").
- Texto del offer-banner reemplazado por oferta real (envío gratis, descuento 10%, garantía 12 meses).
- Eliminado `<div class="premium-filter blink">` ($99.99/mes por filtro de aura).
- En `.navbar-1 a`: `text-decoration: overline underline line-through` → `none`; `color: magenta` → `#111827` (enlaces ya no parecen deshabilitados).
- En la tarjeta de producto: eliminado botón `btn-empty` ("Vaciar Carrito"); botón de compra renombrado a "Añadir al carrito" con `data-id`.

### Cambio 4 — Filtros reales + carrito funcional
**Archivos:** script.js, index.html  
**Objetivo:** Good utility  
**Qué se hizo:**
- Array `FILTERS` reemplazado por 4 filtros reales: Categoría, Marca, Rango de precio, Calificación mínima.
- Rating corregido: `Math.random()*-10` → `Math.random()*500+10` (reseñas positivas); `Math.random()*5` → `Math.random()*2+3` (rating entre 3.0 y 5.0).
- Añadido carrito funcional al final del script: `cart[]`, `updateCartCount()`, handlers en `.btn-buy` y `.cart-pill`.
- En index.html: `<span class="blink cart-count">?</span>` → `<span class="cart-count">0</span>`.

### Cambio 5 — Fuente y paleta sobria
**Archivos:** styles.css, index.html  
**Objetivo:** Easy to learn  
**Qué se hizo:**
- Regla `body` simplificada: fuente `system-ui`, fondo `#F9FAFB`, texto `#111827`. Eliminados fondo amarillo, gradientes, cursor payaso.
- `<p class="subtitle">` con spans de tamaños caóticos reemplazado por línea simple: "Esta tienda tiene TODO lo que NO necesitas".

### Cambio 6 — Mostrar precio directo
**Archivo:** script.js  
**Objetivo:** Effective  
**Qué se hizo:**
- Eliminados el array `MATH_PROBLEMS` y la función `showMathCaptcha`.
- En el forEach de productos: el botón con CAPTCHA matemático reemplazado por `priceArea.innerHTML = \`<p class="price-display">$${price}</p>\``.

### Cambio 7 — Marquees detenidos
**Archivo:** styles.css  
**Objetivo:** Easy to learn  
**Qué se hizo:**
- `.marquee`: `white-space: nowrap` → `white-space: normal`.
- `.marquee-track`: eliminada la animación `marquee`.
- `.marquee-fast` y `.marquee-slow`: vaciadas (sin `animation-duration`).
- Los textos siguen visibles, solo dejan de desplazarse.

### Cambio 8 — Quitar pop-ups automáticos
**Archivo:** script.js  
**Objetivo:** Effective  
**Qué se hizo:**
- Eliminado `setInterval(showAnnoyingPopup, 10000)`.
- Eliminados el array `POPUP_QUESTIONS` y la función `showAnnoyingPopup`.

### Cambio 9 — Documentación
**Archivo:** CHANGELOG.md (nuevo)  
**Objetivo:** —  
**Qué se hizo:** Este archivo.

### Cambio 10 — Eliminados `blink` y `rainbow-text`
**Archivos:** index.html, script.js, styles.css  
**Objetivo:** Easy to learn  
**Qué se hizo:**
- Quitada clase `rainbow-text` del h1 del header, del h2 del sidebar y de los nombres de producto (template JS).
- Quitada clase `blink` del párrafo del contador de visitantes.
- Eliminadas de styles.css las reglas `@keyframes blink`, `.blink`, `@keyframes rainbow` y `.rainbow-text`.

---

## Qué NO se tocó deliberadamente

| Elemento | Por qué se dejó |
|----------|----------------|
| Animación `shake` en tarjetas | No votado; es parte del carácter visual del sitio |
| Rotación de tarjetas de producto (`rotate`) | No votado |
| Fuentes Creepster / Dancing Script / Papyrus en elementos individuales | No votado; se cambia solo la fuente base del body |
| Nombres chistosos de productos | Por diseño (parodia humorística) |
| Contador de visitantes falso | Por diseño (es parte del humor del sitio) |
| Testimonios absurdos | Por diseño (ya solo son estáticos tras el cambio 7) |
| Colores neón en navbar-1, header, sidebar | No votado; se tocó solo el color y decoración del texto de los enlaces |
| Scrollbar de colores (lime/magenta/cyan) | No votado |
| Rotaciones de tarjetas y tamaños de emoji variables | No votado |
