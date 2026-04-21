// ====== DATA ======
const PRODUCTS = [
  { id: 1, name: "Samsung Galaxy S24 Ultra", category: "Teléfonos", img: "📱" },
  { id: 2, name: "ASUS ROG Gaming Laptop 16 pulgadas", category: "Laptops", img: "💻" },
  { id: 3, name: "Sony WH-1000XM5 Audífonos Inalámbricos", category: "Audífonos", img: "🎧" },
  { id: 4, name: "Corsair K95 Platinum Teclado Mecánico", category: "Accesorios", img: "⌨️" },
  { id: 5, name: "Logitech MX Master 3S Mouse Inalámbrico", category: "Accesorios", img: "🖱️" },
  { id: 6, name: "LG UltraWide 34 pulgadas Monitor", category: "Monitores", img: "🖥️" },
  { id: 7, name: "Anker USB-C Cable de Carga Rápida", category: "Cables", img: "🔌" },
  { id: 8, name: "Belkin Cargador Rápido 65W USB-C", category: "Cables", img: "🔋" },
];

// [Cambio 4] Solo se deja Categoría; se eliminaron Marca, Precio y Rating
// porque los productos no tienen esos campos y no se podía filtrar real.
const FILTERS = [
  { label: "Categoría", options: ["Teléfonos 📱", "Laptops 💻", "Audífonos 🎧", "Monitores 🖥️", "Accesorios ⌨️", "Cables 🔌"] },
];

// [Cambio 4] Se pre-generan precio, rating y reseñas una sola vez antes de renderizar.
// Antes se generaban inline en el template, lo que los hacía cambiar en cada re-render al filtrar.
PRODUCTS.forEach(p => {
  p.price = (Math.random() * 9999 + 1).toFixed(2);
  p.rating = (Math.random() * 2 + 3).toFixed(1);  // [Cambio 4] rango 3.0–5.0, antes era 0–5
  p.reviews = Math.floor(Math.random() * 500 + 10); // [Cambio 4] reseñas positivas, antes podía dar negativo
});


const FONTS = ["papyrus", "comic-neue", "dancing", "creepster"];
const BG_COLORS = ["rgba(255,0,0,0.3)","rgba(0,255,0,0.3)","rgba(0,0,255,0.3)","rgba(255,255,0,0.4)","rgba(255,0,255,0.3)","rgba(0,255,255,0.3)"];
const BORDER_COLORS = ["magenta","lime","red","cyan","yellow","blue"];
const SIZES = ["12px","14px","16px","18px","22px"];
const EMOJI_SIZES = ["40px","60px","80px","30px","50px"];
// [Fix imagen] El tercer aspecto tenía h:"100%", que expandía el wrapper sin límite
// y empujaba el botón de comprar fuera de la tarjeta. Cambiado a h:"80px".
const ASPECTS = [{w:"100%",h:"60px"},{w:"80px",h:"160px"},{w:"100%",h:"80px"},{w:"32px",h:"32px"}];

// ====== RENDER FILTERS ======
const filtersEl = document.getElementById("filters");
FILTERS.forEach(f => {
  const div = document.createElement("div");
  div.className = "filter-group";
  div.innerHTML = `<p class="label">${f.label}:</p>` +
    f.options.map(o => `<label><input type="checkbox"> ${o}</label>`).join("");
  filtersEl.appendChild(div);
});

// [Cambio 4 - filtros funcionales] Al marcar/desmarcar un checkbox se re-renderiza el grid.
// Se leen los checkboxes marcados, se comparan con p.category usando startsWith
// (ej. "Teléfonos 📱".startsWith("Teléfonos") → true).
// Sin selección → muestra todos los productos.
filtersEl.addEventListener("change", () => {
  const checked = [...filtersEl.querySelectorAll("input:checked")].map(cb => cb.parentElement.textContent.trim());
  if (checked.length === 0) {
    renderProducts(PRODUCTS); // ningún filtro activo: mostrar todo
  } else {
    renderProducts(PRODUCTS.filter(p => checked.some(c => c.startsWith(p.category))));
  }
});

// ====== RENDER PRODUCTS ======
const grid = document.getElementById("product-grid");

// [Cambio 4] El forEach original se convirtió en función para poder llamarla
// cada vez que cambia el filtro sin duplicar el código de construcción de tarjetas.
function renderProducts(list) {
  grid.innerHTML = ""; // limpia el grid antes de re-renderizar
  list.forEach((p, i) => {
    const rotation = ((i % 5) - 2) * 4;
    const card = document.createElement("div");
    card.className = "product-card";
    card.style.background = BG_COLORS[i % 6];
    card.style.borderColor = BORDER_COLORS[i % 6];
    card.style.transform = `rotate(${rotation}deg)`;
    card.style.fontFamily = FONTS[i % FONTS.length] === "papyrus" ? "Papyrus, fantasy"
      : FONTS[i % FONTS.length] === "creepster" ? "'Creepster', cursive"
      : FONTS[i % FONTS.length] === "dancing" ? "'Dancing Script', cursive"
      : "'Comic Neue', cursive";

    const aspect = ASPECTS[i % ASPECTS.length];
    card.innerHTML = `
      <div class="product-img-wrap" style="width:${aspect.w};height:${aspect.h}">
        <span style="font-size:${EMOJI_SIZES[i % 5]}">${p.img}</span>
      </div>
      <div class="marquee"><div class="marquee-track" style="animation-duration:${20 / (3 + i)}s">
        <p class="product-name" style="font-size:${SIZES[i % SIZES.length]}">${p.name}</p>
      </div></div>
      <p class="product-cat">Cat: <span class="creepster" style="font-size:${10 + (i % 3) * 8}px">${p.category}</span></p>
      <div class="price-area"><p class="price-display">$${p.price}</p></div>
      <!-- [Cambio 6] Precio visible directamente; antes requería resolver un CAPTCHA matemático -->
      <div class="action-row">
        <button class="btn-buy" data-id="${p.id}">🛒 Añadir al carrito</button>
        <!-- [Cambio 3] data-id agregado para identificar el producto; btn-empty eliminado -->
      </div>
      <p class="rating">⭐ ${p.rating}/5 (${p.reviews} reseñas)</p>
      <!-- [Cambio 4] Usa p.rating y p.reviews pre-generados, no Math.random() inline -->
    `;
    grid.appendChild(card);
  });
}

renderProducts(PRODUCTS); // [Cambio 4] llamada inicial: muestra todos los productos al cargar



// ====== VISITOR COUNTER ======
document.getElementById("visitor-count").textContent = Math.floor(Math.random() * 999999);

// ====== CARRITO FUNCIONAL ======
// [Cambio 4] Carrito nuevo: antes no existía lógica de carrito real.
const cart = [];
const cartCountEl = document.querySelector(".cart-count");

function updateCartCount() {
  cartCountEl.textContent = cart.length; // actualiza el número en el pill del header
}

// [Cambio 4] Event delegation en el grid: un solo listener maneja todos los btn-buy,
// incluyendo los que se crean en cada re-render al filtrar.
// Antes se usaba querySelectorAll().forEach() que dejaba de funcionar tras re-render.
grid.addEventListener("click", e => {
  const btn = e.target.closest(".btn-buy");
  if (!btn) return; // clic en otro elemento de la tarjeta, ignorar
  const id = Number(btn.dataset.id);
  const product = PRODUCTS.find(p => p.id === id);
  cart.push(product);
  updateCartCount();
  btn.textContent = "✓ Añadido";
  setTimeout(() => btn.textContent = "🛒 Añadir al carrito", 1500); // feedback visual temporal
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
    alert(`¡Compra realizada! Gracias por comprar ${cart.length} artículos.`);
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

