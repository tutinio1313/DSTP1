using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace dstp1_request
{
    public class CuotaPutRequest
    {
    [Required(ErrorMessage = "El importe de la cuota es necesario, por favor ingreselo.")]   
    [DataType(DataType.Currency)]  
    public double Importe {get; set;}

    public bool estaPagado {get; set;}
    }
}