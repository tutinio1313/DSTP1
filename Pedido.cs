using System;

namespace dstp1
{
    public class Pedido
    {
        public string ID {get; set;}
        public string IDSolicitante {get; set;}
        public DateTime FechaEmision {get; set;}
        public DateTime FechaVencimiento {get; set;}
        public bool Completado {get; set;}
        public double CantidadSolicitada {get; set;}
    }
}