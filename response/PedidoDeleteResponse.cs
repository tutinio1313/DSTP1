using System;
using dstp1;

namespace dstp1_response
{
    public abstract class PedidoDeleteResponse : Response
    {
        public Pedido pedido {get; set;}
    }
}