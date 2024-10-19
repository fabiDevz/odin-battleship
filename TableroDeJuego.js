export default class TableroDeJuego {

    constructor() {
        this.tablero = Array(10).fill(null).map(() => Array(10).fill('A'));
        this.listaNavios = [];
        this.mapaTirosFallidos = [];
        this.status = true;
        this.flota = [5,4,3,2,2];
        this.selectorFlota = 0;

    }

    getHundidos()
    {
        let totalHundidos = 0;
        this.listaNavios.forEach(navio => {
            if(navio.hundido) totalHundidos++;
        })
        return totalHundidos;
    }

    getStatus()
    {
        let status = this.status? 'En progreso':'Terminado';
        let totalNavios = this.listaNavios.length;
        let totalHundidos = this.getHundidos();

        
        
        return "Navios: "+totalNavios+"\n"+"Hundidos: "+totalHundidos+"\n"+"Juego: "+status;
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
                this.status = this.getHundidos() == this.listaNavios.length? false:true;
                return true;
            }
        }
        this.agregaTiroFallido(coordenadaAtaque);
        return false;
    }

}