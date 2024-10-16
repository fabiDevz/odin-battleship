import TableroDeJuego from "./TableroDeJuego.js";
import Navio from "./Navio.js";
import Jugador from "./Jugador.js";

export function crearTableroUI() {
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

            celda.addEventListener('click', function () {
                if (celda.classList.contains('celda-seleccionable')) {
                    alert(`Celda clickeada: Fila ${letras.charAt(i - 1)}, Columna ${j}`);
                }

            });

            divContainer.appendChild(celda);
        }
    }

    body.appendChild(divContainer);
    body.classList.remove('mode-menu');
    body.classList.add('mode-game');
}

export function crearMenuInicio(callbackIniciarJuego) {

    const body = document.body;

    const titulo = document.createElement('h1');
    const divOpciones = document.createElement('div');
    const divNombre = document.createElement('div');
    const divComenzar = document.createElement('div');

    titulo.textContent = 'BATTLESHIP';
    divNombre.textContent = "< " + "Jugador 1" + " >";
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
                divNombre.textContent ="< " + inputNombre.value+ " >";
                inputNombre.replaceWith(divNombre);
            }
        });

        inputNombre.addEventListener('blur', function () {
            divNombre.textContent = "< " + inputNombre.value + " >";
            inputNombre.replaceWith(divNombre);
        });
        divNombre.replaceWith(inputNombre);

    });

    divComenzar.addEventListener('click', function() {
        body.innerHTML = ''; 
        if (typeof callbackIniciarJuego === 'function') {
            callbackIniciarJuego();  
        } else {
            console.error("callbackIniciarJuego no está definido correctamente.");
        }
    });

    divOpciones.appendChild(titulo);
    divOpciones.appendChild(divNombre);
    divOpciones.appendChild(divComenzar);

    body.classList.remove('mode-game');
    body.classList.add('mode-menu');
    body.appendChild(divOpciones);

  


}

export function limpiarDOM() {
    const body = document.body;
    body.innerHTML = '';
}