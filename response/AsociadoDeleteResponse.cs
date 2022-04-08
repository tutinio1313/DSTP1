using System;
using dstp1;

namespace dstp1_response
{
    public class AsociadoDeleteResponse
    {
        public Asociado? asociado {get; set;}
        public bool ExecutionSuccessful {get; set;}
        public string ErrorMessage {get; set;}
    }
}