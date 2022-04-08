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
}