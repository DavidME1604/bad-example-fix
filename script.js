// ====== DATA ======
const PRODUCTS = [
  { id: 1, name: "Teléfono Cuántico 3000X PRO MAX ULTRA", category: "Teléfonos", img: "📱" },
  { id: 2, name: "Laptop Gaming EXPLOSIÓN de 47 pulgadas", category: "Laptops", img: "💻" },
  { id: 3, name: "Audífonos con Cable de 15 Metros", category: "Audífonos", img: "🎧" },
  { id: 4, name: "Teclado Sin Letras (Modo Difícil)", category: "Accesorios", img: "⌨️" },
  { id: 5, name: "Mouse con Sensor de Emociones", category: "Accesorios", img: "🖱️" },
  { id: 6, name: "Monitor CRT Retro 14 pulgadas", category: "Monitores", img: "🖥️" },
  { id: 7, name: "USB que Solo Entra al Tercer Intento", category: "Cables", img: "🔌" },
  { id: 8, name: "Cargador Universal Para Nada", category: "Cables", img: "🔋" },
];

const FILTERS = [
  { label: "Categoría", options: ["Teléfonos 📱", "Laptops 💻", "Audífonos 🎧", "Monitores 🖥️", "Accesorios ⌨️", "Cables 🔌"] },
  { label: "Marca", options: ["Samsung", "Apple", "Sony", "LG", "Logitech", "Anker"] },
  { label: "Rango de precio", options: ["Menos de $50", "$50 - $200", "$200 - $500", "$500 - $1000", "Más de $1000"] },
  { label: "Calificación mínima", options: ["4★ o más", "3★ o más", "2★ o más", "Todas"] },
];


const FONTS = ["papyrus", "comic-neue", "dancing", "creepster"];
const BG_COLORS = ["rgba(255,0,0,0.3)","rgba(0,255,0,0.3)","rgba(0,0,255,0.3)","rgba(255,255,0,0.4)","rgba(255,0,255,0.3)","rgba(0,255,255,0.3)"];
const BORDER_COLORS = ["magenta","lime","red","cyan","yellow","blue"];
const SIZES = ["12px","14px","16px","18px","22px"];
const EMOJI_SIZES = ["40px","60px","80px","30px","50px"];
const ASPECTS = [{w:"100%",h:"60px"},{w:"80px",h:"160px"},{w:"100%",h:"100%"},{w:"32px",h:"32px"}];

// ====== RENDER FILTERS ======
const filtersEl = document.getElementById("filters");
FILTERS.forEach(f => {
  const div = document.createElement("div");
  div.className = "filter-group";
  div.innerHTML = `<p class="label">${f.label}:</p>` +
    f.options.map(o => `<label><input type="checkbox"> ${o}</label>`).join("");
  filtersEl.appendChild(div);
});

// ====== RENDER PRODUCTS ======
const grid = document.getElementById("product-grid");
PRODUCTS.forEach((p, i) => {
  const price = (Math.random() * 9999 + 1).toFixed(2);
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
    <div class="price-area"></div>
    <div class="action-row">
      <button class="btn-buy" data-id="${p.id}">🛒 Añadir al carrito</button>
    </div>
    <p class="rating">⭐ ${(Math.random()*2 + 3).toFixed(1)}/5 (${Math.floor(Math.random()*500 + 10)} reseñas)</p>
  `;
  const priceArea = card.querySelector(".price-area");
  priceArea.innerHTML = `<p class="price-display">$${price}</p>`;
  grid.appendChild(card);
});



// ====== VISITOR COUNTER ======
document.getElementById("visitor-count").textContent = Math.floor(Math.random() * 999999);

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

