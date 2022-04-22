using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace dstp1_request
{
    public class AsociadoPostRequest
    {
        [Required(ErrorMessage = "Debes ingresar tu DNI.")]
        [DataType(DataType.Text)]
        [MinLength(7)]
        [MaxLength(8)]
        [RegularExpression("^[0-9]+$")]
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
        [DataType(DataType.Text)]
        [RegularExpression("^[AB0]")]
        [MinLength(1)]
        [MaxLength(2)]
        public string GrupoSanguineo {get; set;}

        [Required(ErrorMessage = "Debes ingresar el factor de tu grupo sanguineo.")]
        [DataType(DataType.Text)]
        [RegularExpression("^[+-]")]
        [MaxLength(1)]
        public string Factor {get; set;}
    }
}