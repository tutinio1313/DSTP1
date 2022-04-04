using System;
using DSTP1;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DSTP1_Request
{
    public class AsociadoPostRequest
    {
        [Required(ErrorMessage = "Debes ingresar tu DNI.")]
        [DataType(DataType.Text)]
        [Range(7,8)]
        public string ID {get; set;}

        [Required(ErrorMessage = "Debes ingresar tu nombre.")]
        [DataType(DataType.Text)]
        public string Nombre {get; set;}

        [Required(ErrorMessage = "Debes ingresar tu apellido.")]
        [DataType(DataType.Text)]
        public string Apellido {get; set;}

        [Required(ErrorMessage = "Debes ingresar tu email.")]
        [DataType(DataType.EmailAddress)]
        public string Email {get; set;}

        [Required(ErrorMessage = "Debes ingresar tu fecha de Nacimiento.")]
        [DataType(DataType.DateTime)]
        public DateTime FechaNacimiento {get; set;}

        [Required(ErrorMessage = "Debes ingresar tu número teléfonico.")]
        [DataType(DataType.PhoneNumber)]        
        public string Telefono {get; set;}

        [Required(ErrorMessage = "Debes ingresar tu condición como donante.")]
        public bool EsDonante {get; set;}
        [Required(ErrorMessage = "Debes ingresar tu condición de salud.")]
        public bool EstaEnfermo {get; set;}
        [Required(ErrorMessage = "Debes ingresar si consumes algun medicamento.")]
        public bool EstaMedicado {get; set;}
        [Required(ErrorMessage = "Debes ingresar tu localidad.")]
        [DataType(DataType.Text)]
        public string Localidad {get; set;}

        [Required(ErrorMessage = "Debes ingresar tu domicilio.")]
        [DataType(DataType.Text)]
        public string Domicilio {get; set;}

        [Required(ErrorMessage = "Debes ingresar tu grupo sanguineo.")]
        [DataType(DataType.Custom)]
        public string GrupoSanguineo {get; set;}

        [Required(ErrorMessage = "Debes ingresar el factor de tu grupo sanguineo.")]
        [DataType(DataType.Custom)]
        public string Factor {get; set;}
    }
}