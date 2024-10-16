import TableroDeJuego from './TableroDeJuego.js';

export default class Navio
{
    constructor(longitud, impactos, hundido, nombre = '')
    {
        this.nombre = nombre;
        this.longitud = longitud;
        this.impactos = impactos;
        this.hundido = hundido;
        this.vertical = false;
        this.coordenadas = [];
    }


    acierto()
    {
        
        this.impactos ++;
        return this.esHundido();
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

    setCoordenadas(coordenadas)
    {
        this.coordenadas = coordenadas;
    }

    ubicarNavio(coordenadas, tableroDeJuego)
    {   
        if (tableroDeJuego.setUbicarNavio(this, coordenadas))
        {
            this.coordenadas = coordenadas;
        }
       
    }
}