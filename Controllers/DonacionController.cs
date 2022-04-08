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
    public string asociadosJsonPath = Directory.GetCurrentDirectory() + "/db/asociados.json";
    public string pedidosJsonPath = Directory.GetCurrentDirectory() + "/db/pedidos.json";
    public List<Pedido> pedidos = new List<Pedido>();
    public List<Asociado> asociados = new List<Asociado>();
    public List<Donacion> donaciones = new List<Donacion>();

    private readonly ILogger<DonacionController> _logger;

    public DonacionController(ILogger<DonacionController> logger)
    {
        _logger = logger;
    }

    private Donacion CrearDonacion(DonacionPostRequest request)
    {
        Donacion donacion = new Donacion();
        donacion.ID = request.ID;
        donacion.IDAsociado = request.IDAsociado;   
        donacion.IDPedido = request.IDPedido;
        donacion.Cantidad = request.Cantidad;
        donacion.Fecha = request.Fecha;     
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
        private void CargarAsociados()
    {
        string json = System.IO.File.ReadAllText(asociadosJsonPath);
        asociados = JsonConvert.DeserializeObject<List<Asociado>>(json);

        if(asociados == null)
        {
            asociados = new List<Asociado>();
        }
    }
    private void CargarPedidos()
    {
        string json = System.IO.File.ReadAllText(pedidosJsonPath);
        pedidos = JsonConvert.DeserializeObject<List<Pedido>>(json);
    }

    private List<Donacion> ObtenerDonaciones(int index)
    {        
        List<Donacion> partialDonaciones = new List<Donacion>(); 
        for(int i = 0;i < index; i++)
        {
            partialDonaciones.Add(donaciones[index]);
        }
        return partialDonaciones;        
    }

        [HttpGet(Name ="GetDonacion")]
    public async Task<DonacionGetResponse> Get([FromQuery] string ID)
    {
        CargarDonaciones();
        DonacionGetResponse response = new DonacionGetResponse();
        
        if(donaciones.Count > 0)
        {
            response.donaciones = ObtenerDonaciones(int.Parse(ID));
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
        CargarAsociados();
        CargarDonaciones();
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
        CargarDonaciones();
        bool existeDonacion = donaciones.Exists(x => x.ID == request.ID);
        DonacionDeleteResponse response = new DonacionDeleteResponse();
        if(existeDonacion)
        {
            response.ExecutionSuccessful = true;
            response.donacion = donaciones.Find(x=> x.ID == request.ID); donaciones.Remove(response.donacion);
        }
        else
        {
            response.ExecutionSuccessful = false;
            response.ErrorMessage = "La Donacion no se ha encontrado por favor revise los datos ingresados.";
        }
        return response;
    }
}