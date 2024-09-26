//clase Tablero
import TableroDeJuego from './TableroDeJuego';


describe('Test Base - creación del tablero', () => {
    let tableroDeJuego;
    beforeEach(() => {
         tableroDeJuego = new TableroDeJuego();
    });

    test('Test 1 - Creación tablero 10 x 10', () => {

        expect(tableroDeJuego.tablero[0][0]).toBe('A');
        expect(tableroDeJuego.tablero[9][9]).toBe('A');
        expect(tableroDeJuego.tablero.length).toBe(10);
    });
})

/* a modo de conveción se tomará el barco desde su extremo izquierdo hacia la derecha */ 
/* en el caso del eje y, se considera su extremo superior hacia abajo */ 

describe('Test ubicaciones navios - Ubicar barcos en coordenadas', () => {

   

})
