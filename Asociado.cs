using System;

namespace DSTP1
{
    public class Asociado
    {
        public string ID {get; set;} //El ID del asociado será el DNI, ya que es un numero irrepetible.
        public string Nombre {get; set;}
        public string Apellido {get; set;}
        public string Email {get; set;}
        public DateTime FechaNacimiento {get; set;}
        public string Telefono {get; set;}
        public bool EsDonante {get; set;}       
    }
}