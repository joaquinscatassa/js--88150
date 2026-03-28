// =====================================
// FITSTORE PRO - CON FETCH JSON
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
// VARIABLES
// =======================
let productos = [];
const carrito = new Carrito();

const contenedorProductos = document.getElementById("productos");
const contadorCarrito = document.getElementById("contador");
const botonCarrito = document.getElementById("verCarrito");
const filtroCategoria = document.getElementById("filtroCategoria");

// =======================
// FETCH JSON (REQUISITO)
// =======================
async function cargarProductos() {

   const response = await fetch("./data/productos.json");

   const data = await response.json();

   productos = data.map(
      prod => new Producto(
            prod.id,
            prod.nombre,
            prod.precio,
            prod.categoria
      )
   );

   renderProductos(productos);
}

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
            <p>${producto.categoria}</p>
            <p>$${producto.precio}</p>
            <button data-id="${producto.id}">
               Agregar
            </button>
      `;

      contenedorProductos.appendChild(card);
   });
}

// =======================
// AGREGAR PRODUCTO
// =======================
function agregarProducto(id) {

   const producto = productos.find(p => p.id == id);

   carrito.agregar(producto);

   actualizarContador();

   Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: producto.nombre
   });
}

// =======================
// CONTADOR
// =======================
function actualizarContador() {

   contadorCarrito.textContent =
      carrito.productos.length;
}

// =======================
// MOSTRAR CARRITO
// =======================
function mostrarCarrito() {

   if (carrito.productos.length === 0) {

      Swal.fire({
            icon: "info",
            title: "Carrito vacío"
      });

      return;
   }

   let listaHTML = "";

   carrito.productos.forEach(prod => {

      listaHTML += `
            <li>
               ${prod.nombre} - $${prod.precio}
               <button onclick="eliminarProducto(${prod.id})">
                  ❌
               </button>
            </li>
      `;
   });

   Swal.fire({

      title: "Carrito",

      html: `
            <ul>
               ${listaHTML}
            </ul>

            <hr>

            Total:
            $${carrito.calcularTotal()}
      `,

      showCancelButton: true,

      confirmButtonText:
            "Finalizar compra"

   }).then(result => {

      if (result.isConfirmed) {

            finalizarCompra();

      }
   });
}

// =======================
// ELIMINAR
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

      title: "Compra realizada 💪"

   });
}

// =======================
// FILTRO
// =======================
function filtrarProductos() {

   const categoria =
      filtroCategoria.value;

   if (categoria === "todos") {

      renderProductos(productos);

      return;
   }

   const filtrados =
      productos.filter(p =>
            p.categoria === categoria
      );

   renderProductos(filtrados);
}

// =======================
// EVENTOS
// =======================
contenedorProductos.addEventListener(
   "click",
   e => {

      if (e.target.tagName === "BUTTON") {

            agregarProducto(
               e.target.dataset.id
            );
      }
   }
);

botonCarrito.addEventListener(
   "click",
   mostrarCarrito
);

filtroCategoria.addEventListener(
   "change",
   filtrarProductos
);

// =======================
// INICIO
// =======================
document.addEventListener(
   "DOMContentLoaded",
   () => {

        cargarProductos(); // fetch obligatorio

      actualizarContador();
   }
);