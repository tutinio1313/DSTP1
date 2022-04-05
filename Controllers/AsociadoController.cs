using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using DSTP1;
using DSTP1_Request;
using Newtonsoft.Json;

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
    
    private void GuardarAsociado()
    {
        string temp = JsonConvert.SerializeObject(asociados);        
        System.IO.File.WriteAllText(asociadosJsonPath, temp);
    }

    private void CargarAsociados()
    {
        string json = System.IO.File.ReadAllText(asociadosJsonPath);
        asociados = JsonConvert.DeserializeObject<List<Asociado>>(json);
    }

    // [HttpGet(Name = "GetAsociado")]
    // public Task<Asociado> Get([FromQuery] string ID)
    // {
    //     Asociado a = new Asociado();                        
    // }

    [HttpPost(Name = "PostAsociado")]
    public async Task<Asociado> Post(AsociadoPostRequest request)
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
                
        return asociado;
    }
}
