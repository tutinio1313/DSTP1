using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace dstp1_request
{
    public class PedidoPostRequest
    {
        [Required(ErrorMessage = "El numero de donación es necesario, por favor ingreselo.")]   
        [DataType(DataType.Text)]  
        [RegularExpression("^[0-9]+$")]
        public string IDSolictante {get; set;}          

        [Required(ErrorMessage = "El numero de donación es necesario, por favor ingreselo.")]   
        [DataType(DataType.DateTime)] 
        public DateTime FechaEmision {get; set;}  

        [Required(ErrorMessage = "La fecha de vencimiento del pedido necesario, por favor ingreselo.")]   
        [DataType(DataType.DateTime)] 
        public DateTime FechaVencimiento {get; set;}  
        [Required(ErrorMessage = "La cantidad de sangre solicitada es necesaria, por favor ingreselo.")]   
        [DataType(DataType.Text)]  
        [RegularExpression("^[0-9]+$")]
        public double Cantidad {get; set;}          

        [Required(ErrorMessage ="Los/el asociado es necesario, por favor seleccione alguno.")]
        public List<string> IDsAsociados {get;set;}
    }    
}