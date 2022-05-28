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
        public string IDSolicitante {get; set;}          

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
        
        [Required(ErrorMessage = "El grupo saguineo es necesario, por favor ingreselo.")]   
        [DataType(DataType.Text)]  
        public string GrupoSanguineo {get; set;}

        [Required(ErrorMessage = "El factor saguineo es necesaria, por favor ingreselo.")]   
        [DataType(DataType.Text)]  
        public string Factor {get; set;}                  
    }    
}