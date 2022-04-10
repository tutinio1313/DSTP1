using System;
using dstp1;
using System.Collections.Generic;

namespace dstp1_response
{
    public class CuotaGetResponse : Response
    {
        public List<Cuota>? cuotas {get;set;}
    }
}