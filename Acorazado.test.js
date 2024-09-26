//clase Acorazado
import Acorazado from './Acorazado';

describe('Test Base - creación de acorazados', () => {

    test('Test base 1 - Barco con longitud, impactos y hundido (true/false)', () => {
        const barco = new Acorazado(5, 0, false);
        expect(barco.longitud).toBe(5);
        expect(barco.impactos).toBe(0);
        expect(barco.hundido).toBe(false);
    })
    test('Test base 2 - Barco con longitud, impactos y hundido (true/false)', () => {
        const barco = new Acorazado(3, 1, true);
        expect(barco.longitud).toBe(3);
        expect(barco.impactos).toBe(1);
        expect(barco.hundido).toBe(true);
    })

})

describe('Test con beforeEach para Métodos ()', () => {
    let barco;
    beforeEach(() => {
        barco = new Acorazado(3, 0, false);
    });

    test('Test 1 - Método acierto() - Aumenta en uno', () => {
        barco.acierto();
        expect(barco.impactos).toBe(1);
    });

    test('Test 2 - Método acierto() - Dos disparos', () => {
        barco.acierto();
        barco.acierto();
        expect(barco.impactos).toBe(2);
    });

    test('Test 1 - Método hundido() - disparos menor a longitud', () => {
        barco.acierto();
        barco.acierto();
        expect(barco.impactos).toBe(2);
        expect(barco.esHundido()).toBe(false);
    });
    test('Test 2 - Método hundido() - disparos igual a longitud', () => {
        barco.acierto();
        barco.acierto();
        barco.acierto();
        expect(barco.impactos).toBe(3);
        expect(barco.esHundido()).toBe(true);
    });
});