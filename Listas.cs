using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using dstp1_request;

namespace dstp1
{
    public class Listas
    {
        private static Listas? listas;

        private static string asociadosJsonPath = Directory.GetCurrentDirectory() + "/db/asociados.json";
        private static string cuotasJsonPath = Directory.GetCurrentDirectory() + "/db/cuotas.json";
        private static string donacionesJsonPath = Directory.GetCurrentDirectory() + "/db/donaciones.json";
        private static string pedidosJsonPath = Directory.GetCurrentDirectory() + "/db/pedidos.json";
        private static string solicitantesJsonPath = Directory.GetCurrentDirectory() + "/db/solicitantes.json";
        

        private static List<Asociado> asociados;
        private static List<Pedido> pedidos;
        private static List<Cuota> cuotas;
        private static List<Donacion> donaciones;
        private static List<Solicitante> solicitantes;
        
        private Listas()
        {
                                    
        }

        public static List<Asociado> getAsociados()
        {
            if(listas == null)
            {
                CreateLists();
            }
            return asociados;
        } 
        public static List<Cuota> getCuotas()
        {
            if(listas == null)
            {
                CreateLists();
            }
            return cuotas;
        }
        public static List<Donacion> getDonaciones()
        {
            if(listas == null)
            {
                CreateLists();
            }
            return donaciones;
        }
        public static List<Pedido> GetPedidos() 
        {
            if(listas == null)
            {
                CreateLists();
            }
            return pedidos;
        }
        public static List<Solicitante> GetSolicitantes() 
        {
            if(listas == null)
            {
                CreateLists();
            }
            return solicitantes;
        }

        private static void CreateLists()
        {

            if(listas == null)    
            {
                listas = new Listas();

                string jsonAsociados = System.IO.File.ReadAllText(asociadosJsonPath);
                string jsonCuotas = System.IO.File.ReadAllText(cuotasJsonPath);
                string jsonDonaciones = System.IO.File.ReadAllText(donacionesJsonPath);
                string jsonPedidos = System.IO.File.ReadAllText(pedidosJsonPath);
            
                string jsonSolicitantes = System.IO.File.ReadAllText(solicitantesJsonPath);
                
                asociados = JsonConvert.DeserializeObject<List<Asociado>>(jsonAsociados);
                cuotas = JsonConvert.DeserializeObject<List<Cuota>>(jsonCuotas);
                donaciones = JsonConvert.DeserializeObject<List<Donacion>>(jsonDonaciones);
                pedidos = JsonConvert.DeserializeObject<List<Pedido>>(jsonPedidos);
                solicitantes = JsonConvert.DeserializeObject<List<Solicitante>>(jsonSolicitantes);

                asociados.Sort(delegate(Asociado asociadoA, Asociado asociadoB)
                {
                    if(asociadoA.ID == null && asociadoB.ID == null) return 0;
                    else if(asociadoA.ID == null) return -1;
                    else if(asociadoB.ID == null) return 1;
                    else return asociadoA.ID.CompareTo(asociadoB.ID);
                }        
                );

                if(asociados == null)
                {
                    asociados = new List<Asociado>();
                }
                
                if(cuotas == null)
                {
                    cuotas = new List<Cuota>();
                }

                if(donaciones == null)
                {
                    donaciones = new List<Donacion>();
                }

                if(pedidos == null)
                {
                    pedidos = new List<Pedido>();
                }

                if(solicitantes == null)
                {
                    solicitantes = new List<Solicitante>();
                }            
            }
        }  

        public static void AddAsociado(Asociado asociado)
        {
            if(asociado != null)
            {
                SaveAsociado(asociado);
            }
        }   

        public static void AddCuota(Cuota cuota)
        {
            if(cuota != null)
            {
                SaveCuota(cuota);
            }
        }

        public static void AddDonacion(Donacion donacion)
        {
            if(donacion != null)
            {
                SaveDonacion(donacion);
            }
        }

        public static void AddPedido(Pedido pedido)
        {
            if(pedido != null)
            {
                SavePedido(pedido);
            }
        }

        public static void AddSolicitante(Solicitante solicitante)
        {
            if(solicitante != null)
            {
                SaveSolicitante(solicitante);
            }
        }

        public static void RemoveAsociado(Asociado asociado)
        {
            asociados.Remove(asociado);
            SaveAsociado(null);
        }

        public static void RemoveCuota(Cuota cuota)
        {
            cuotas.Remove(cuota);
            SaveCuota(null);            
        }

        public static void RemoveDonacion(Donacion donacion)        
        {
            donaciones.Remove(donacion);
            SaveDonacion(null);
        }

        public static void RemovePedido(Pedido pedido)
        {
            pedidos.Remove(pedido);
            SavePedido(null);
        }

        public static void RemoveSolicitante(Solicitante solicitante)
        {
            solicitantes.Remove(solicitante);
            SaveSolicitante(null);
        }

        public static Asociado PutAsociado(AsociadoPutRequest request ,Asociado asociado)
        {
            if(request.Domicilio != null)
            {
                asociado.Domicilio = request.Domicilio;
            }
            if(request.Email != null)
            {
                asociado.Email = request.Email;
            }
            if(request.Telefono != null)
            {
                asociado.Telefono = request.Telefono;
            }
            if(request.Localidad != null)
            {
                asociado.Localidad = request.Localidad; 
            }
            if(request.Domicilio != null)
            {
                asociado.Domicilio = request.Domicilio;
            }
            asociado.EstaEnfermo = request.EstaEnfermo;
            asociado.EstaMedicado = request.EstaMedicado;
            RemoveAsociado(asociado);
            SaveAsociado(asociado);
            return asociado;
        }

        private static void SaveAsociado(Asociado asociado)
        {
         if(asociado != null)
        {
            asociados.Add(asociado);
            asociados.OrderBy(x=>x.ID);
        }    
        string temp = JsonConvert.SerializeObject(asociados);        
        System.IO.File.WriteAllText(asociadosJsonPath, temp);
        }

        private static void SaveCuota(Cuota cuota)
        {
        if(cuota != null)
        {
            cuotas.Add(cuota);
            cuotas.OrderBy(x=>x.IDAsociado);
        }    

        string temp = JsonConvert.SerializeObject(cuotas);        
        System.IO.File.WriteAllText(cuotasJsonPath, temp);
        }


        private static void SaveDonacion(Donacion donacion)
        {
        if(donacion != null)
        {
            donaciones.Add(donacion);
            donaciones.OrderBy(x=>x.ID);
        }    

        string temp = JsonConvert.SerializeObject(donaciones);        
        System.IO.File.WriteAllText(donacionesJsonPath, temp);
        }


        private static void SavePedido(Pedido pedido)
        {
        if(pedido != null)
        {
            pedidos.Add(pedido);
            pedidos.OrderBy(x=>x.ID);
        }    

        string temp = JsonConvert.SerializeObject(pedidos);        
        System.IO.File.WriteAllText(pedidosJsonPath, temp);
        }


        private static void SaveSolicitante(Solicitante solicitante)
        {
        if(solicitante != null)
        {
            solicitantes.Add(solicitante);
            solicitantes.OrderBy(x=>x.ID);
        }    

        string temp = JsonConvert.SerializeObject(solicitantes);        
        System.IO.File.WriteAllText(solicitantesJsonPath, temp);
        }
    }
}