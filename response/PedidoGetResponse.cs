using System;
using dstp1;
using System.Collections.Generic;

namespace dstp1_response
{
    public class PedidoGetResponse : Response
    {
        public List<Pedido>? pedidos {get; set;}
    }
}