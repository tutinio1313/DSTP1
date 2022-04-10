using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace dstp1_request
{
    public class CuotaDeleteRequest
    {
    [Required(ErrorMessage = "El Numero de cuota es necesario, por favor ingreselo.")]   
    [DataType(DataType.Text)]  
    [RegularExpression("^[0-9]+$")]
    public string ID {get;set;}
    }
}