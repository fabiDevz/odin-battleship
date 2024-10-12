import TableroDeJuego from './TableroDeJuego';
import Navio from './Navio';
import Jugador from './Jugador';

describe("Creación de instancia Jugador",() => {
    let tableroDeJuego1;
    let tableroDeJuego2;
    let jugador1;
    let jugador2;
    beforeEach(() => {

        tableroDeJuego1 = new TableroDeJuego();
        tableroDeJuego2 = new TableroDeJuego();
        jugador1 = new Jugador('Humano', tableroDeJuego1);
        jugador2 = new Jugador('Computador', tableroDeJuego2);
        
    });
    test("Test 1 - Tipos de jugadores y tableros", () => {
       expect(jugador1.tipo).toBe('Humano');
       expect(jugador2.tipo).toBe('Computador');
       expect(jugador1.getTablero().getHundidos()).toBe(0);
       expect(jugador2.getTablero().getHundidos()).toBe(0);
    })

   
})