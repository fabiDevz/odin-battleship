export default class TableroDeJuego {

    constructor() {
        this.tablero = Array(10).fill(null).map(() => Array(10).fill('A'));
        this.listaNavios = [];
        this.mapaTirosFallidos = [];

    }

    getMapeoTirosFallidos()
    {
        return this.mapaTirosFallidos;
    }

    agregaTiroFallido(coordenadaAtaque)
    {
        this.mapaTirosFallidos.push(coordenadaAtaque);
    }

    setUbicarNavio(navio, coordenadas) {

        coordenadas.forEach(([posx,posy])=> {
            if(posx < 0 || posy < 0 || posx > 9 || posy > 9)
            {
                throw new Error("Error - No puedes colocar el navio aqui");
            }
        });

        coordenadas.forEach(([fila, columna]) => {
            this.tablero[fila][columna] = 'B';
        });

        this.listaNavios.push(navio);
        return true;
    }

    ataqueRecibido(coordenadaAtaque) {
        let posx = coordenadaAtaque[0];
        let posy = coordenadaAtaque[1];
    
        if (this.tablero[posx][posy] === 'B') {
            let navioImpactado = this.listaNavios.find((navio) => {
                return navio.coordenadas.some(([fila, columna]) => fila === posx && columna === posy);
            });
    
            if (navioImpactado) {
                navioImpactado.acierto();
                return true;
            }
        }
        this.agregaTiroFallido(coordenadaAtaque);
        return false;
    }

}