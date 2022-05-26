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
    private List<Pedido> pedidos;
    private List<Asociado> asociados;
    private List<Donacion> donaciones;

    private readonly ILogger<DonacionController> _logger;

    public DonacionController(ILogger<DonacionController> logger)
    {
        _logger = logger;
    }

    private Donacion CrearDonacion(DonacionPostRequest request)
    {
        Donacion donacion = new Donacion();
        donacion.ID = Convert.ToString(donaciones.Count+1);
        donacion.IDAsociado = request.IDAsociado;   
        donacion.IDPedido = request.IDPedido;
        donacion.Cantidad = request.Cantidad;
        donacion.Fecha = request.Fecha;     
        Listas.AddDonacion(donacion);
        return donacion;
    }

        [HttpGet(Name ="GetDonacion")]
    public async Task<DonacionGetResponse> Get()
    {
        DonacionGetResponse response = new DonacionGetResponse();
        
        if(donaciones.Count > 0)
        {
            response.donaciones = Listas.getDonaciones();
            response.ExecutionSuccessful = true;
        }

        else
        {
            response.ExecutionSuccessful = false;
            response.ErrorMessage = "La Donacion ingresada no se ha encontrado.";
        }
        return response;
    }

    [HttpPost(Name = "PostDonacion")]

    public async Task<DonacionPostResponse> Post(DonacionPostRequest request)
    {
        asociados = Listas.getAsociados();
        donaciones = Listas.getDonaciones();
        DonacionPostResponse response = new DonacionPostResponse();
        
        bool existeAsociado = asociados.Exists(x => x.ID == request.IDAsociado);
        bool existePedido = pedidos.Exists(x=> x.ID == request.IDPedido);

        if(existeAsociado && existePedido)
        {
            response.ExecutionSuccessful = true;
            response.donacion = CrearDonacion(request);
        }

        else
        {
            response.ExecutionSuccessful = false;
            response.ErrorMessage = "El asociado no existe, por favor revise los datos ingresados.";
        }

        return response;
    }

    [HttpDelete(Name = "DeleteDonacion")] 
    public async Task<DonacionDeleteResponse> Delete(DonacionDeleteRequest request)
    {
        donaciones = Listas.getDonaciones();
        bool existeDonacion = donaciones.Exists(x => x.ID == request.ID);
        DonacionDeleteResponse response = new DonacionDeleteResponse();
        if(existeDonacion)
        {
            response.ExecutionSuccessful = true;
            response.donacion = donaciones.Find(x=> x.ID == request.ID); 
            Listas.RemoveDonacion(response.donacion);
        }
        else
        {
            response.ExecutionSuccessful = false;
            response.ErrorMessage = "La Donacion no se ha encontrado por favor revise los datos ingresados.";
        }
        return response;
    }
}