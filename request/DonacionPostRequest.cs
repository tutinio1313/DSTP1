using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace dstp1_request
{
    public class DonacionPostRequest
    {
        [Required(ErrorMessage = "El dni del asociado es necesario, por favor ingreselo.")]   
        [DataType(DataType.Text)]  
        [RegularExpression("^[0-9]+$")]
        public string IDAsociado {get; set;}  
        [Required(ErrorMessage = "El numero de pedido es necesario, por favor ingreselo.")]   
        [DataType(DataType.Text)]  
        [RegularExpression("^[0-9]+$")]
        public string IDPedido {get; set;}  
        [Required(ErrorMessage = "El dni del asociado es necesario, por favor ingreselo.")]   
        public Double Cantidad {get; set;}  
        [Required(ErrorMessage = "El numero de pedido es necesario, por favor ingreselo.")]   
        [DataType(DataType.DateTime)]  
        [RegularExpression("^[0-9]+$")]        
        public DateTime Fecha {get; set;}
    }
}