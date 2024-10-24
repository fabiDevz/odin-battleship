import TableroDeJuego from "./TableroDeJuego.js";
import Navio from "./Navio.js";
import Jugador from "./Jugador.js";

let organizarFlota = false;
let espacioSuficiente = true;
let flotasEnemigas = [
    'Imperio Destructor',
    'Armada Oscura',
    'Corsarios del Caos',
    'Legión del Terror',
    'Horda Necrópolis',
    'Flota Espectral',
    'Guardián de las Sombras',
    'Dragón de los Mares',
    'Piratas de la Tormenta',
    'Dominio del Abismo'
];



function crearTableroUI() {
    const filas = 11;
    const columnas = 11;
    let letras = "ABCDEFGHIJ";
    const body = document.body;

    const divContainer = document.createElement("div");
    divContainer.classList.add("tablero-container");
    divContainer.id = "tablero-container";

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const celda = document.createElement('div');
            celda.classList.add('celda');
            celda.classList.add('celda-seleccionable');

            if (i === 0 && j === 0) {
                celda.classList.add('celda-primera-fila');
                celda.classList.remove('celda-seleccionable');
            }

            if (i === 0 && j > 0) {
                celda.textContent = j;
                celda.classList.add('celda-primera-fila');
                celda.classList.remove('celda-seleccionable');
            } else if (j === 0 && i > 0) {
                celda.textContent = letras.charAt(i - 1);
                celda.classList.add('celda-primera-columna');
                celda.classList.remove('celda-seleccionable');
            }



            divContainer.appendChild(celda);
        }
    }

    body.appendChild(divContainer);
    body.classList.remove('mode-menu');
    body.classList.add('mode-game');
}

function crearMenuInicio() {

    const body = document.body;

    const titulo = document.createElement('h1');
    const divOpciones = document.createElement('div');
    const divNombre = document.createElement('div');
    const divComenzar = document.createElement('div');

    titulo.textContent = 'BATTLESHIP';
    divNombre.textContent = "< " + jugador1.nombre + " >";
    divComenzar.textContent = "< " + "Comenzar" + " >";

    divOpciones.classList.add('container-menu');
    divNombre.classList.add('option');
    divComenzar.classList.add('option');
    divNombre.addEventListener('click', function () {
        const inputNombre = document.createElement('input');
        inputNombre.type = 'text';
        inputNombre.value = divNombre.textContent;
        inputNombre.classList.add('option');
        inputNombre.focus();

        inputNombre.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                divNombre.textContent = "< " + inputNombre.value + " >";
                jugador1.nombre = inputNombre.value;
                inputNombre.replaceWith(divNombre);

            }
        });

        inputNombre.addEventListener('blur', function () {
            divNombre.textContent = "< " + inputNombre.value + " >";
            jugador1.nombre = inputNombre.value;
            inputNombre.replaceWith(divNombre);


        });
        divNombre.replaceWith(inputNombre);

    });

    divComenzar.addEventListener('click', function () {
        organizarFlota = true;
        setFlotaJugador();
    })

    divOpciones.appendChild(titulo);
    divOpciones.appendChild(divNombre);
    divOpciones.appendChild(divComenzar);

    body.classList.remove('mode-game');
    body.classList.add('mode-menu');
    body.appendChild(divOpciones);




}

function limpiarDOM() {
    const body = document.body;
    body.innerHTML = '';
}

function configurarTablero() {
    const celdas = document.querySelectorAll('.celda-seleccionable');
    const columnas = 10;

    celdas.forEach((celda, index) => {

        celda.addEventListener('click', function () {
            let indiceFlota = jugador1.tablero.selectorFlota;
            let tamanoBarco = jugador1.tablero.flota[indiceFlota];
            let columnaActual = index % columnas;
            let filaActual = Math.floor(index / 10);

            // Validar ancho horizontal y que las celdas no esten ocupadas
            if (columnaActual + tamanoBarco > columnas || validarCeldasLibres(celdas, index, tamanoBarco) || espacioSuficiente == false) {
                alert('No puedes colocar el navio aqui');
                jugador1.tablero.selectorFlota--;
            } else {
                let coordenadas = [];
                for (let i = 0; i < tamanoBarco; i++) {
                    if (celdas[index + i]) {
                        celdas[index + i].classList.remove('celda-seleccionable');
                        celdas[index + i].classList.add('celda-ocupada');

                        // Ocupar celdas

                        let posicion = [filaActual, (index + i) % 10];
                        coordenadas.push(posicion);
                    }
                }

                switch (tamanoBarco) {
                    case 5:
                        jugador1.tablero.setUbicarNavio(portaAviones, coordenadas);
                        break;

                    case 4:
                        jugador1.tablero.setUbicarNavio(acorazado, coordenadas);
                        break;

                    case 3:
                        jugador1.tablero.setUbicarNavio(bombardero, coordenadas);
                        break;
                    case 2:
                        jugador1.tablero.setUbicarNavio(submarino, coordenadas);
                        break;
                    default:
                        alert('Algo salio mal :c');
                        break;
                }

            }
            if (organizarFlota) jugador1.tablero.selectorFlota++;
            removerClasesHover(celdas, index, tamanoBarco);

            if (jugador1.tablero.selectorFlota === 5) {
                removerCeldasSeleccionables();
            }
        });

        celda.addEventListener('mouseover', function () {
            let indiceFlota = jugador1.tablero.selectorFlota;
            let tamanoBarco = jugador1.tablero.flota[indiceFlota];
            let columnaActual = index % columnas;

            // Verifica si el barco se pasa del límite derecho
            if (columnaActual + tamanoBarco > columnas) {
                espacioSuficiente = false;
                // Pintar en rojo las celdas que se salen del tablero
                for (let i = 0; i < tamanoBarco; i++) {
                    if (celdas[index + i]) {
                        celdas[index + i].classList.add('hover-error'); // Clase para indicar el error
                    }
                }
            } else {
                // Si no sobrepasa el borde derecho, verifica si las celdas están libres
                for (let i = 0; i < tamanoBarco; i++) {
                    if (celdas[index + i]) {
                        if (celdas[index + i].classList.contains('celda-ocupada')) {
                            // Si alguna celda está ocupada, marcar error
                            espacioSuficiente = false;
                            celdas[index + i].classList.add('hover-error'); // Clase para indicar el error
                        } else {
                            celdas[index + i].classList.add('hover'); // Resaltar celdas libres
                        }
                    }
                }
            }

            // Deshabilitar la colocación del barco si no hay espacio suficiente
            if (!espacioSuficiente) {
                console.log("No se puede colocar el barco aquí.");
                // Aquí podrías añadir más lógica para deshabilitar la acción de colocar el barco
            }
        });
        celda.addEventListener('mouseout', function () {
            let tamanoBarco = jugador1.tablero.flota[jugador1.tablero.selectorFlota];
            espacioSuficiente = true;
            removerClasesHover(celdas, index, tamanoBarco);
        });


    });



}

function removerCeldasSeleccionables() {
    const body = document.body;
    const celdas = document.querySelectorAll('.celda-seleccionable');

    celdas.forEach((celda) => {
        celda.classList.remove('celda-seleccionable');
    });

    const divComenzar = document.createElement('div');
    const btnComenzar = document.createElement('button');

    btnComenzar.textContent = 'Comenzar juego';
    btnComenzar.classList.add('btn-comenzar-juego');
    divComenzar.classList.add('div-comenzar-juego');
    btnComenzar.addEventListener('click', function () {
        comenzarJuego();
    })
    divComenzar.appendChild(btnComenzar);
    body.appendChild(divComenzar);
}

function removerClasesHover(celdas, index, tamanoBarco) {
    for (let i = 0; i < tamanoBarco; i++) {
        if (celdas[index + i]) {
            celdas[index + i].classList.remove('hover');
            celdas[index + i].classList.remove('hover-error');
        }
    }
}

function validarCeldasLibres(celdas, index, tamanoBarco) {

    for (let i = 0; i < tamanoBarco; i++) {
        const celdaActual = celdas[index + i];

        if (celdaActual) {
            // Verifica si la celda ya está ocupada
            if (celdaActual.classList.contains('celda-ocupada')) {
                // Marca el error y resalta las celdas en rojo
                celdaActual.classList.add('hover-error');
                return true;
            } else {
                // Remueve cualquier clase de hover o error
                celdaActual.classList.remove('hover');
                celdaActual.classList.remove('hover-error');
            }
        }
        return false;
    }
}

function setFlotaJugador() {
    limpiarDOM();
    const body = document.body;
    const divInfo = document.createElement('div');
    const h1Info = document.createElement('h1');
    h1Info.textContent = "BATTLESHIP - Organiza tu flota";
    divInfo.classList.add('div-titulo-flota');
    divInfo.appendChild(h1Info);
    body.appendChild(divInfo);
    crearTableroUI();
    configurarTablero();
}

function comenzarJuego() {
    limpiarDOM();
    const body = document.body;

    const divJugador = document.createElement('div');
    const divCpu = document.createElement('div');
    const divTurnos = document.createElement('div');
    divJugador.classList.add('div-jugador');
    divCpu.classList.add('div-cpu');
    divTurnos.classList.add('div-turnos');

    const tituloJugador = document.createElement('h2');
    tituloJugador.textContent = jugador1.nombre;

    const tituloCpu = document.createElement('h2');
    tituloCpu.textContent = flotasEnemigas[Math.floor(Math.random() * 10)];

    const infoJugador = document.createElement('span');
    const infoCpu = document.createElement('span');

    infoJugador.textContent = "Disparos : \nPrecisión: 100%";
    infoCpu.textContent = "Disparos : \nPrecisión: 80%";

    const infoTurnos = document.createElement('h2');
    infoTurnos.textContent = "Ahora es el turno de " + jugador1.nombre;

    divJugador.appendChild(tituloJugador);
    divJugador.appendChild(infoJugador);
    divCpu.appendChild(tituloCpu);
    divCpu.appendChild(infoCpu);
    divTurnos.appendChild(infoTurnos);

    crearTablero(divJugador, 'jugador');
    crearTablero(divCpu, 'cpu');

    body.appendChild(divJugador);
    body.appendChild(divCpu);
    body.appendChild(divTurnos);

    body.classList.add('grid-container-comenzar-juego');

    jugadorCpu.tablero.ubicarAlAzar();

    revelarPosiciones(jugador1.tablero.tablero);
}

function crearTablero(parentDiv, tipo = "default") {
    const filas = 11;
    const columnas = 11;
    let letras = "ABCDEFGHIJ";

    // Crear el contenedor del tablero
    const divContainer = document.createElement("div");
    divContainer.classList.add("tablero-container");
    divContainer.id = "tablero-container";

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const celda = document.createElement('div');
            celda.classList.add('celda');
            celda.classList.add('celda-seleccionable');

            if (i === 0 && j === 0) {
                celda.classList.add('celda-primera-fila');
                celda.classList.remove('celda-seleccionable');
            }

            if (i === 0 && j > 0) {
                celda.textContent = j;
                celda.classList.add('celda-primera-fila');
                celda.classList.remove('celda-seleccionable');
            } else if (j === 0 && i > 0) {
                celda.textContent = letras.charAt(i - 1);
                celda.classList.add('celda-primera-columna');
                celda.classList.remove('celda-seleccionable');
            }

            divContainer.appendChild(celda);
        }
    }
    if (tipo == 'jugador') {
        divContainer.classList.add('tablero-container-jugador');
    } else {
        if (tipo == 'cpu') {
            divContainer.classList.add('tablero-container-cpu');
        }
    }
    // Asignar el tablero al div padre recibido como parámetro
    parentDiv.appendChild(divContainer);
}


function revelarPosiciones(tablero) {
    for (let fila = 0; fila < tablero.length; fila++) {
        for (let columna = 0; columna < tablero[fila].length; columna++) {

            if (tablero[fila][columna] === 'B') {
                console.log('Barco coordenada : (' + fila + "," + columna + ")");
            }
        }
    }

    const divJugador = document.querySelector('.tablero-container-jugador');
    const celdasDivJugador = divJugador.querySelectorAll('.celda-seleccionable');

    celdasDivJugador.forEach((celda,index) => {
        let filaCelda = Math.floor(index / 10);  
        let columnaCelda = index % 10; 
        
        for (let fila = 0; fila < tablero.length; fila++) {
            for (let columna = 0; columna < tablero[fila].length; columna++) {
    
                if (tablero[fila][columna] === 'B' && fila == filaCelda && columnaCelda == columna) {
                    celda.classList.add('resaltada');
                }
            }
        }
    
        
    });


}
const jugador1 = new Jugador("Humano");
const jugadorCpu = new Jugador("Cpu");
let portaAviones = new Navio(5, 0, false, 'Porta Aviones');
let acorazado = new Navio(4, 0, false, 'Acorazado');
let bombardero = new Navio(3, 0, false, 'Bombardero');
let submarino = new Navio(2, 0, false, 'Submarino');


crearMenuInicio();