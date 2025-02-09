// Variables globales
let listaAmigos = [];
let emparejamientos = new Map();
let sorteoRealizado = false;

// Variables para controlar el mensaje visible del amigo secreto
let tiempoActivo = null;
let amigoActivo = null;
let botónActivo = null;

// Agrega un amigo a la lista (previene nombres vacíos o duplicados)
function agregarAmigo() {
  const input = document.getElementById("amigo");
  const nombre = input.value.trim();//trim() remueve los espacios en blanco. 
  if (nombre === "") {
    alert("Por favor, inserte un nombre.");
    return;
  }
  if (listaAmigos.includes(nombre)) {
    alert("Este nombre ya ha sido agregado.");
    return;
  }
  listaAmigos.push(nombre);
  input.value = "";
  actualizarListaAmigos();
}

// Elimina un amigo y refresca la lista; además, limpia el sorteo si se modifica la lista
function eliminarAmigo(nombre) {
  const indice = listaAmigos.indexOf(nombre);
  if (indice !== -1) {
    listaAmigos.splice(indice, 1);
  }
  // Si se estaba mostrando el mensaje de este amigo, se oculta
  if (amigoActivo === nombre) {
    ocultarMensajeAmigoSecreto(nombre, botónActivo);
  }
  actualizarListaAmigos();
  sorteoRealizado = false;
  emparejamientos.clear();
}

// Actualiza la lista en el DOM
function actualizarListaAmigos() {
  let listaHTML = "";
  listaAmigos.forEach((amigo) => {
    listaHTML += `
      <li>
        <div class="nombre-botones">
          <span>${amigo}</span>
          <div>
            <button class="button-remove" onclick="eliminarAmigo('${amigo}')">Eliminar</button>
            <button class="button-eye" onclick="alternarAmigoSecreto('${amigo}', this)">Mostrar amigo secreto</button>
          </div>
        </div>
        <div class="mensaje-container" id="mensaje-${amigo}">
          <div class="mensaje-amigo-secreto"></div>
        </div>
      </li>`;
  });
  document.getElementById("listaAmigos").innerHTML = listaHTML;
}

// Alterna la visualización del mensaje del amigo secreto de forma temporal.
// Si hay un mensaje activo de otro amigo, se oculta antes de mostrar el nuevo.
function alternarAmigoSecreto(amigo, botón) {
  if (!sorteoRealizado) {
    alert("Primero realice el sorteo.");
    return;
  }
  
  // Si hay otro mensaje activo, lo oculta
  if (amigoActivo && amigoActivo !== amigo) {
    ocultarMensajeAmigoSecreto(amigoActivo, botónActivo);
  }
  
  const contenedorMensaje = document.getElementById(`mensaje-${amigo}`);
  const divMensaje = contenedorMensaje.querySelector(".mensaje-amigo-secreto");
  
  if (contenedorMensaje.classList.contains("active")) {
    // Si el mensaje ya se está mostrando, se oculta
    ocultarMensajeAmigoSecreto(amigo, botón);
  } else {
    const amigoSecreto = emparejamientos.get(amigo);
    if (!amigoSecreto) {
      alert("No se encontró un amigo secreto para este nombre.");
      return;
    }
    divMensaje.textContent = `${amigo}, tu amigo secreto es ${amigoSecreto}. ¡Guarda el secreto! 😉`;
    contenedorMensaje.classList.add("active");
    botón.textContent = "Ocultar amigo secreto";
    amigoActivo = amigo;
    botónActivo = botón;
    // Oculta el mensaje automáticamente después de 5 segundos
    tiempoActivo = setTimeout(() => {
      ocultarMensajeAmigoSecreto(amigo, botón);
    }, 3000);
  }
}

// Función auxiliar para ocultar el mensaje del amigo secreto
function ocultarMensajeAmigoSecreto(amigo, botón) {
  const contenedorMensaje = document.getElementById(`mensaje-${amigo}`);
  contenedorMensaje.classList.remove("active");
  if (botón) {
    botón.textContent = "Mostrar amigo secreto";
  }
  amigoActivo = null;
  botónActivo = null;
  if (tiempoActivo) {
    clearTimeout(tiempoActivo);
    tiempoActivo = null;
  }
}

// Realiza el sorteo asignando a cada amigo otro amigo al azar (sin asignarse a sí mismo)
function sortearAmigo() {
  if (listaAmigos.length < 2) {
    alert("Debe haber al menos 2 amigos para sortear.");
    return;
  }

  // Reproduce el sonido del sorteo
  const sonido = document.getElementById("sonidoSorteo");
  sonido.play();

  let copiaLista = [...listaAmigos];
  let desordenado = [];
  let intentos = 0;
  const maxIntentos = 1000;

  // Se asegura de que nadie se asigne a sí mismo
  do {
    desordenado = [...copiaLista].sort(() => Math.random() - 0.5);
    intentos++;
    if (intentos >= maxIntentos) {
      alert("No se pudo realizar el sorteo. Inténtalo de nuevo.");
      return;
    }
  } while (desordenado.some((amigo, index) => amigo === listaAmigos[index]));

  emparejamientos.clear();
  for (let i = 0; i < listaAmigos.length; i++) {
    emparejamientos.set(listaAmigos[i], desordenado[i]);
  }
  
  sorteoRealizado = true;
  alert("El sorteo se ha realizado correctamente.");
}
