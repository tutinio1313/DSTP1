using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Newtonsoft.Json;
using dstp1_request;
using dstp1_response;

namespace dstp1.Controllers;

[ApiController]
[Route("[controller]")]
public class PedidoController : ControllerBase
{
    public string pedidosJsonPath = Directory.GetCurrentDirectory() + "/db/pedidos.json";
    
    public string solicitantesJsonPath = Directory.GetCurrentDirectory() + "/db/solicitantes.json";
    public List<Pedido> solicitantes = new List<Pedido>();
    public List<Pedido> pedidos = new List<Pedido>();

    private readonly ILogger<PedidoController> _logger;

    public PedidoController(ILogger<PedidoController> logger)
    {
        _logger = logger;
    }
    private void CargarPedidos()
    {
        string json = System.IO.File.ReadAllText(pedidosJsonPath);
        pedidos = JsonConvert.DeserializeObject<List<Pedido>>(json);
    }
        private void CargarSolicitantes()
    {
        string json = System.IO.File.ReadAllText(solicitantesJsonPath);
        solicitantes = JsonConvert.DeserializeObject<List<Pedido>>(json);
    }
        private void GuardarPedido(Pedido? pedido)
    {
        if(pedido != null) pedidos.Add(pedido);   
        string temp = JsonConvert.SerializeObject(pedidos);        
        System.IO.File.WriteAllText(pedidosJsonPath, temp);
    }

    private Pedido CrearPedido(PedidoPostRequest request)
    {
        Pedido pedido = new Pedido();
        pedido.ID = Convert.ToString(pedidos.Count);
        pedido.IDSolicitante = request.IDSolictante;
        pedido.FechaEmision = request.FechaEmision;
        pedido.FechaVencimiento = request.FechaVencimiento;
        pedido.CantidadSolicitada = request.Cantidad;

        return pedido;
    }

    [HttpGet(Name = "GetPedido")]

    public async Task<PedidoGetResponse> Get()
    {
        CargarPedidos();
        PedidoGetResponse response = new PedidoGetResponse();
        

        if(pedidos.Count > 0)
        {
            response.pedidos = pedidos;
            response.ExecutionSuccessful = true;
        }

        else
        {
            response.ExecutionSuccessful = false;
            response.ErrorMessage = "El dni del asociado ingresado no se encuentra, por favor revise los datos ingresados.";
        }
        return response;    
    }

    [HttpPost(Name = "PostPedido")]
    public async Task<PedidoPostResponse> Post(PedidoPostRequest request)
    {
        CargarPedidos();
        CargarSolicitantes();
        bool existeSolicitante = solicitantes.Exists(x => x.ID == request.IDSolictante);
        PedidoPostResponse response = new PedidoPostResponse();

        if(existeSolicitante)
        {
            response.pedido = CrearPedido(request);
            response.ExecutionSuccessful = true;
        }
        else
        {
            response.ExecutionSuccessful = false;
            response.ErrorMessage = "No se han cargado solicitantes, por favor cargue alguno antes.";
        }

        return response;
    }

    //[HttpDelete(Name = "DeletePedido")]

    // public async Task<PedidoDeleteResponse> Delete(PedidoDeleteRequest request)
    // {
        
    // }
}