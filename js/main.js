// =====================================
// FITSTORE PRO - PROYECTO FINAL COMPLETO
// =====================================

// =======================
// CLASE PRODUCTO
// =======================
class Producto {
   constructor(id, nombre, precio, categoria) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.categoria = categoria;
   }
}

// =======================
// CLASE CARRITO
// =======================
class Carrito {
   constructor() {
      this.productos = JSON.parse(localStorage.getItem("carrito")) || [];
   }

   agregar(producto) {
      this.productos.push(producto);
      this.guardar();
   }

   eliminar(id) {
      this.productos = this.productos.filter(p => p.id !== id);
      this.guardar();
   }

   calcularTotal() {
      return this.productos.reduce((acc, p) => acc + p.precio, 0);
   }

   guardar() {
      localStorage.setItem("carrito", JSON.stringify(this.productos));
   }

   vaciar() {
      this.productos = [];
      this.guardar();
   }
}

// =======================
// DATOS SIMULADOS
// =======================
const productos = [
   new Producto(1, "Plan Fuerza Pro", 15000, "Fuerza"),
   new Producto(2, "Plan Hipertrofia Avanzada", 18000, "Hipertrofia"),
   new Producto(3, "Plan Definición Total", 14000, "Resistencia"),
   new Producto(4, "Coaching Personalizado", 30000, "Premium")
];

// =======================
// VARIABLES GLOBALES
// =======================
const carrito = new Carrito();

const contenedorProductos = document.getElementById("productos");
const contadorCarrito = document.getElementById("contador");
const botonCarrito = document.getElementById("verCarrito");
const filtroCategoria = document.getElementById("filtroCategoria");

// =======================
// RENDER PRODUCTOS
// =======================
function renderProductos(lista) {

   contenedorProductos.innerHTML = "";

   lista.forEach(producto => {

      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Categoría: ${producto.categoria}</p>
            <p><strong>$${producto.precio}</strong></p>
            <button data-id="${producto.id}">Agregar</button>
      `;

      contenedorProductos.appendChild(card);
   });
}

// =======================
// ACTUALIZAR CONTADOR
// =======================
function actualizarContador() {
   contadorCarrito.textContent = carrito.productos.length;
}

// =======================
// MOSTRAR CARRITO
// =======================
function mostrarCarrito() {

   if (carrito.productos.length === 0) {
      Swal.fire("El carrito está vacío");
      return;
   }

   let listaHTML = "";

   carrito.productos.forEach(prod => {
      listaHTML += `
            <li>
               ${prod.nombre} - $${prod.precio}
               <button onclick="eliminarProducto(${prod.id})">❌</button>
            </li>
      `;
   });

   Swal.fire({
      title: "Tu Carrito",
      html: `
            <ul style="text-align:left">
               ${listaHTML}
            </ul>
            <hr>
            <strong>Total: $${carrito.calcularTotal()}</strong>
      `,
      showCancelButton: true,
      confirmButtonText: "Finalizar compra"
   }).then(result => {
      if (result.isConfirmed) {
            finalizarCompra();
      }
   });
}

// =======================
// AGREGAR PRODUCTO
// =======================
function agregarProducto(id) {

   const producto = productos.find(p => p.id === Number(id));

   if (producto) {
      carrito.agregar(producto);
      actualizarContador();

      Swal.fire({
            icon: "success",
            title: "Agregado al carrito",
            text: producto.nombre
      });
   }
}

// =======================
// ELIMINAR PRODUCTO
// =======================
function eliminarProducto(id) {
   carrito.eliminar(id);
   actualizarContador();
   mostrarCarrito();
}

// =======================
// FINALIZAR COMPRA
// =======================
function finalizarCompra() {
   carrito.vaciar();
   actualizarContador();

   Swal.fire({
      icon: "success",
      title: "Compra realizada 💪",
      text: "Gracias por confiar en FitStore PRO"
   });
}

// =======================
// FILTRO POR CATEGORÍA
// =======================
function filtrarProductos() {

   const categoriaSeleccionada = filtroCategoria.value;

   if (categoriaSeleccionada === "todos") {
      renderProductos(productos);
   } else {
      const filtrados = productos.filter(
            p => p.categoria === categoriaSeleccionada
      );
      renderProductos(filtrados);
   }
}

// =======================
// EVENTOS
// =======================
contenedorProductos.addEventListener("click", e => {
   if (e.target.tagName === "BUTTON") {
      agregarProducto(e.target.dataset.id);
   }
});

botonCarrito.addEventListener("click", mostrarCarrito);
filtroCategoria.addEventListener("change", filtrarProductos);

// =======================
// INICIO
// =======================
document.addEventListener("DOMContentLoaded", () => {
   renderProductos(productos);
   actualizarContador();
});