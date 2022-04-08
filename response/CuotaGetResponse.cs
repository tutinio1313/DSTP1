using System;
using dstp1;

namespace dstp1_response
{
    public class CuotaGetResponse
    {
        public Cuota? cuota {get;set;}
        public bool ExecutionSuccessful {get;set;}
        public string? ErrorMessage {get;set;}
    }
}