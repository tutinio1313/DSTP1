using System;
using dstp1;
using System.Collections.Generic;

namespace dstp1_response
{
    public class DonacionGetResponse : Response
    {
        public List<Donacion>? donaciones {get; set;}
    }
}