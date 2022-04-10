using System;

namespace dstp1_response
{
    public abstract class Response
    {
        public bool ExecutionSuccessful {get; set;}
        public string? ErrorMessage {get;set;}
    }
}