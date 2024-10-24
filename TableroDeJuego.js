import Navio from "./Navio.js";

export default class TableroDeJuego {

    constructor() {
        this.tablero = Array(10).fill(null).map(() => Array(10).fill('A'));
        this.listaNavios = [];
        this.mapaTirosFallidos = [];
        this.status = true;
        this.flota = [5, 4, 3, 2, 2];
        this.selectorFlota = 0;

    }

    getHundidos() {
        let totalHundidos = 0;
        this.listaNavios.forEach(navio => {
            if (navio.hundido) totalHundidos++;
        })
        return totalHundidos;
    }

    getStatus() {
        let status = this.status ? 'En progreso' : 'Terminado';
        let totalNavios = this.listaNavios.length;
        let totalHundidos = this.getHundidos();



        return "Navios: " + totalNavios + "\n" + "Hundidos: " + totalHundidos + "\n" + "Juego: " + status;
    }

    getMapeoTirosFallidos() {
        return this.mapaTirosFallidos;
    }

    agregaTiroFallido(coordenadaAtaque) {
        this.mapaTirosFallidos.push(coordenadaAtaque);
    }

    setUbicarNavio(navio, coordenadas) {

        coordenadas.forEach(([posx, posy]) => {
            if (posx < 0 || posy < 0 || posx > 9 || posy > 9) {
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
                this.status = this.getHundidos() == this.listaNavios.length ? false : true;
                return true;
            }
        }
        this.agregaTiroFallido(coordenadaAtaque);
        return false;
    }

    ubicarAlAzar() {
        const coordenadasOcupadas = new Set();  
        for (let i = 0; i < this.flota.length; i++) {
            let coordenadas = [];
            let fila, columna;
            let tamanoBarco = this.flota[i];
            let valido = false;
    
            // Bucle para asegurarse de que el barco no colisiona con otro
            while (!valido) {
                fila = Math.floor(Math.random() * 10);  
                do {
                    columna = Math.floor(Math.random() * 10);
                } while (9 - columna < tamanoBarco);  // Asegura que no sobrepase el borde
    
                // Genera las coordenadas posibles para el barco
                let colision = false;
                for (let j = 0; j < tamanoBarco; j++) {
                    const coord = `${fila},${columna + j}`; // Combina fila y columna como string
                    if (coordenadasOcupadas.has(coord)) {
                        colision = true;
                        break;  // Si colisiona, salir del bucle
                    }
                }
    
                if (!colision) {
                    for (let j = 0; j < tamanoBarco; j++) {
                        const coord = `${fila},${columna + j}`;
                        coordenadas.push([fila, columna + j]);
                        coordenadasOcupadas.add(coord); 
                    }
                    valido = true;  
                }
            }
            switch (tamanoBarco) {
                case 5:
                    let portaAviones = new Navio(5, 0, false, 'Porta Aviones');
                    this.setUbicarNavio(portaAviones, coordenadas);
                    break;

                case 4:
                    let acorazado = new Navio(4, 0, false, 'Acorazado');
                    this.setUbicarNavio(acorazado, coordenadas);
                    break;

                case 3:
                    let bombardero = new Navio(3, 0, false, 'Bombardero');
                    this.setUbicarNavio(bombardero, coordenadas);
                    break;
                case 2:
                    let submarino = new Navio(2, 0, false, 'Submarino');
                    this.setUbicarNavio(submarino, coordenadas);
                    break;
                default:
                    alert('Algo salio mal :c');
                    break;
            }
    
            this.selectorFlota++;
            console.log(`Coordenadas para el barco de tamaño ${tamanoBarco}:`, coordenadas);
        }
    }
    
    

}