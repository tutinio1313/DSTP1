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
    public string solicitantesJsonPath = Directory.GetCurrentDirectory() + "/db/solicitantes.json";
    public List<Solicitante> solicitantes = new List<Solicitante>();

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
        GuardarSolicitante(solicitante);
        return solicitante;
    }

    private void GuardarSolicitante(Solicitante solicitante)
    {
        solicitantes.Add(solicitante);
        string temp = JsonConvert.SerializeObject(solicitantes);        
        System.IO.File.WriteAllText(solicitantesJsonPath, temp);
    }

    private void CargarSolicitantes()
    {
        string json = System.IO.File.ReadAllText(solicitantesJsonPath);
        solicitantes = JsonConvert.DeserializeObject<List<Solicitante>>(json);

        if(solicitantes == null)
        {
            solicitantes = new List<Solicitante>();
        }
    }

    private Solicitante ModificarSolicitante(SolicitantePutRequest request, Solicitante solicitante)
    {
        solicitante.Nombre = request.Nombre;

        return solicitante;
    }
    private List<Solicitante> ObtenerSolicitantes(int index)
    {
        List<Solicitante> partialSolicitantes = new List<Solicitante>(); 
        for(;index < index+5; index++)
        {
            partialSolicitantes.Add(solicitantes[index]);
        }
        return partialSolicitantes;
    }

    [HttpGet(Name = "GetSolicitante")]

    public async Task<SolicitanteGetResponse> Get([FromQuery] string ID)
    {
        CargarSolicitantes();
        SolicitanteGetResponse response = new SolicitanteGetResponse();
        
        if(solicitantes.Count > 0)
        {
            response.solicitante = ObtenerSolicitantes(int.Parse(ID));
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
        CargarSolicitantes();
        bool existeSolicitante;
        if(solicitantes.Count != 0){
            existeSolicitante = solicitantes.Exists(x=> x.ID == request.ID); 
        }

        else
        {
            existeSolicitante = false;
        }
       
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
       CargarSolicitantes();
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
       CargarSolicitantes();
       bool existeSolicitante = solicitantes.Exists(x=> x.ID == request.ID); 
       SolicitanteDeleteResponse response = new SolicitanteDeleteResponse();

       if(existeSolicitante)
       {
           response.ExecutionSuccessful = true;
           response.solicitante = solicitantes.Find(x=> x.ID == request.ID);
           solicitantes.Remove(solicitantes.Find(x=> x.ID == request.ID));
       }
       else
       {
           response.ExecutionSuccessful = false;
           response.ErrorMessage = "El solicitante a borrrar no se ha encontrado.";
       }
       return response;
   }
 }