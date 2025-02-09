// Variables globales
let listaAmigos = [];
let emparejamientos = new Map();
let sorteoRealizado = false;

// Variables para controlar el mensaje visible de amigo secreto
let activeTimeout = null;
let activeFriend = null;
let activeButton = null;

// Agrega un amigo a la lista (previene nombres vacíos o duplicados)
function agregarAmigo() {
  const input = document.getElementById("amigo");
  const nombre = input.value.trim();
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
  const index = listaAmigos.indexOf(nombre);
  if (index !== -1) {
    listaAmigos.splice(index, 1);
  }
  // Si se estaba mostrando el mensaje de este amigo, se oculta
  if (activeFriend === nombre) {
    hideSecretMessage(nombre, activeButton);
  }
  actualizarListaAmigos();
  sorteoRealizado = false;
  emparejamientos.clear();
}

// Actualiza la lista en el DOM
function actualizarListaAmigos() {
  let listaAmigosHTML = "";
  listaAmigos.forEach((amigo) => {
    listaAmigosHTML += `
      <li>
        <div class="nombre-botones">
          <span>${amigo}</span>
          <div>
            <button class="button-remove" onclick="eliminarAmigo('${amigo}')">Eliminar</button>
            <button class="button-eye" onclick="toggleSecretFriend('${amigo}', this)">Mostrar amigo secreto</button>
          </div>
        </div>
        <div class="mensaje-container" id="mensaje-${amigo}">
          <div class="mensaje-amigo-secreto"></div>
        </div>
      </li>`;
  });
  document.getElementById("listaAmigos").innerHTML = listaAmigosHTML;
}

// Muestra u oculta el mensaje del amigo secreto de forma temporal.
// Si hay un mensaje activo de otro amigo, se oculta antes de mostrar el nuevo.
function toggleSecretFriend(amigo, boton) {
  if (!sorteoRealizado) {
    alert("Primero realice el sorteo.");
    return;
  }
  
  // Si hay otro mensaje activo, lo oculta
  if (activeFriend && activeFriend !== amigo) {
    hideSecretMessage(activeFriend, activeButton);
  }
  
  const mensajeContainer = document.getElementById(`mensaje-${amigo}`);
  const mensajeDiv = mensajeContainer.querySelector(".mensaje-amigo-secreto");
  
  if (mensajeContainer.classList.contains("active")) {
    // Si el mensaje ya se está mostrando, se oculta
    hideSecretMessage(amigo, boton);
  } else {
    const amigoSecreto = emparejamientos.get(amigo);
    if (!amigoSecreto) {
      alert("No se encontró un amigo secreto para este nombre.");
      return;
    }
    mensajeDiv.textContent = `${amigo}, tu amigo secreto es ${amigoSecreto}. ¡Guarda el secreto! 😉`;
    mensajeContainer.classList.add("active");
    boton.textContent = "Ocultar amigo secreto";
    activeFriend = amigo;
    activeButton = boton;
    // Oculta el mensaje automáticamente después de 5 segundos
    activeTimeout = setTimeout(() => {
      hideSecretMessage(amigo, boton);
    }, 5000);
  }
}

// Función auxiliar para ocultar el mensaje de un amigo secreto
function hideSecretMessage(amigo, boton) {
  const mensajeContainer = document.getElementById(`mensaje-${amigo}`);
  mensajeContainer.classList.remove("active");
  if (boton) {
    boton.textContent = "Mostrar amigo secreto";
  }
  activeFriend = null;
  activeButton = null;
  if (activeTimeout) {
    clearTimeout(activeTimeout);
    activeTimeout = null;
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
