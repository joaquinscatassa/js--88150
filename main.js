// -------------------------------
// SIMULADOR DE RUTINAS DE ENTRENAMIENTO
// -------------------------------

// Constantes
const objetivosDisponibles = ["fuerza", "hipertrofia", "resistencia"];

// Array de ejercicios
const ejercicios = [
   { nombre: "Sentadilla", tipo: "fuerza" },
   { nombre: "Press banca", tipo: "fuerza" },
   { nombre: "Peso muerto", tipo: "fuerza" },
   { nombre: "Curl bíceps", tipo: "hipertrofia" },
   { nombre: "Extensión de tríceps", tipo: "hipertrofia" },
   { nombre: "Elevaciones laterales", tipo: "hipertrofia" },
   { nombre: "Burpees", tipo: "resistencia" },
   { nombre: "Saltos de soga", tipo: "resistencia" },
   { nombre: "Mountain climbers", tipo: "resistencia" }
];

// -------------------------------
// FUNCIÓN 1: Solicitar datos al usuario
// -------------------------------
function solicitarDatosUsuario() {
   let nombre = prompt("Bienvenido al simulador 💪\n\nIngrese su nombre:");
   let objetivo = prompt(
      "Hola " + nombre + " 👋\n\nIngrese su objetivo de entrenamiento:\n- fuerza\n- hipertrofia\n- resistencia"
   ).toLowerCase();

   return { nombre, objetivo };
}

// -------------------------------
// FUNCIÓN 2: Procesar la rutina según objetivo
// -------------------------------
function generarRutina(objetivo) {
   let rutina = [];

   for (let i = 0; i < ejercicios.length; i++) {
      if (ejercicios[i].tipo === objetivo) {
            rutina.push(ejercicios[i].nombre);
      }
   }

   return rutina;
}

// -------------------------------
// FUNCIÓN 3: Mostrar resultados
// -------------------------------
function mostrarResultado(nombre, objetivo, rutina) {
   if (rutina.length === 0) {
      alert(
            "Objetivo no válido ❌\n\nPor favor recargue la página e ingrese un objetivo correcto."
      );
   } else {
      let mensaje = 
            "Rutina recomendada para " + nombre + "\n\n" +
            "Objetivo: " + objetivo.toUpperCase() + "\n\n";

      for (let i = 0; i < rutina.length; i++) {
            mensaje += "- " + rutina[i] + "\n";
      }

      alert(mensaje);
      console.log("Rutina generada para", nombre);
      console.log("Objetivo:", objetivo);
      console.table(rutina);
   }
}

// -------------------------------
// FUNCIÓN PRINCIPAL (Invocación)
// -------------------------------
function iniciarSimulador() {
   let confirmar = confirm("¿Desea iniciar el simulador de rutinas?");

   if (confirmar) {
      const datos = solicitarDatosUsuario();
      const rutina = generarRutina(datos.objetivo);
      mostrarResultado(datos.nombre, datos.objetivo, rutina);
   } else {
      alert("Simulador cancelado. ¡Hasta la próxima!");
   }
}

// -------------------------------
// EJECUCIÓN
// -------------------------------
iniciarSimulador();
