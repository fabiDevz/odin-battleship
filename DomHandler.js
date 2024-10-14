const tablero = document.getElementById('tablero-container');

export default function crearTableroUI() {
    const filas = 11;
    const columnas = 11;
    let letras = "ABCDEFGHIJ";

    for (let i = 0; i < filas; i++) {
        for (let j = 0; j < columnas; j++) {
            const celda = document.createElement('div');
            celda.classList.add('celda');
            celda.classList.add('celda-seleccionable')

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

            // Añadir evento click a cada celda
            celda.addEventListener('click', function() {
                alert(`Celda clickeada: Fila ${i}, Columna ${j}`);
            });

            tablero.appendChild(celda);
        }
    }
}

crearTableroUI();
