using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Newtonsoft.Json;
using dstp1_request;
using dstp1_response;

namespace dstp1.Controllers;

[ApiController]
[Route("[controller]")]
public class DonacionController : ControllerBase
{
    public string donacionesJsonPath = Directory.GetCurrentDirectory() + "/db/donaciones.json";
    public List<Donacion> donaciones = new List<Donacion>();

    private readonly ILogger<DonacionController> _logger;

    public DonacionController(ILogger<DonacionController> logger)
    {
        _logger = logger;
    }

    private Donacion CrearSolicitante(SolicitantePostRequest request)
    {
        Donacion donacion = new Donacion();
        donacion.ID = request.ID;
        //donacion.Nombre = request.Nombre;        
        GuardarSolicitante(donacion);
        return donacion;
    }

    private void GuardarSolicitante(Donacion donacion)
    {
        donaciones.Add(donacion);
        string temp = JsonConvert.SerializeObject(donaciones);        
        System.IO.File.WriteAllText(donacionesJsonPath, temp);
    }

    private void CargarDonaciones()
    {
        string json = System.IO.File.ReadAllText(donacionesJsonPath);
        donaciones = JsonConvert.DeserializeObject<List<Donacion>>(json);
    }
}