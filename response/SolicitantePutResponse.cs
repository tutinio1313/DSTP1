using System;
using dstp1;

namespace dstp1_response
{
    public class SolicitantePutResponse
    {
        public Solicitante? solicitante {get; set;}
        public string? errorMessage {get;set;}
        public bool ExecutionSuccessful {get; set;}
    }
}
