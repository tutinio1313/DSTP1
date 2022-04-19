using System;

namespace dstp1
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
        public bool EstaEnfermo {get; set;}
        public bool EstaMedicado {get; set;}
        public string Localidad {get; set;}
        public string Domicilio {get; set;}
        public string GrupoSanguineo {get; set;}
        public string Factor {get; set;}

        public void SetEsDonante()
        {
           int edad = DateTime.Today.Subtract(FechaNacimiento).Days/365;
           bool puedeDonar = (edad > 18) && (edad < 65) ;

            if(!EstaEnfermo && !EstaMedicado && puedeDonar)
            {
                EsDonante = true;
            }
        }
    }
}
