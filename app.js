let listaAmigos = [];
let emparejamientos = new Map();
let sorteoRealizado = false;

function agregarAmigo() {
    let nombre = document.getElementById("amigo").value.trim();
    if (nombre === "") {
        alert("Por favor, inserte un nombre.");
        return;
    }
    if (listaAmigos.includes(nombre)) {
        alert("Este nombre ya ha sido agregado.");
        return;
    }
    listaAmigos.push(nombre);
    document.getElementById("amigo").value = "";
    actualizarListaAmigos();
}

function eliminarAmigo(nombre) {
    let index = listaAmigos.indexOf(nombre);
    if (index !== -1) {
        listaAmigos.splice(index, 1);
    }
    actualizarListaAmigos();
    sorteoRealizado = false;
    emparejamientos.clear();
}

function actualizarListaAmigos() {
    let listaAmigosHTML = "";
    listaAmigos.forEach((amigo) => {
        listaAmigosHTML += `
            <li>
                ${amigo}
                <button class="button-remove" onclick="eliminarAmigo('${amigo}')">Eliminar</button>
                <button class="button-eye" onclick="mostrarOcultarAmigoSecreto('${amigo}')">👁️</button>
                <div class="mensaje-amigo-secreto" id="mensaje-${amigo}"></div>
            </li>`;
    });
    document.getElementById("listaAmigos").innerHTML = listaAmigosHTML;
}

function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("Debe haber al menos 2 amigos para sortear.");
        return;
    }

    // Reproducir sonido mágico
    let sonido = document.getElementById("sonidoSorteo");
    sonido.play();

    let copiaLista = [...listaAmigos];
    let desordenado = [];
    let intentos = 0;
    const maxIntentos = 1000; // Límite de intentos para evitar bucles infinitos

    // Algoritmo para evitar asignaciones a sí mismo
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
    alert("El sorteo ha sido realizado correctamente.");
}

function mostrarOcultarAmigoSecreto(amigo) {
    if (!sorteoRealizado) {
        alert("Primero realice el sorteo.");
        return;
    }

    let mensaje = document.getElementById(`mensaje-${amigo}`);
    if (mensaje.style.display === "none" || mensaje.style.display === "") {
        let amigoSecreto = emparejamientos.get(amigo);
        if (amigoSecreto) {
            mensaje.textContent = `${amigo}, tu amigo secreto es ${amigoSecreto}. ¡Guarda el secreto! 😉`;
            mensaje.style.display = "block";
        } else {
            alert("No se encontró un amigo secreto para este nombre.");
        }
    } else {
        mensaje.style.display = "none";
    }
}