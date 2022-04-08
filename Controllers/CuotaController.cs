using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Newtonsoft.Json;
using dstp1_request;
using dstp1_response;

namespace dstp1.Controllers;

[ApiController]
[Route("[controller]")]
public class CuotaController : ControllerBase
{
    public string cuotasJsonPath = Directory.GetCurrentDirectory() + "/db/cuotas.json";
    public List<Cuota> cuotas = new List<Cuota>();

    private readonly ILogger<CuotaController> _logger;

    public CuotaController(ILogger<CuotaController> logger)
    {
        _logger = logger;
    }
    private void CargarCuotas()
    {
        string json = System.IO.File.ReadAllText(cuotasJsonPath);
        cuotas = JsonConvert.DeserializeObject<List<Cuota>>(json);

        if(cuotas == null)
        {
            cuotas = new List<Cuota>();
        }
    }

    private Cuota ModificarCuota(Cuota cuota/*, CuotaPutRequest request*/)
    {
        return cuota;
    }

    [HttpGet(Name ="GetCuota")]
    public async Task<CuotaGetResponse> Get([FromQuery] string ID)
    {
        CargarCuotas();
        CuotaGetResponse response = new CuotaGetResponse();
        bool cuotaExiste = cuotas.Exists(x=> x.ID == ID);

        if(cuotaExiste)
        {
            response.cuota = cuotas.Find(x=> x.ID == ID);
            response.ExecutionSuccessful = true;
        }

        else
        {
            response.ExecutionSuccessful = false;
            response.ErrorMessage = "La cuota ingresada no se ha encontrado.";
        }
        return response;
    }
}