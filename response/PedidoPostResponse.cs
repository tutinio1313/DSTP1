using System;
using dstp1;

namespace dstp1_response
{
    public abstract class PedidoPostResponse : Response
    {
        public Pedido pedido {get; set;}
    }
}