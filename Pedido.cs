using System;
using System.Collections.Generic;

namespace dstp1
{
    public class Pedido
    {
        /*
        La clase Pedido representa el pedido de donación emitido por la organización Solicitante (En el caso default será Banco de Sangre, pero pensando en la escalabilidad se hizo una clase.)
        */
        public string ID {get; set;}
        public string IDSolicitante {get; set;}
        public DateTime FechaEmision {get; set;}
        public DateTime FechaVencimiento {get; set;}
        public bool Completado {get; set;}
        public double CantidadSolicitada {get; set;}
        public string GrupoSanguineo {get; set;}
        public string Factor {get; set;}
        public List<string> IDsAsociados {get; set;}
    }
}