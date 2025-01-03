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

        console.log("Te colocamos el navio y que tanto");
        navio.setCoordenadas(coordenadas);
        this.listaNavios.push(navio);
        return true;
    }
    // formato de la coordenada ? --->  [fila,columna]
    ataqueRecibido(coordenadaAtaque) {
        let posx = coordenadaAtaque[0] - 1 ;
        let posy = coordenadaAtaque[1] - 1;

      //  console.log('posx:'+posx, 'posy:'+posy);
     //   console.table(this.tablero);
     // las coordenadas del navio estan llegando undefined : ~ 28 de diciembre 

        if (this.tablero[posx][posy] === 'B') {
            let navioImpactado = this.listaNavios.find((navio) => {
                console.log("Coordenadas navio : "+navio.coordenadas[0]);
                return navio.coordenadas.some(([fila, columna]) => fila === posx && columna === posy);
            });
            if (navioImpactado) {
                navioImpactado.acierto();
                this.status = this.getHundidos() == this.listaNavios.length ? false : true;

                console.log("Me diste ctm ...");

                console.log(this.getStatus());
                return true;
            }
        }
        this.agregaTiroFallido(coordenadaAtaque);
        console.log("No me achuntaste tonto wn...");
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

                        console.log(`Agregando coordenada fila=${fila}, columna=${columna + j}`);

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

                    console.log("Ubicado el portaAviones");
                    break;

                case 4:
                    let acorazado = new Navio(4, 0, false, 'Acorazado');
                    this.setUbicarNavio(acorazado, coordenadas);
                    console.log("Ubicado el acorazado");
                    break;

                case 3:
                    let bombardero = new Navio(3, 0, false, 'Bombardero');
                    this.setUbicarNavio(bombardero, coordenadas);
                    console.log("Ubicado el bombardero");
                    break;
                case 2:
                    let submarino = new Navio(2, 0, false, 'Submarino');
                    this.setUbicarNavio(submarino, coordenadas);
                    console.log("Ubicado el submarino");
                    break;
                default:
                    alert('Algo salio mal :c');
                    break;
            }
    
            this.selectorFlota++;
            console.log(`Coordenadas para el barco de tamaño ---- XD :  ${tamanoBarco}:`, coordenadas);
        }
    }
    
    

}