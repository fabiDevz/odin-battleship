//clase Acorazado
import Acorazado from './Acorazado';

test('Test base 1 - Barco con longitud, impactos y hundido (true/false)', () => {
    const barco = new Acorazado(5,0,false);
    expect(barco.longitud).toBe(5);
    expect(barco.impactos).toBe(0);
    expect(barco.hundido).toBe(false);
})


test('Test base 2 - Barco con longitud, impactos y hundido (true/false)', () => {
    const barco = new Acorazado(3,1,true);
    expect(barco.longitud).toBe(3);
    expect(barco.impactos).toBe(1);
    expect(barco.hundido).toBe(true);
})