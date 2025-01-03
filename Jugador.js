import TableroDeJuego from './TableroDeJuego.js';

export default class Jugador{
    
    constructor(tipo, tablero = new TableroDeJuego(), nombre = "Jugador 1")
    {
        this.nombre = nombre;
        this.tipo = tipo;
        this.tablero = tablero;
        this.disparosRealizados = new Set();
    }

    getTablero()
    {
        return this.tablero;
    }

    generarDisparo() {
        let fila, columna;
        let coordenada_disparo ;
        do {
            fila = Math.floor(Math.random() * (10 - 1 + 1) + 1); // Algoritmo para obtener un número entre 1  y 10 
            columna = Math.floor(Math.random() * (10 - 1 + 1) + 1);
            coordenada_disparo = `${fila},${columna}`;
        } while (this.disparosRealizados.has(coordenada_disparo));

        // Almacena el disparo
        this.disparosRealizados.add(coordenada_disparo);

        console.log(`El CPU disparó en: Fila ${fila}, Columna ${columna}`);
        return [fila, columna];
    }
}