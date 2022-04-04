using Microsoft.AspNetCore.Mvc;
using DSTP1;
using DSTP1_Request;

namespace dstp1.Controllers;

[ApiController]
[Route("[controller]")]
public class AsociadoController : ControllerBase
{ 
    public string clientPath = Directory.GetCurrentDirectory() + "/db/asociados.json";

    private readonly ILogger<AsociadoController> _logger;

    public AsociadoController(ILogger<AsociadoController> logger)
    {
        _logger = logger;
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
        asociado.EsDonante = request.EsDonante;
        asociado.EstaEnfermo = request.EstaEnfermo;
        asociado.EstaMedicado = request.EstaMedicado;
        asociado.Localidad = request.Localidad;
        asociado.Domicilio = request.Domicilio;
        asociado.GrupoSanguineo = request.GrupoSanguineo;
        asociado.Factor = request.Factor;
                
        return asociado;
    }
}
