// Catálogo y carrito de EnergiAhorro. Valores demostrativos en COP.
const TARIFA_REFERENCIA = 890.26; // Referencia publicada por Air-e en agosto de 2026.
const DIAS_MES = 30;

const productos = [
  { id: 1, nombre: "Bombilla LED 9 W", categoria: "iluminacion", precio: 18000, potenciaAnterior: 60, potenciaNueva: 9, horasDia: 5, imagen: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80" },
  { id: 2, nombre: "Panel LED 18 W", categoria: "iluminacion", precio: 52000, potenciaAnterior: 40, potenciaNueva: 18, horasDia: 6, imagen: "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=700&q=80" },
  { id: 3, nombre: "Ventilador eficiente 45 W", categoria: "climatizacion", precio: 189000, potenciaAnterior: 75, potenciaNueva: 45, horasDia: 8, imagen: "https://images.unsplash.com/photo-1618941716939-553df3c6c278?auto=format&fit=crop&w=700&q=80" },
  { id: 4, nombre: "Aire acondicionado inverter", categoria: "climatizacion", precio: 1899000, potenciaAnterior: 1200, potenciaNueva: 700, horasDia: 6, imagen: "https://images.unsplash.com/photo-1631545806609-7c5b3b5b8b6d?auto=format&fit=crop&w=700&q=80" },
  { id: 5, nombre: "Nevera eficiente", categoria: "hogar", precio: 2199000, potenciaAnterior: 110, potenciaNueva: 65, horasDia: 8, imagen: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=700&q=80" },
  { id: 6, nombre: "Lavadora de bajo consumo", categoria: "hogar", precio: 1499000, potenciaAnterior: 650, potenciaNueva: 400, horasDia: 1, imagen: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=700&q=80" },
  { id: 7, nombre: "Kit solar residencial", categoria: "solar", precio: 3299000, potenciaAnterior: 0, potenciaNueva: 0, horasDia: 5, imagen: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=700&q=80", ahorroKwhFijo: 18 },
  { id: 8, nombre: "Reflector solar LED", categoria: "solar", precio: 129000, potenciaAnterior: 50, potenciaNueva: 10, horasDia: 8, imagen: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=700&q=80" }
];

let categoriaActiva = "todas";
let textoBusqueda = "";
let carrito = [];

const contenedorCatalogo = document.querySelector("#catalogoProductos");
const contenedorFiltros = document.querySelector("#filtros");
const buscador = document.querySelector("#buscador");
const listaCarrito = document.querySelector("#listaCarrito");
const contadorProductos = document.querySelector("#contadorProductos");
const cantidadCarrito = document.querySelector("#cantidadCarrito");
const totalCompra = document.querySelector("#totalCompra");
const ahorroTotal = document.querySelector("#ahorroTotal");
const retornoCompra = document.querySelector("#retornoCompra");
const botonVaciar = document.querySelector("#vaciarCarrito");

// Calcula el ahorro de energía al mes en kWh. En el kit solar se usa una estimación fija.
function calcularAhorroKwh(producto) {
  if (producto.ahorroKwhFijo) return producto.ahorroKwhFijo;
  const diferenciaWatts = Math.max(0, producto.potenciaAnterior - producto.potenciaNueva);
  return (diferenciaWatts * producto.horasDia * DIAS_MES) / 1000;
}

// Convierte el ahorro energético en un valor monetario aproximado.
function calcularAhorroPesos(producto) {
  return calcularAhorroKwh(producto) * TARIFA_REFERENCIA;
}

// Formatea valores como moneda colombiana.
function formatoPesos(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency", currency: "COP", maximumFractionDigits: 0
  }).format(valor);
}

// Devuelve el nombre visible de la categoría.
function nombreCategoria(categoria) {
  const nombres = {
    iluminacion: "Iluminación",
    climatizacion: "Climatización",
    hogar: "Hogar",
    solar: "Solar"
  };
  return nombres[categoria] || "General";
}

// Genera una tarjeta de producto mediante template strings y el DOM.
function renderizarProductos() {
  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria = categoriaActiva === "todas" || producto.categoria === categoriaActiva;
    const coincideBusqueda = producto.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  contadorProductos.textContent = `${productosFiltrados.length} producto(s)`;
  if (productosFiltrados.length === 0) {
    contenedorCatalogo.innerHTML = '<p class="empty-results">No encontramos productos con esos criterios. Prueba otra búsqueda.</p>';
    return;
  }

  let tarjetas = "";
  for (const producto of productosFiltrados) {
    const ahorro = calcularAhorroPesos(producto);
    tarjetas += `
      <article class="product-card">
        <img class="product-image" src="${producto.imagen}" alt="${producto.nombre}" loading="lazy">
        <div class="product-content">
          <span class="product-category">${nombreCategoria(producto.categoria)}</span>
          <h3>${producto.nombre}</h3>
          <p class="product-price">${formatoPesos(producto.precio)}</p>
          <p class="product-saving">Ahorro estimado: ${ahorro > 0 ? `${formatoPesos(ahorro)} / mes` : "No calculado"}</p>
          <p class="product-spec">${producto.potenciaAnterior > 0 ? `${producto.potenciaAnterior} W anteriores → ${producto.potenciaNueva} W nuevos · ${producto.horasDia} h/día` : "Generación solar · estimación ilustrativa de 18 kWh/mes"}</p>
          <button class="btn btn-energia w-100" type="button" data-agregar="${producto.id}">Agregar al carrito</button>
        </div>
      </article>`;
  }
  contenedorCatalogo.innerHTML = tarjetas;
}

// Actualiza el estado visual del botón seleccionado.
function actualizarFiltros() {
  const botones = contenedorFiltros.querySelectorAll("[data-categoria]");
  botones.forEach((boton) => {
    const seleccionado = boton.dataset.categoria === categoriaActiva;
    boton.classList.toggle("activo", seleccionado);
    boton.setAttribute("aria-pressed", String(seleccionado));
  });
}

// Añade un producto al carrito; si ya existe, aumenta su cantidad.
function agregarAlCarrito(id) {
  const producto = productos.find((item) => item.id === Number(id));
  if (!producto) return;
  const existente = carrito.find((item) => item.id === producto.id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  renderizarCarrito();
}

// Quita una unidad del producto seleccionado.
function quitarDelCarrito(id) {
  const item = carrito.find((producto) => producto.id === Number(id));
  if (!item) return;
  item.cantidad -= 1;
  if (item.cantidad <= 0) {
    carrito = carrito.filter((producto) => producto.id !== Number(id));
  }
  renderizarCarrito();
}

// Calcula total, ahorro mensual y meses estimados para recuperar la compra.
function renderizarCarrito() {
  const unidades = carrito.reduce((suma, producto) => suma + producto.cantidad, 0);
  const total = carrito.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0);
  const ahorroMensual = carrito.reduce((suma, producto) => suma + calcularAhorroPesos(producto) * producto.cantidad, 0);

  cantidadCarrito.textContent = unidades;
  totalCompra.textContent = formatoPesos(total);
  ahorroTotal.textContent = formatoPesos(ahorroMensual);
  retornoCompra.textContent = ahorroMensual > 0 ? `${(total / ahorroMensual).toFixed(1)} meses` : "—";

  if (carrito.length === 0) {
    listaCarrito.innerHTML = '<p class="cart-empty">Aún no agregas productos. Explora el catálogo para comenzar.</p>';
    return;
  }

  let filas = "";
  for (const producto of carrito) {
    filas += `<div class="cart-item">
      <div><strong>${producto.nombre} × ${producto.cantidad}</strong><small>${formatoPesos(producto.precio * producto.cantidad)}</small></div>
      <button type="button" data-quitar="${producto.id}" aria-label="Quitar una unidad de ${producto.nombre}">Quitar</button>
    </div>`;
  }
  listaCarrito.innerHTML = filas;
}

// Eventos: click para filtros y botones del catálogo; input para búsqueda.
contenedorFiltros.addEventListener("click", (evento) => {
  const boton = evento.target.closest("[data-categoria]");
  if (!boton) return;
  categoriaActiva = boton.dataset.categoria;
  actualizarFiltros();
  renderizarProductos();
});

buscador.addEventListener("input", (evento) => {
  textoBusqueda = evento.target.value.trim();
  renderizarProductos();
});

contenedorCatalogo.addEventListener("click", (evento) => {
  const boton = evento.target.closest("[data-agregar]");
  if (boton) agregarAlCarrito(boton.dataset.agregar);
});

listaCarrito.addEventListener("click", (evento) => {
  const boton = evento.target.closest("[data-quitar]");
  if (boton) quitarDelCarrito(boton.dataset.quitar);
});

botonVaciar.addEventListener("click", () => {
  carrito = [];
  renderizarCarrito();
});

// Render inicial.
actualizarFiltros();
renderizarProductos();
renderizarCarrito();
