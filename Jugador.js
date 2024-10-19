import TableroDeJuego from './TableroDeJuego.js';

export default class Jugador{
    
    constructor(tipo, tablero = new TableroDeJuego(), nombre = "Jugador 1")
    {
        this.nombre = nombre;
        this.tipo = tipo;
        this.tablero = tablero;
    }

    getTablero()
    {
        return this.tablero;
    }
}