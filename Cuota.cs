using System;

namespace dstp1
{
    public class Cuota
    {
        public string ID {get; set;}
        public string IDAsociado {get; set;}
        public DateTime FechaEmitida {get; set;}
        public DateTime FechaVencimiento {get; set;}
        public DateTime? FechaPago {get; set;}
        public double Importe {get; set;}
        public bool EstaPagado {get; set;}
    }
}