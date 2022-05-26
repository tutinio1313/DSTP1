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
    private List<Solicitante> solicitantes;
    private List<Pedido> pedidos;

    private readonly ILogger<PedidoController> _logger;

    public PedidoController(ILogger<PedidoController> logger)
    {
        _logger = logger;
    }
   
    private Pedido CrearPedido(PedidoPostRequest request)
    {
        Pedido pedido = new Pedido();
        pedido.ID = Convert.ToString(pedidos.Count);
        pedido.IDSolicitante = request.IDSolictante;
        pedido.FechaEmision = request.FechaEmision;
        pedido.FechaVencimiento = request.FechaVencimiento;
        pedido.CantidadSolicitada = request.Cantidad;

        Listas.AddPedido(pedido);

        return pedido;
    }

    [HttpGet(Name = "GetPedido")]

    public async Task<PedidoGetResponse> Get()
    {
        pedidos = Listas.GetPedidos();
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
        pedidos = Listas.GetPedidos();
        solicitantes = Listas.GetSolicitantes();
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

    [HttpDelete(Name = "DeletePedido")]

    public async Task<PedidoDeleteResponse> Delete(PedidoDeleteRequest request)
    {
        pedidos = Listas.GetPedidos();
        bool existePedido = pedidos.Exists(x=> x.ID == request.ID);
        PedidoDeleteResponse response = new PedidoDeleteResponse();

        if(existePedido)
        {
            response.ExecutionSuccessful = true;
            response.pedido = pedidos.Find(x=> x.ID == request.ID); 
            Listas.RemovePedido(response.pedido);
        }        
        else
        {
            response.ExecutionSuccessful = false;
            response.ErrorMessage = "El pedido no se ha encontrado, por favor revise el n° de pedido.";
        }
        return response;
    }
}