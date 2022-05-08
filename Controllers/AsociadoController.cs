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
    public string asociadosJsonPath = Directory.GetCurrentDirectory() + "/db/asociados.json";
    public List<Asociado> asociados = new List<Asociado>();

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

        GuardarAsociado(asociado);
        return asociado;
    }

    private void GuardarAsociado(Asociado? asociado)
    {
        if(asociado != null)
        {
            asociados.Add(asociado);
            asociados.OrderBy(x=>x.ID);
        }    
        string temp = JsonConvert.SerializeObject(asociados);        
        System.IO.File.WriteAllText(asociadosJsonPath, temp);
    }

    private void CargarAsociados()
    {
        string json = System.IO.File.ReadAllText(asociadosJsonPath);
        asociados = JsonConvert.DeserializeObject<List<Asociado>>(json);
        asociados.Sort(delegate(Asociado asociadoA, Asociado asociadoB)
        {
            if(asociadoA.ID == null && asociadoB.ID == null) return 0;
            else if(asociadoA.ID == null) return -1;
            else if(asociadoB.ID == null) return 1;
            else return asociadoA.ID.CompareTo(asociadoB.ID);
        }        
        );

        if(asociados == null)
        {
            asociados = new List<Asociado>();
        }
    }

    private Asociado ModificarAsociado(AsociadoPutRequest request, Asociado asociado)
    {
        if(request.Domicilio != null)
        {
            asociado.Domicilio = request.Domicilio;
        }
        if(request.Email != null)
        {
            asociado.Email = request.Email;
        }
        if(request.Telefono != null)
        {
            asociado.Telefono = request.Telefono;
        }
        if(request.Localidad != null)
        {
            asociado.Localidad = request.Localidad; 
        }
        if(request.Domicilio != null)
        {
            asociado.Domicilio = request.Domicilio;
        }
        asociado.EstaEnfermo = request.EstaEnfermo;
        asociado.EstaMedicado = request.EstaMedicado;
        return asociado;
    }

     private List<Asociado> ObtenerAsociados(int index)
    {
        List<Asociado> partialAsociados = new List<Asociado>(); 
        for(int i = 0;i < index; i++)
        {
            partialAsociados.Add(asociados[index]);
        }
        return partialAsociados;
    }
    
    private bool GrupoSanguineoEsCorrecto(string grupo) => (grupo == "A" || grupo == "B" || grupo == "AB" || grupo == "0");

    [HttpGet(Name = "GetAsociado")]
    public async Task<AsociadoGetResponse> Get()
    {
        CargarAsociados();
        AsociadoGetResponse response = new AsociadoGetResponse();        
        response.asociados = asociados;
        return response;
    }

    [HttpPost(Name = "PostAsociado")]
    public async Task<AsociadoPostResponse> Post(AsociadoPostRequest request)
    {
        CargarAsociados();
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
        CargarAsociados();
        
        if(asociados.Exists(x=> x.ID == request.ID))
        {
            Asociado asociadoACambiar = asociados.Find(x => x.ID == request.ID);
            asociados.Remove(asociadoACambiar);
            response.asociado = ModificarAsociado(request, asociadoACambiar);
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
       CargarAsociados();
       bool existeAsociado = asociados.Exists(x=> x.ID == request.ID); 
       AsociadoDeleteResponse response = new AsociadoDeleteResponse();

       if(existeAsociado)
       {
           response.ExecutionSuccessful = true;
           response.asociado = asociados.Find(x=> x.ID == request.ID);
           asociados.Remove(asociados.Find(x=> x.ID == request.ID));
           GuardarAsociado(null);
       }
       else
       {
           response.ExecutionSuccessful = false;
           response.ErrorMessage = "El asociado a borrrar no se ha encontrado.";
       }
       return response;
   }
}