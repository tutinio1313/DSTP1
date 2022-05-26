using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Newtonsoft.Json;
using dstp1_request;
using dstp1_response;

namespace dstp1.Controllers;

[ApiController]
[Route("[controller]")]
public class SolicitanteController : ControllerBase
{ 
    private List<Solicitante> solicitantes;

    private readonly ILogger<SolicitanteController> _logger;

    public SolicitanteController(ILogger<SolicitanteController> logger)
    {
        _logger = logger;
    }

    private Solicitante CrearSolicitante(SolicitantePostRequest request)
    {
        Solicitante solicitante = new Solicitante();
        solicitante.ID = request.ID;
        solicitante.Nombre = request.Nombre;    

        Listas.AddSolicitante(solicitante);    
        return solicitante;
    }
    private Solicitante ModificarSolicitante(SolicitantePutRequest request, Solicitante solicitante)
    {
        solicitante.Nombre = request.Nombre;

        return solicitante;
    }
    
    [HttpGet(Name = "GetSolicitante")]

    public async Task<SolicitanteGetResponse> Get()
    {
        solicitantes = Listas.GetSolicitantes();
        SolicitanteGetResponse response = new SolicitanteGetResponse();
        
        if(solicitantes.Count > 0)
        {
            response.solicitante = solicitantes;            
            response.ExecutionSuccessful = true;
        }
        else
        {
            response.ExecutionSuccessful = false;
            response.ErrorMessage = "La organización solicitante de Sangre no se ha encontrado."; 
        }

        return response;
    }
    
    [HttpPost(Name ="PostSolicitante")]

    public async Task<SolicitantePostResponse> Post(SolicitantePostRequest request)
    {
        solicitantes = Listas.GetSolicitantes();
        bool existeSolicitante = solicitantes.Exists(x=> x.ID == request.ID);
        SolicitantePostResponse response = new SolicitantePostResponse();

        if(!existeSolicitante)        
        {
            response.ExecutionSuccessful = true;                   
            response.solicitante = CrearSolicitante(request);     
        }
        else
        {
            response.ExecutionSuccessful = false;
            response.ErrorMessage = "El solicitante o persona ya esta registrada.";
        }
        return response;
    }
    
   [HttpPut(Name = "PutSolicitante")]

   public async Task<SolicitantePutResponse> Put(SolicitantePutRequest request)
   {
       solicitantes = Listas.GetSolicitantes();
       bool existeSolicitante = solicitantes.Exists(x=> x.ID == request.ID); 
       SolicitantePutResponse response = new SolicitantePutResponse();

       if(existeSolicitante)
       {
           Solicitante solicitante = solicitantes.Find(x=> x.ID == request.ID);
           response.ExecutionSuccessful = true;
           response.solicitante = ModificarSolicitante(request, solicitante);
           solicitantes.Remove(solicitante);
       }

       else 
       {
           response.ExecutionSuccessful = false;
           response.ErrorMessage = "El solicitante no se ha encontrado";
       }
       return response;
   }

   [HttpDelete(Name = "Delete")]

   public async Task<SolicitanteDeleteResponse> Delete(SolicitanteDeleteRequest request)
   {     
       solicitantes = Listas.GetSolicitantes();
       bool existeSolicitante = solicitantes.Exists(x=> x.ID == request.ID); 
       SolicitanteDeleteResponse response = new SolicitanteDeleteResponse();

       if(existeSolicitante)
       {
           response.ExecutionSuccessful = true;
           response.solicitante = solicitantes.Find(x=> x.ID == request.ID);
           Listas.RemoveSolicitante(response.solicitante);
       }
       else
       {
           response.ExecutionSuccessful = false;
           response.ErrorMessage = "El solicitante a borrrar no se ha encontrado.";
       }
       return response;
   }
 }