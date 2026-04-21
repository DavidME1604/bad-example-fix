
# Rediseño UX - Electro-Caos Mega Store (Lab 2 IA)

## Contexto
Tengo una página web con 3 archivos (index.html, styles.css, script.js) que es 
una parodia intencional de mala usabilidad. Debo mejorarla tocando SOLO los 
puntos críticos que mi equipo votó, manteniendo la esencia humorística del sitio 
(productos chistosos, testimonios absurdos, contador de visitantes falso, etc.).

IMPORTANTE: 
- NO rehagas los archivos desde cero. Edita puntualmente los originales.
- NO cambies nombres de clases CSS ni estructura general.
- NO cambies el nombre "Electro-Caos Mega Store" ni los nombres chistosos de productos.
- Los cambios deben parecer hechos por un estudiante, sin sobreingeniería.
- NO agregues variables CSS :root, drawers elaborados, toasts, aria-labels en 
  todo, ni responsive avanzado. Código sencillo.

## Tarea
Aplica los siguientes 9 cambios críticos sobre los archivos originales. Cada 
cambio está vinculado a uno de los 5 objetivos de usabilidad (Effective, 
Efficient, Safe, Good utility, Easy to learn) que elegimos.

### CAMBIO 1 - Eficacia: restaurar scroll nativo
En script.js hay un listener de "wheel" que invierte y ralentiza el scroll al 
30%. Elimínalo completamente para devolver el scroll nativo del navegador.

### CAMBIO 2 - Eficiencia: consolidar navegación
En index.html:
- Elimina COMPLETA la <nav class="navbar-2"> (la que dice "DESCUENTOS", 
  "MISTERIO", "CATEGORÍAS QUE NO EXISTEN", etc.).
- Elimina COMPLETO el <div id="floating-nav"> (el menú flotante con Recetas, 
  Horóscopo Tech, Blog del CEO, etc.).
- Elimina COMPLETA la <nav class="bottom-nav"> (los botones GIRAR, NADA, ¿?).
- Elimina el <button id="toggle-floating">.
- En la navbar-1 que queda, reetiqueta enlaces absurdos: 
  "QUEJAS 😡" → "OFERTAS 💸", 
  "FAQ (sin respuestas)" → "FAQ", 
  "CONTACTO (fax only)" → "CONTACTO".
En script.js elimina el bloque "TOGGLE FLOATING NAV" (el código que 
referenciaba #floating-nav y #toggle-floating, ya no existen).

### CAMBIO 3 - Seguridad: mensajes y acciones seguras
En index.html:
- Elimina el banner superior amenazante ("TUS DATOS PROBABLEMENTE SE VENDAN A 
  TERCEROS...") por mensaje de confianza: 
- Cambia el texto del offer-banner ("COMPRA 3 Y PAGA 5, ENVÍO GRATIS a Marte, 
  -50% te cobramos más, GARANTÍA DE 0 DÍAS") por oferta real: 
  "🚨 OFERTA: Envío gratis en compras sobre $50 · 10% de descuento en tu 
  primera compra · Garantía de 12 meses 📦"
- Elimina el <div class="premium-filter blink"> del sidebar (el de $99.99/mes).

En styles.css:
- En la regla .navbar-1 a, cambia "text-decoration: overline underline 
  line-through;" a "text-decoration: none;" y cambia "color: magenta;" a 
  "color: #111827;" para que los enlaces no parezcan deshabilitados.

En script.js (dentro del template de la tarjeta de producto):
- Elimina el botón <button class="btn-empty">🗑️ Vaciar Carrito</button>. 
- Deja solo el botón de comprar, cámbialo a 
  <button class="btn-buy" data-id="${p.id}">🛒 Añadir al carrito</button>.

### CAMBIO 4 - Utilidad: filtros reales + carrito funcional
En script.js:
- Reemplaza el array FILTERS por filtros reales de electrónica:
  [
    { label: "Categoría", options: ["Teléfonos 📱", "Laptops 💻", "Audífonos 🎧", 
      "Monitores 🖥️", "Accesorios ⌨️", "Cables 🔌"] },
    { label: "Marca", options: ["Samsung", "Apple", "Sony", "LG", "Logitech", 
      "Anker"] },
    { label: "Rango de precio", options: ["Menos de $50", "$50 - $200", 
      "$200 - $500", "$500 - $1000", "Más de $1000"] },
    { label: "Calificación mínima", options: ["4★ o más", "3★ o más", 
      "2★ o más", "Todas"] },
  ]
- Arregla las reseñas negativas: cambia 
  "Math.floor(Math.random()*-10)" 
  por 
  "Math.floor(Math.random()*500 + 10)" 
  Y cambia 
  "(Math.random()*5).toFixed(1)" 
  por 
  "(Math.random()*2 + 3).toFixed(1)" 
  (ratings entre 3.0 y 5.0, no entre 0 y 5).
- Añade al final del script este carrito funcional sencillo:

  // ====== CARRITO FUNCIONAL ======
  const cart = [];
  const cartCountEl = document.querySelector(".cart-count");

  function updateCartCount() {
    cartCountEl.textContent = cart.length;
  }

  document.querySelectorAll(".btn-buy").forEach(btn => {
    btn.onclick = () => {
      const id = Number(btn.dataset.id);
      const product = PRODUCTS.find(p => p.id === id);
      cart.push(product);
      updateCartCount();
      btn.textContent = "✓ Añadido";
      setTimeout(() => btn.textContent = "🛒 Añadir al carrito", 1500);
    };
  });

  document.querySelector(".cart-pill").onclick = () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    const lista = cart.map((p, i) => `${i+1}. ${p.name}`).join("\n");
    const accion = prompt(
      `Tu carrito (${cart.length} artículos):\n\n${lista}\n\n` +
      `Escribe "comprar" para finalizar la compra\n` +
      `Escribe "vaciar" para vaciar el carrito\n` +
      `Deja vacío para cerrar`
    );
    if (accion === null) return;
    const opcion = accion.trim().toLowerCase();
    if (opcion === "comprar") {
      alert(`✅ ¡Compra realizada! Gracias por comprar ${cart.length} artículos.`);
      cart.length = 0;
      updateCartCount();
    } else if (opcion === "vaciar") {
      if (confirm("¿Seguro que quieres vaciar el carrito?")) {
        cart.length = 0;
        updateCartCount();
      }
    }
  };

  updateCartCount();

En index.html cambia 
  <span class="blink cart-count">?</span> 
por 
  <span class="cart-count">0</span>

### CAMBIO 5 - Fácil de aprender: fuente y paleta sobria
En styles.css, reemplaza la regla completa del body:

  body {
    font-family: 'Comic Neue', 'Comic Sans MS', cursive;
    background: yellow;
    background-image:
      repeating-linear-gradient(45deg, rgba(255,0,255,0.1) 0 10px, transparent 10px 20px),
      repeating-linear-gradient(-45deg, rgba(0,255,255,0.1) 0 10px, transparent 10px 20px);
    cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'><text y='26' font-size='28'>🤡</text></svg>") 16 16, auto;
    min-height: 100vh;
    padding-bottom: 80px;
  }

Por esta versión simplificada:

  body {
    font-family: system-ui, -apple-system, sans-serif;
    background: #F9FAFB;
    color: #111827;
    min-height: 100vh;
    padding-bottom: 80px;
  }

Paleta: fondo #F9FAFB, texto #111827. Fuente system-ui única.

En index.html, reemplaza el <p class="subtitle"> que tiene spans con tamaños 
caóticos (font-size: 22px, 8px, 28px, 14px) por una sola línea normal:
<p class="subtitle">Esta tienda tiene TODO lo que NO necesitas</p>

### CAMBIO 6 - Quitar CAPTCHA (mostrar precio directo)
En script.js, dentro del forEach de PRODUCTS, reemplaza:

  const priceArea = card.querySelector(".price-area");
  const btn = document.createElement("button");
  btn.className = "price-btn shake";
  btn.textContent = "🔐 RESOLVER ECUACIÓN PARA VER PRECIO 🔐";
  btn.onclick = () => showMathCaptcha(() => {
    priceArea.innerHTML = `<p class="price-display blink">$${price}</p>`;
  });
  priceArea.appendChild(btn);

Por:

  const priceArea = card.querySelector(".price-area");
  priceArea.innerHTML = `<p class="price-display">$${price}</p>`;

También elimina el array MATH_PROBLEMS y la función showMathCaptcha completa.

### CAMBIO 7 - Detener marquees (dejar textos estáticos, NO borrar el texto)
En styles.css, reemplaza:

  .marquee { overflow: hidden; white-space: nowrap; width: 100%; }
  .marquee-track { display: inline-block; animation: marquee 12s linear infinite; }
  .marquee-fast { animation-duration: 6s; }
  .marquee-slow { animation-duration: 30s; }

Por:

  .marquee { overflow: hidden; white-space: normal; width: 100%; }
  .marquee-track { display: inline-block; }
  .marquee-fast { }
  .marquee-slow { }

Los textos de los marquees se mantienen visibles pero ya no se mueven.

### CAMBIO 8 - Quitar pop-ups cada 10 segundos
En script.js, elimina "setInterval(showAnnoyingPopup, 10000);".
También elimina el array POPUP_QUESTIONS y la función showAnnoyingPopup completa.

### CAMBIO 9 - Documentación
Crea un archivo CHANGELOG.md en la misma carpeta que documente:
- Qué se cambió en cada uno de los 9 puntos.
- Qué archivo se tocó.
- Qué objetivo de usabilidad cumple cada cambio (Effective / Efficient / Safe / 
  Good utility / Easy to learn).
- Qué NO se tocó deliberadamente y por qué (ejemplos: blink, shake, rainbow, 
  rotaciones, visitor counter, testimonios chistosos, nombres de productos 
  chistosos, tipografías Creepster/Papyrus/Dancing en elementos individuales — 
  se quedaron porque no estaban entre los 5 puntos votados por el equipo).
- Formato: tabla resumen al inicio + sección detallada por cada cambio.

## Instrucciones de ejecución
1. Antes de tocar nada, lee los 3 archivos originales completos.
2. Aplica los cambios EN ORDEN, uno a la vez.
3. Después de cada cambio, confirma que no rompiste nada.
4. Al terminar, valida que el JS parsea sin errores (node -c script.js).
5. Genera CHANGELOG.md.
6. Dame un resumen final de qué archivos modificaste y cuántas líneas cambiaron.

## Criterio de éxito
- La página sigue llamándose "Electro-Caos Mega Store".
- Los 8 productos siguen teniendo nombres chistosos 
  ("Teléfono Cuántico 3000X PRO MAX ULTRA", etc.).
- El contador de visitantes falso sigue ahí.
- Los testimonios absurdos siguen ahí (pero ya no se mueven).
- El scroll funciona normal.
- Se puede añadir al carrito, comprar y vaciar.
- Hay 4 filtros reales (categoría, marca, precio, rating).
- Una sola navbar superior (las otras 3 eliminadas).
- Fondo gris muy claro, texto gris oscuro, fuente del sistema.
- No hay pop-ups, no hay CAPTCHA, no hay textos corriendo.