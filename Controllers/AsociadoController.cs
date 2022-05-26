using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Newtonsoft.Json;
using dstp1_request;
using dstp1_response;

namespace dstp1.Controllers;

[ApiController]
[Route("[controller]")]
public class AsociadoController : ControllerBase
{ 
    public List<Asociado> asociados;

    private readonly ILogger<AsociadoController> _logger;

    public AsociadoController(ILogger<AsociadoController> logger)
    {
        _logger = logger;
    }
    
    private Asociado CrearAsociado(AsociadoPostRequest request)
    {
        Asociado asociado = new Asociado();
        asociado.ID = request.ID;
        asociado.Nombre = request.Nombre;
        asociado.Apellido = request.Apellido;
        asociado.Email = request.Email;
        asociado.FechaNacimiento = request.FechaNacimiento;
        asociado.Telefono = request.Telefono;
        asociado.EstaEnfermo = request.EstaEnfermo;
        asociado.EstaMedicado = request.EstaMedicado;
        asociado.SetEsDonante();
        asociado.Localidad = request.Localidad;
        asociado.Domicilio = request.Domicilio;
        asociado.GrupoSanguineo = request.GrupoSanguineo;
        asociado.Factor = request.Factor;

        Listas.AddAsociado(asociado);
        return asociado;
    }

    private bool GrupoSanguineoEsCorrecto(string grupo) => (grupo == "A" || grupo == "B" || grupo == "AB" || grupo == "0");

    [HttpGet(Name = "GetAsociado")]
    public async Task<AsociadoGetResponse> Get()
    {
        asociados = Listas.getAsociados();
        AsociadoGetResponse response = new AsociadoGetResponse();        
        response.asociados = asociados;
        return response;
    }

    [HttpPost(Name = "PostAsociado")]
    public async Task<AsociadoPostResponse> Post(AsociadoPostRequest request)
    {
        asociados = Listas.getAsociados();
        AsociadoPostResponse response = new AsociadoPostResponse();
        
        bool existeAsociado = asociados.Exists(a => a.ID == request.ID);
        
        if(!existeAsociado)
        {
            if(GrupoSanguineoEsCorrecto(request.GrupoSanguineo))
            {
            Asociado asociado = CrearAsociado(request);
            response.ExecutionSuccessful = true;
            response.asociado = asociado;            
            }
            else
            {
                response.ExecutionSuccessful = false;
                response.ErrorMessage = "El tipo de sangre ingresado es incorrecto, por favor corrobore lo ingresado";
            }
        }
        else
        {
            response.ExecutionSuccessful = false;
            response.ErrorMessage = "El dni ingresado fue cargado anteriormente, por favor corrobore lo ingresado";
        }
                        
        return response;
    }

    [HttpPut(Name = "PutAsociado")]
    public async Task<AsociadoPutResponse> Put(AsociadoPutRequest request)
    {
        AsociadoPutResponse response = new AsociadoPutResponse();
        asociados = Listas.getAsociados();
        
        if(asociados.Exists(x=> x.ID == request.ID))
        {
            Asociado asociadoACambiar = asociados.Find(x => x.ID == request.ID);
            response.asociado = Listas.PutAsociado(request, asociadoACambiar);
            response.ExecutionSuccessful = true;
        }
        else
        {
            response.ExecutionSuccessful = false;
            response.ErrorMessage = "El asociado parece que no se ha encontrado, por favor revise el DNI ingresado.";
        }
        return response;
    }

    [HttpDelete(Name = "RemoveAsociado")]
       public async Task<AsociadoDeleteResponse> Delete(AsociadoDeleteRequest request)
   {     
       asociados = Listas.getAsociados();
       bool existeAsociado = asociados.Exists(x=> x.ID == request.ID); 
       AsociadoDeleteResponse response = new AsociadoDeleteResponse();

       if(existeAsociado)
       {
           response.ExecutionSuccessful = true;
           response.asociado = asociados.Find(x=> x.ID == request.ID);
           Listas.RemoveAsociado(response.asociado);
       }
       else
       {
           response.ExecutionSuccessful = false;
           response.ErrorMessage = "El asociado a borrrar no se ha encontrado.";
       }
       return response;
   }
}