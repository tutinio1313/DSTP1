using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace dstp1_request
{
    public class AsociadoPutRequest
    {
        [Required(ErrorMessage = "Debes ingresar tu DNI.")]
        [DataType(DataType.Text)]
        [MinLength(7)]
        [MaxLength(8)]
        [RegularExpression("^[0-9]+$")]
        public string ID {get; set;}
        [DataType(DataType.EmailAddress)]
        public string? Email {get; set;}

        [DataType(DataType.PhoneNumber)]        
        public string? Telefono {get; set;}
        [Required(ErrorMessage = "Debes ingresar tu condición de salud.")]
        public bool EstaEnfermo {get; set;}
        [Required(ErrorMessage = "Debes ingresar si consumes algun medicamento.")]
        public bool EstaMedicado {get; set;}
        [DataType(DataType.Text)]
        public string? Localidad {get; set;}
        [DataType(DataType.Text)]
        public string? Domicilio {get; set;}
    }
}