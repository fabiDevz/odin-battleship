//clase Tablero
import TableroDeJuego from './TableroDeJuego';
import Acorazado from './Acorazado';


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

    let tableroDeJuego;
    let barco;
    beforeEach(() => {
        tableroDeJuego = new TableroDeJuego();
        barco = new Acorazado(3, 0, false);
    });

    test('Test 1 - Ubicar posicion 0,0 - eje x', () => {
        const coordenadas = [[0, 0], [0, 1], [0, 2]];
        barco.ubicarNavio(coordenadas, tableroDeJuego);
        expect(tableroDeJuego.tablero[0][0]).toBe('B');
        expect(tableroDeJuego.tablero[0][1]).toBe('B');
        expect(tableroDeJuego.tablero[0][2]).toBe('B');
        expect(tableroDeJuego.tablero[0][3]).toBe('A');
        expect(tableroDeJuego.tablero[0][4]).toBe('A');
        expect(tableroDeJuego.tablero[0][5]).toBe('A');
    });

    test('Test 2 - Ubicar posicion 0,0 - eje y', () => {
        const coordenadas = [[0, 0], [1, 0], [2, 0]];
        barco.ubicarNavio(coordenadas, tableroDeJuego);
        expect(tableroDeJuego.tablero[0][0]).toBe('B');
        expect(tableroDeJuego.tablero[0][1]).toBe('A');
        expect(tableroDeJuego.tablero[1][0]).toBe('B');
        expect(tableroDeJuego.tablero[2][0]).toBe('B');
        expect(tableroDeJuego.tablero[3][0]).toBe('A');
        expect(tableroDeJuego.tablero[4][0]).toBe('A');
    });

    test('Test 3 - No deberia traspasar bordes - eje x', () => {
        const coordenadas = [[0, 8], [0, 9], [0, 10]];

        expect(() => {
            barco.ubicarNavio(coordenadas, tableroDeJuego);
        }).toThrow('Error - No puedes colocar el navio aqui');


    });

    test('Test 4 - No deberia traspasar bordes - eje y', () => {
        const coordenadas = [[8, 0], [9, 0], [10, 0]];
        expect(() => {
            barco.ubicarNavio(coordenadas, tableroDeJuego);
        }).toThrow('Error - No puedes colocar el navio aqui');


    });

    test('Test 5 - Deberia contar como impacto', () => {
        const posicionBarco = [[1, 3], [1, 4], [1, 5]];
        barco.ubicarNavio(posicionBarco, tableroDeJuego);
        expect(tableroDeJuego.ataqueRecibido([1,4])).toBe(true);
        expect(tableroDeJuego.ataqueRecibido([1,5])).toBe(true);
        expect(tableroDeJuego.ataqueRecibido([1,3])).toBe(true);


    });

    test('Test 6 - NO deberia contar como impacto', () => {
        const posicionBarco = [[1, 3], [1, 4], [1, 5]];
        barco.ubicarNavio(posicionBarco, tableroDeJuego);
        expect(tableroDeJuego.ataqueRecibido([1,6])).toBe(false);
        expect(tableroDeJuego.ataqueRecibido([1,2])).toBe(false);
        expect(tableroDeJuego.ataqueRecibido([0,3])).toBe(false);



// queda pendiente averiguar a que barco impacto tener identificados los barcos y sus posiciones para saber a cual impacto y a cual no
// tambien mapear los tiros fallidos 

    });



})
