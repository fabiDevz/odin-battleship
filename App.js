import TableroDeJuego from "./TableroDeJuego.js";
import Navio from "./Navio.js";
import Jugador from "./Jugador.js";

let organizarFlota = false;

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

            // Validar ancho horizontal
            if (columnaActual + tamanoBarco > columnas) {
                alert('No puedes colocar el navio aqui');
                jugador1.tablero.selectorFlota--;
            } else {
                let coordenadas = [];
                for (let i = 0; i < tamanoBarco; i++) {
                    if (celdas[index + i]) {
                        celdas[index + i].classList.remove('celda-seleccionable');
                        celdas[index + i].classList.add('celda-ocupada');

                        // Ocupar celdas
                        let posicion = [filaActual, index + i];
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


            //2 - validar que no se ocupen las mismas celdas  (traslapado de navios)

            console.log('selector : ' + jugador1.tablero.selectorFlota);
        });

        celda.addEventListener('mouseover', function () {
            let indiceFlota = jugador1.tablero.selectorFlota;
            let tamanoBarco = jugador1.tablero.flota[indiceFlota];
            let columnaActual = index % columnas;
            if (columnaActual + tamanoBarco > columnas) {
                // Si sobrepasa, pintar en rojo las celdas disponibles
                for (let i = 0; i < tamanoBarco; i++) {
                    if (celdas[index + i]) {
                        celdas[index + i].classList.add('hover-error'); // Clase para indicar el error
                    }
                }
            } else {
                // Si no sobrepasa, aplicar el hover normal
                for (let i = 0; i < tamanoBarco; i++) {
                    if (celdas[index + i]) {
                        celdas[index + i].classList.add('hover');
                    }
                }
            }
        });

        celda.addEventListener('mouseout', function () {
            let tamanoBarco = jugador1.tablero.flota[jugador1.tablero.selectorFlota];
            removerClasesHover(celdas, index, tamanoBarco);
        });
    });



}

function removerClasesHover(celdas, index, tamanoBarco) {
    for (let i = 0; i < tamanoBarco; i++) {
        if (celdas[index + i]) {
            celdas[index + i].classList.remove('hover');
            celdas[index + i].classList.remove('hover-error');
        }
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


const jugador1 = new Jugador("Humano");
let portaAviones = new Navio(5, 0, false, 'Porta Aviones');
let acorazado = new Navio(4, 0, false, 'Acorazado');
let bombardero = new Navio(3, 0, false, 'Bombardero');
let submarino = new Navio(2, 0, false, 'Submarino');


crearMenuInicio();