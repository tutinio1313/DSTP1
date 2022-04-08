using System;

namespace dstp1
// La clase Solicitante representa a un (En el caso default será Banco de Sangre, pero pensando en la escalabilidad se hizo una clase.)
{
    public class Solicitante
    {
        public string ID {get; set;} //Este va a ser el CUIL o DNI.
        public string Nombre {get; set;}
    }    
}