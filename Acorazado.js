import {setUbicarNavio} from './TableroDeJuego';

export default class Acorazado
{
    constructor(longitud, impactos, hundido)
    {
        this.longitud = longitud;
        this.impactos = impactos;
        this.hundido = hundido;
        this.vertical = false;
        this.coordenadas = [];
    }

    acierto()
    {
        this.impactos ++;
    }

    esHundido()
    {
        if(!this.hundido)
        {
            if(this.longitud === this.impactos)
            {
                this.hundido = true;
            }
        }
        return this.hundido;
    }

    ubicarNavio(coordenadas, tableroDeJuego)
    {   
       return tableroDeJuego.setUbicarNavio(this, coordenadas);
    }
}