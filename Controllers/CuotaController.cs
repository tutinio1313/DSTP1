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
    public List<Asociado> asociados;
    public List<Cuota> cuotas;

    private readonly ILogger<CuotaController> _logger;

    public CuotaController(ILogger<CuotaController> logger)
    {
        _logger = logger;
    }
    private Cuota ModificarCuota(Cuota cuota/*, CuotaPutRequest request*/)
    {
        return cuota;
    }
    private Cuota CrearCuota(CuotaPostRequest request)
    {
        Cuota cuota = new Cuota();

        cuota.ID = Convert.ToString(cuotas.Count);
        cuota.IDAsociado = request.IDAsociado;
        cuota.FechaEmitida = request.FechaEmitida;
        cuota.FechaVencimiento = request.FechaVencimiento;
        cuota.Importe = request.Importe;
        
        Listas.AddCuota(cuota);
        
        return cuota;
    }

    [HttpGet(Name ="GetCuota")]

     public async Task<CuotaGetResponse> Get()
    {
        cuotas = Listas.getCuotas();
        CuotaGetResponse response = new CuotaGetResponse();
        
        if(cuotas.Count > 0)
        {
            response.cuotas = cuotas;
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
        asociados = Listas.getAsociados();
        cuotas = Listas.getCuotas();
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
        cuotas = Listas.getCuotas();
        bool existeCuota = cuotas.Exists(x => x.ID == request.ID);
        CuotaDeleteResponse response = new CuotaDeleteResponse();
        if(existeCuota)
        {
            response.ExecutionSuccessful = true;
            response.cuota = cuotas.Find(x=> x.ID == request.ID); 
            Listas.RemoveCuota(response.cuota);

        }
        else
        {
            response.ExecutionSuccessful = false;
            response.ErrorMessage = "La cuota no se ha encontrado por favor revise los datos ingresados.";
        }
        return response;
    } 
}