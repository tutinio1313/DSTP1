using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace dstp1_request
{
    public class AsociadoDeleteRequest
    {        
        [Required(ErrorMessage = "El DNI de la persona es necesario, por favor ingreselo.")]   
        [DataType(DataType.Text)]  
        [RegularExpression("^[0-9]+$")]
        public string ID {get; set;}  
    }
}