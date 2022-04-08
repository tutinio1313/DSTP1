using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace dstp1_request
{
    public class CuotaPostRequest
    {
    [Required(ErrorMessage = "El CUIL de la organización o persona es necesario, por favor ingreselo.")]   
    [DataType(DataType.Text)]  
    [RegularExpression("^[0-9]+$")]
    public string IDAsociado {get; set;} 
    
    [Required(ErrorMessage = "La fecha de emisión es necesaria, por favor ingresela.")]   
    [DataType(DataType.DateTime)]
    public DateTime FechaEmision {get; set;}

    [Required(ErrorMessage = "El importe de la cuota es necesario, por favor ingreselo.")]   
    [DataType(DataType.Currency)]  
    public double Importe {get; set;}
    }
}