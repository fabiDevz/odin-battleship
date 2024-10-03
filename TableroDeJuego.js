export default class TableroDeJuego {

    constructor() {
        this.tablero = Array(10).fill(null).map(() => Array(10).fill('A'));

    }

    setUbicarNavio(barco, coordenadas) {

        coordenadas.forEach(([posx,posy])=> {
            if(posx < 0 || posy < 0 || posx > 9 || posy > 9)
            {
                throw new Error("Error - No puedes colocar el navio aqui");
            }
        });

        coordenadas.forEach(([fila, columna]) => {
            this.tablero[fila][columna] = 'B';
        });
    }

    ataqueRecibido(coordenadaAtaque)
    {
        let posx = coordenadaAtaque[0];
        let posy = coordenadaAtaque[1];
       
        return this.tablero[posx][posy] == 'B' ? true : false;
    }

}