using System;
using dstp1;

namespace dstp1_response
{
    public class AsociadoGetResponse
    {
        public Asociado? asociado {get; set;}
        public string? errorMessage {get;set;}
        public bool Executionsuccessful {get; set;}
    }
}