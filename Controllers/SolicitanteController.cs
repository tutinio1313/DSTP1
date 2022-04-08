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
    public string solicitantesJsonPath = Directory.GetCurrentDirectory() + "/db/solicitante.json";
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
    }

    [HttpGet(Name = "GetSolicitante")]

    public async Task<SolicitanteGetResponse> Get([FromQuery] string ID)
    {
        CargarSolicitantes();
        SolicitanteGetResponse response = new SolicitanteGetResponse();
        if(solicitantes.Exists(x=> x.ID == ID))
        {
            response.solicitante = solicitantes.Find(x=> x.ID == ID);
            response.ExecutionSuccessful = true;
        }
        else
        {
            response.ExecutionSuccessful = false;
            response.errorMessage = "La organización solicitante de Sangre no se ha encontrado."; 
        }

        return response;
    }
    
    [HttpPost(Name ="PostSolicitante")]

    public async Task<SolicitantePostResponse> Post(SolicitantePostRequest request)
    {
        CargarSolicitantes();
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
            response.errorMessage = "El solicitante o persona ya esta registrada.";
        }
        return response;
    }
    
    //[HttpPut(Name = "PutSolicitante")]
}