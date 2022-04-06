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

    private void GuardarAsociado(Asociado asociado)
    {
        asociados.Add(asociado);
        string temp = JsonConvert.SerializeObject(asociados);        
        System.IO.File.WriteAllText(asociadosJsonPath, temp);
    }

    private void CargarAsociados()
    {
        string json = System.IO.File.ReadAllText(asociadosJsonPath);
        asociados = JsonConvert.DeserializeObject<List<Asociado>>(json);
    }

    [HttpGet(Name = "GetAsociado")]
    public async Task<AsociadoGetResponse> Get([FromQuery] string ID)
    {
        CargarAsociados();
        AsociadoGetResponse response = new AsociadoGetResponse();

        if(asociados.Exists(x=> x.ID == ID))
        {
            response.asociado = asociados.Find(x=> x.ID == ID); 
            response.Executionsuccessful = true;        
        }

        else
        {
            response.Executionsuccessful = false;
            response.errorMessage = "El dni del asociado ingresado no se encuentra, por favor revise los datos ingresados.";
        }
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
            Asociado asociado = CrearAsociado(request);
            response.Executionsuccessful = true;
            response.asociado = asociado;
            
        }
        else
        {
            response.Executionsuccessful = false;
            response.errorMessage = "El dni ingresado fue cargado anteriormente, por favor corrobore lo ingresado";
        }
                        
        return response;
    }
}
