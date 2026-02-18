// -------------------------------
// SIMULADOR DE RUTINAS - ENTREGA 2
// -------------------------------

// Array de ejercicios
const ejercicios = [
   { nombre: "Sentadilla", tipo: "fuerza" },
   { nombre: "Press banca", tipo: "fuerza" },
   { nombre: "Peso muerto", tipo: "fuerza" },
   { nombre: "Curl bíceps", tipo: "hipertrofia" },
   { nombre: "Extensión tríceps", tipo: "hipertrofia" },
   { nombre: "Elevaciones laterales", tipo: "hipertrofia" },
   { nombre: "Burpees", tipo: "resistencia" },
   { nombre: "Soga", tipo: "resistencia" },
   { nombre: "Mountain climbers", tipo: "resistencia" }
];

// Recuperar historial desde LocalStorage
let historialRutinas = JSON.parse(localStorage.getItem("historial")) || [];

// Elementos del DOM
const form = document.getElementById("formRutina");
const resultadoDiv = document.getElementById("resultado");
const historialDiv = document.getElementById("historial");

// -------------------------------
// FUNCIÓN: Generar rutina
// -------------------------------
function generarRutina(objetivo) {
   return ejercicios.filter(ejercicio => ejercicio.tipo === objetivo);
}

// -------------------------------
// FUNCIÓN: Mostrar rutina en DOM
// -------------------------------
function mostrarRutina(nombre, objetivo, rutina) {

   resultadoDiv.innerHTML = "";

   const titulo = document.createElement("h2");
   titulo.textContent = `Rutina para ${nombre} - ${objetivo.toUpperCase()}`;
   resultadoDiv.appendChild(titulo);

   const lista = document.createElement("ul");

   rutina.forEach(ejercicio => {
      const li = document.createElement("li");
      li.textContent = ejercicio.nombre;
      lista.appendChild(li);
   });

   resultadoDiv.appendChild(lista);
}

// -------------------------------
// FUNCIÓN: Guardar en LocalStorage
// -------------------------------
function guardarEnStorage(rutinaObj) {
   historialRutinas.push(rutinaObj);
   localStorage.setItem("historial", JSON.stringify(historialRutinas));
}

// -------------------------------
// FUNCIÓN: Mostrar historial
// -------------------------------
function mostrarHistorial() {
   historialDiv.innerHTML = "";

   historialRutinas.forEach(rutina => {
      const card = document.createElement("div");
      card.innerHTML = `
            <strong>${rutina.nombre}</strong> - ${rutina.objetivo}
            <ul>
               ${rutina.ejercicios.map(e => `<li>${e}</li>`).join("")}
            </ul>
      `;
      historialDiv.appendChild(card);
   });
}

// -------------------------------
// EVENTO SUBMIT
// -------------------------------
form.addEventListener("submit", function (e) {
   e.preventDefault();

   const nombre = document.getElementById("nombre").value.trim();
   const objetivo = document.getElementById("objetivo").value;

   if (nombre === "" || objetivo === "") {
      return;
   }

   const rutinaGenerada = generarRutina(objetivo);

   mostrarRutina(nombre, objetivo, rutinaGenerada);

   const rutinaObj = {
      nombre: nombre,
      objetivo: objetivo,
      ejercicios: rutinaGenerada.map(e => e.nombre)
   };

   guardarEnStorage(rutinaObj);
   mostrarHistorial();

   form.reset();
});

// Mostrar historial al cargar la página
document.addEventListener("DOMContentLoaded", mostrarHistorial);
