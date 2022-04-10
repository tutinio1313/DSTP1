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
    public string asociadosJsonPath = Directory.GetCurrentDirectory() + "/db/asociados.json";
    public List<Asociado> asociados = new List<Asociado>();
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
    private void CargarAsociados()
    {
        string json = System.IO.File.ReadAllText(asociadosJsonPath);
        asociados = JsonConvert.DeserializeObject<List<Asociado>>(json);

        if(asociados == null)
        {
            asociados = new List<Asociado>();
        }
    }

    private Cuota ModificarCuota(Cuota cuota/*, CuotaPutRequest request*/)
    {
        return cuota;
    }

    private List<Cuota> ObtenerCuotas(int index)
    {
        List<Cuota> partialCuotas = new List<Cuota>(); 
        for(;index < index+5; index++)
        {
            partialCuotas.Add(cuotas[index]);
        }
        return partialCuotas;
    }

    private Cuota CrearCuota(CuotaPostRequest request)
    {
        Cuota cuota = new Cuota();

        cuota.ID = Convert.ToString(cuotas.Count);
        cuota.IDAsociado = request.IDAsociado;
        cuota.FechaEmitida = request.FechaEmitida;
        cuota.FechaVencimiento = request.FechaVencimiento;
        cuota.Importe = request.Importe;
        
        return cuota;
    }

    [HttpGet(Name ="GetCuota")]
    public async Task<CuotaGetResponse> Get([FromQuery] string ID)
    {
        CargarCuotas();
        CuotaGetResponse response = new CuotaGetResponse();
        
        if(cuotas.Count > 0)
        {
            response.cuotas = ObtenerCuotas(int.Parse(ID));
            response.ExecutionSuccessful = true;
        }

        else
        {
            response.ExecutionSuccessful = false;
            response.ErrorMessage = "La cuota ingresada no se ha encontrado.";
        }
        return response;
    }

    [HttpPost(Name = "PostCuota")]

    public async Task<CuotaPostResponse> Post(CuotaPostRequest request)
    {
        CargarAsociados();
        CargarCuotas();
        CuotaPostResponse response = new CuotaPostResponse();
        
        bool existeAsociado = asociados.Exists(x => x.ID == request.IDAsociado);

        if(existeAsociado)
        {
            response.ExecutionSuccessful = true;
            response.cuota = CrearCuota(request);
        }

        else
        {
            response.ExecutionSuccessful = false;
            response.ErrorMessage = "El asociado no existe, por favor revise los datos ingresados.";
        }

        return response;
    }

    [HttpDelete(Name = "DeleteCuota")] 
    public async Task<CuotaDeleteResponse> Delete(CuotaDeleteRequest request)
    {
        CargarCuotas();
        bool existeCuota = cuotas.Exists(x => x.ID == request.ID);
        CuotaDeleteResponse response = new CuotaDeleteResponse();
        if(existeCuota)
        {
            response.ExecutionSuccessful = true;
            response.cuota = cuotas.Find(x=> x.ID == request.ID); cuotas.Remove(response.cuota);
        }
        else
        {
            response.ExecutionSuccessful = false;
            response.ErrorMessage = "La cuota no se ha encontrado por favor revise los datos ingresados.";
        }
        return response;
    }
 
}