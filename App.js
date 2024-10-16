
import {crearTableroUI, crearMenuInicio, limpiarDOM } from "./DomHandler.js";




function iniciarJuego() {
    limpiarDOM();
    console.log("El juego ha comenzado.");
    crearTableroUI();
}

crearMenuInicio(iniciarJuego);