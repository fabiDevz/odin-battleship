//clase Tablero
import TableroDeJuego from './TableroDeJuego';
import Navio from './Navio';


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
    let barco2;
    beforeEach(() => {
        tableroDeJuego = new TableroDeJuego();
        barco = new Navio(3, 0, false);
        barco2 = new Navio(3,0,false);
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

    test('Test 5 - Agregar correctamente los navios', () => {
        const posicionBarco1 = [[1, 3], [1, 4], [1, 5]];
        const posicionBarco2 = [[3, 3], [3, 4], [3, 5]];
        barco.ubicarNavio(posicionBarco1, tableroDeJuego);
        barco2.ubicarNavio(posicionBarco2, tableroDeJuego);
        expect(tableroDeJuego.listaNavios.length).toBe(2);

        expect(tableroDeJuego.listaNavios[0] instanceof Navio).toBe(true);
        expect(tableroDeJuego.listaNavios[1] instanceof Navio).toBe(true);
    });

   

    test('Test 6 - Deberia contar como impacto', () => {
        const posicionBarco = [[1, 3], [1, 4], [1, 5]];
        barco.ubicarNavio(posicionBarco, tableroDeJuego);
        expect(tableroDeJuego.ataqueRecibido([1,4])).toBe(true);
        expect(tableroDeJuego.ataqueRecibido([1,5])).toBe(true);
        expect(tableroDeJuego.ataqueRecibido([1,3])).toBe(true);


    });

    test('Test 7 - NO deberia contar como impacto', () => {
        const posicionBarco = [[1, 3], [1, 4], [1, 5]];
        barco.ubicarNavio(posicionBarco, tableroDeJuego);
        expect(tableroDeJuego.ataqueRecibido([1,6])).toBe(false);
        expect(tableroDeJuego.ataqueRecibido([1,2])).toBe(false);
        expect(tableroDeJuego.ataqueRecibido([0,3])).toBe(false);

    });




})

describe('Comprobar si la información de los ataques se registra exitosamente - Navios afectados y su posición, Conteo de daño, Hundido ,Mapeo de tiros fallidos,  ', () => {
    let tableroDeJuego;
    let navioRojo;
    let navioAzul;
    beforeEach(() => {
        tableroDeJuego = new TableroDeJuego();
        navioRojo = new Navio(5,0,false,'Navio Rojo');
        navioAzul = new Navio(5,0,false,'Navio Azul');

        const posNavioRojo = [[1, 1], [1, 2], [1, 3],[1,4],[1,5]];
        const posNavioAzul = [[3,7],[4,7],[5,7],[6,7],[7,7]];

        navioRojo.ubicarNavio(posNavioRojo, tableroDeJuego);
        navioAzul.ubicarNavio(posNavioAzul, tableroDeJuego);
 
    });

    test('Test 1 - Deberia ser el navio rojo golpeado', () => {
        expect(tableroDeJuego.ataqueRecibido([1,1])).toBe(true);
        expect(navioRojo.impactos).toBe(1);
    });

    test('Test 2 - Deberia ser el navio azul golpeado', () => {
        expect(tableroDeJuego.ataqueRecibido([5,7])).toBe(true);
        expect(navioAzul.impactos).toBe(1);
    });

    test('Test 3 - Deberia tener un impacto cada navio',() => {
        expect(tableroDeJuego.ataqueRecibido([5,7])).toBe(true);
        expect(tableroDeJuego.ataqueRecibido([1,1])).toBe(true);
        expect(navioAzul.impactos).toBe(1);
        expect(navioRojo.impactos).toBe(1);
    })

    test('Test 4 - Deberian añadirse mas impactos',() => {
        tableroDeJuego.ataqueRecibido([1,1]);
        tableroDeJuego.ataqueRecibido([1,2]);
        tableroDeJuego.ataqueRecibido([1,3]);
        tableroDeJuego.ataqueRecibido([1,4]);
        expect(navioRojo.impactos).toBe(4);
    })

    test('Test 5 - Deberia mostrarse el estado hundido como true', () => {

        tableroDeJuego.ataqueRecibido([1,1]);
        tableroDeJuego.ataqueRecibido([1,2]);
        tableroDeJuego.ataqueRecibido([1,3]);
        tableroDeJuego.ataqueRecibido([1,4]);
        tableroDeJuego.ataqueRecibido([1,5]);
        expect(navioRojo.impactos).toBe(5);
        expect(navioRojo.hundido).toBe(true);
    })

    test('Test 6 - Deberia mostrar tiros fallidos ', () => {
        expect(tableroDeJuego.ataqueRecibido([8,0])).toBe(false);
        expect(tableroDeJuego.ataqueRecibido([8,1])).toBe(false);
        expect(tableroDeJuego.ataqueRecibido([8,2])).toBe(false);
        expect(tableroDeJuego.getMapeoTirosFallidos()).toStrictEqual([[8,0],[8,1],[8,2]]);

    })


})

describe('Comprobar hundimientos', () => {

    let tableroDeJuego;
    let navioRojo;
    let navioAzul;
    beforeEach(() => {
        tableroDeJuego = new TableroDeJuego();
        navioRojo = new Navio(2,0,false,'Navio Rojo');
        navioAzul = new Navio(2,0,false,'Navio Azul');

        const posNavioRojo = [[1, 1], [1, 2]];
        const posNavioAzul = [[3,7],[4,7]];

        navioRojo.ubicarNavio(posNavioRojo, tableroDeJuego);
        navioAzul.ubicarNavio(posNavioAzul, tableroDeJuego);
 
    });

    test('Test 1 - Comprobar 1 barco hundido ', () => {
        tableroDeJuego.ataqueRecibido([1,1]);
        tableroDeJuego.ataqueRecibido([1,2]);

        expect(tableroDeJuego.getStatus()).toBe('Navios: 2\nHundidos: 1\nJuego: En progreso');
    })

    test('Test 2 - Comprobar todos los barcos hundidos ', () => {
        tableroDeJuego.ataqueRecibido([1,1]);
        tableroDeJuego.ataqueRecibido([1,2]);

        tableroDeJuego.ataqueRecibido([3,7]);
        tableroDeJuego.ataqueRecibido([4,7]);

        expect(tableroDeJuego.getStatus()).toBe('Navios: 2\nHundidos: 2\nJuego: Terminado');
    })
})
