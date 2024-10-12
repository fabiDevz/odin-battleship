export default class Jugador{
    
    constructor(tipo, tablero)
    {
        this.tipo = tipo;
        this.tablero = tablero;
    }

    getTablero()
    {
        return this.tablero;
    }
}