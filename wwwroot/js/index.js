var ListAsociados;
const urlAsociado = "https://localhost:7278/Asociado";
const urlCuota = "https://localhost:7278/Cuota";
const urlDonacion = "https://localhost:7278/Donacion";
const urlPedido = "https://localhost:7278/Pedido";
const urlSolicitante = "https://localhost:7278/Solicitante";

async function ShowDiv(view)
{
    let views = SetViews();
    let buttons = SetButtons();
    let strViews = ['AsociadoView', 'CuotaView', 'DonacionView', 'PedidoView', 'SolicitanteView'];

    let defaultView = document.getElementById("defaultView");

    for(var index = 0; index < views.length; index++)
    {
        if (strViews[index] == view && views[index].style.display == 'none')
        {
            defaultView.style.display = 'none';
            views[index].style.display = 'inherit';
            buttons[index].style.background = "#a1acb6";
            buttons[index].style.borderColor = "#a1acb6";
        }
        else
        {
            views[index].style.display = 'none';
            buttons[index].style.background = "#ffffff";
            buttons[index].style.borderColor = "#ffffff";
            defaultView.style.display = 'inherit';
        }
    }

    ListAsociados = await GetAsociados();
    ListCuotas = await GetCuotas();
    ListDonaciones = await GetDonaciones();
    ListPedidos = await GetPedidos();
    ListSolicitantes = await GetSolicitantes();


    switch (view) {
        case "AsociadoView":
            if(ListAsociados != null)
            {
                SetIndexTableAsociado(ListAsociados);
                SetAsociadoTable(0);
            }
            break;

        case "CuotaView":
            InsertSelect(ListAsociados, AsociadoCuotaSelect);
            break;
        case "DonacionView":
            InsertSelect(ListAsociados, AsociadoDonacionSelect);
            InsertSelect(ListPedidos, PedidoDonacionSelect);
            break;
        case "PedidoView":
            InsertSelect(ListSolicitantes,SolicitantePedidoSelect);
            var now = new Date();
            const month = now.getMonth()+1;
            const date = now.getFullYear() + "-0"+month +"-" +now.getDate();
            document.getElementById('PedidoFechaVencimiento').setAttribute('min', date);

            if(ListPedidos != null)
            {
                SetPedidoTable(0);
            }
            break;

        default:
            if(ListSolicitantes != null)
            {
                SetSolicitanteTable(0);
            }
            break;
    }
}

async function SetIndexTableAsociado()
{
    ListAsociados = await GetAsociados();
    
    if(ListAsociados.length % 5 == 0)
    {
        if(indexTableAsociado.children.length == 0 || ListAsociados.length/5 < indexTableAsociado.children.length)
        {
            for(var index = 1; index <= ListAsociados.length/5; index++)
            {
                var indexElement = document.createElement('a');
                var paramenter = index;
                indexElement.id = "indexAsociado" + index;
                indexElement.innerHTML = index;
                indexTableAsociado.appendChild(indexElement);
                document.getElementById('indexAsociado'+index).setAttribute('onClick', 'SetAsociadoTable('+(paramenter-1)*5+')');
            }
        }
    }

    else
    {
        if(indexTableAsociado.children.length == 0 || (ListAsociados.length/5)+1 < indexTableAsociado.children.length)
        {
            for(var index = 1; index <= (ListAsociados.length/5)+1; index++)
            {
                var indexElement = document.createElement('a');
                var paramenter = index;
                indexElement.id = "indexAsociado"+index;
                indexElement.innerHTML = index;
                indexTableAsociado.appendChild(indexElement);            
                document.getElementById('indexAsociado'+index).setAttribute('onClick', 'SetAsociadoTable('+(paramenter-1)*5+')');
            }
        }
    }
}

function InsertSelect(array, list)
{
    if(array != null && array.length != list.children.length)
    {
        for(var index = 0; index < array.length; index++)
        {
            var option = document.createElement('option');
            option.id = index;
            option.value = array[index].id;
            option.innerHTML = array[index].id;
            list.appendChild(option);
        }
    }
}

async function SetAsociadoTable(SubIndex)
{
    ListAsociados = await GetAsociados();
    if(ListAsociados.length - SubIndex >= 5)
    {
        cleanTable("asociado");
        var innerIndex = 1;
        for(var index = SubIndex; index < SubIndex+5; index++)
        {            
            var tableRow = document.getElementById("a"+innerIndex).children;
            tableRow[0].disabled = false;
            tableRow[1].innerHTML = ListAsociados[index].id;
            tableRow[2].innerHTML = ListAsociados[index].nombre;
            tableRow[3].innerHTML = ListAsociados[index].apellido;

            if(ListAsociados[index].esDonante) tableRow[4].innerHTML = "Si";
            else tableRow[4].innerHTML = "No";

            tableRow[5].innerHTML = ListAsociados[index].localidad;
            tableRow[6].innerHTML = ListAsociados[index].telefono;
            tableRow[7].innerHTML = ListAsociados[index].domicilio;
            innerIndex++;
        }
    }
    else
    {
        cleanTable("asociado");
        var innerIndex = 1;
        for(var index = SubIndex; index < ListAsociados.length; index++)
        {                        
            var tableRow = document.getElementById("a"+innerIndex).children;
            tableRow[0].disabled = false;
            tableRow[1].innerHTML = ListAsociados[index].id;
            tableRow[2].innerHTML = ListAsociados[index].nombre;
            tableRow[3].innerHTML = ListAsociados[index].apellido;

            if(ListAsociados[index].esDonante) tableRow[4].innerHTML = "Si";
            else tableRow[4].innerHTML = "No";

            tableRow[5].innerHTML = ListAsociados[index].localidad;
            tableRow[6].innerHTML = ListAsociados[index].telefono;
            tableRow[7].innerHTML = ListAsociados[index].domicilio;
            innerIndex++;
        }
    }
}

async function SetCuotaTable(SubIndex)
{
    ListCuotas = await GetCuotas();
    if(ListCuotas.length - SubIndex >= 5)
    {
        cleanTable("cuota");
        var innerIndex = 1;
        for(var index = SubIndex; index < SubIndex+5; index++)
        {            
            var tableRow = document.getElementById("c"+innerIndex).children;
            tableRow[0].disabled = false;
            tableRow[1].innerHTML = ListAsociados[index].ID;
            tableRow[2].innerHTML = ListAsociados[index].IDAsociado;
            tableRow[3].innerHTML = ListAsociados[index].FechaEmision;
            tableRow[4].innerHTML = ListAsociados[index].FechaVencimiento;
            tableRow[5].innerHTML = ListAsociados[index].Importe;
            tableRow[6].innerHTML = ListAsociados[index].EstaPagado;
            tableRow[7].innerHTML = ListAsociados[index].FechaPago;
            innerIndex++;
        }
    }
    else
    {
        cleanTable("cuota");
        var innerIndex = 1;
        for(var index = SubIndex; index < ListCuotas.length; index++)
        {                        
            var tableRow = document.getElementById("c"+innerIndex).children;
            tableRow[0].disabled = false;
            tableRow[1].innerHTML = ListAsociados[index].ID;
            tableRow[2].innerHTML = ListAsociados[index].IDAsociado;
            tableRow[3].innerHTML = ListAsociados[index].FechaEmision;
            tableRow[4].innerHTML = ListAsociados[index].FechaVencimiento;
            tableRow[5].innerHTML = ListAsociados[index].Importe;
            tableRow[6].innerHTML = ListAsociados[index].EstaPagado;
            tableRow[7].innerHTML = ListAsociados[index].FechaPago;
            innerIndex++;
        }
    }
}

async function SetDonacionTable(SubIndex)
{
    ListDonaciones = await GetDonaciones();
    if(ListDonaciones.length - SubIndex >= 5)
    {
        cleanTable("donacion");
        var innerIndex = 1;
        for(var index = SubIndex; index < SubIndex+5; index++)
        {            
            var tableRow = document.getElementById("d"+innerIndex).children;
            tableRow[0].disabled = false;
            tableRow[1].innerHTML = ListAsociados[index].ID;
            tableRow[2].innerHTML = ListAsociados[index].IDAsociado;
            tableRow[3].innerHTML = ListAsociados[index].IDPedido;
            tableRow[4].innerHTML = ListAsociados[index].Fecha;
            tableRow[5].innerHTML = ListAsociados[index].Cantidad;
            innerIndex++;
        }
    }
    else
    {
        cleanTable("donacion");
        var innerIndex = 1;
        for(var index = SubIndex; index < ListDonaciones.length; index++)
        {                        
            var tableRow = document.getElementById("d"+innerIndex).children;
            tableRow[0].disabled = false;
            tableRow[1].innerHTML = ListAsociados[index].ID;
            tableRow[2].innerHTML = ListAsociados[index].IDAsociado;
            tableRow[3].innerHTML = ListAsociados[index].IDPedido;
            tableRow[4].innerHTML = ListAsociados[index].Fecha;
            tableRow[5].innerHTML = ListAsociados[index].Cantidad;
            innerIndex++;
        }
    }
}

async function SetPedidoTable(SubIndex)
{
    ListPedidos = await GetPedidos();
    if(ListPedidos.length - SubIndex >= 5)
    {
        cleanTable("pedido");
        var innerIndex = 1;
        for(var index = SubIndex; index < SubIndex+5; index++)
        {            
            var fechaEmision = new Date(JSON.parse(ListPedidos[index].fechaEmision));
            var fechaVencimiento =new Date(JSON.parse(ListPedidos[index].fechaVencimiento));

            var tableRow = document.getElementById("p"+innerIndex).children;
            tableRow[0].disabled = false;
            tableRow[1].innerHTML = ListPedidos[index].id;
            tableRow[2].innerHTML = ListPedidos[index].idSolicitante;
            tableRow[3].innerHTML = fechaEmision;
            tableRow[4].innerHTML = fechaVencimiento;
            tableRow[5].innerHTML = ListPedidos[index].cantidadSolicitada;
            if(ListPedidos[index].completado)
            {
                tableRow[6].innerHTML = "SI";
            }
            else
            {
                tableRow[6].innerHTML = "NO";
            }   
            innerIndex++;
        }
    }
    else
    {
        cleanTable("pedido");
        var innerIndex = 1;
        for(var index = SubIndex; index < ListPedidos.length; index++)
        {                        
            var fechaEmision = new Date(ListPedidos[index].fechaEmision);
            var fechaVencimiento =new Date(ListPedidos[index].fechaVencimiento);

            var tempMes = fechaEmision.getMonth() + 1;
            fechaEmision = fechaEmision.getDate() + "/" + tempMes + "/" + fechaEmision.getFullYear();

            
            var tempMes = fechaVencimiento.getMonth() + 1;
            fechaVencimiento = fechaVencimiento.getDate() + "/" + tempMes + "/" + fechaVencimiento.getFullYear();


            var tableRow = document.getElementById("p"+innerIndex).children;
            tableRow[0].disabled = false;
            tableRow[1].innerHTML = ListPedidos[index].id;
            tableRow[2].innerHTML = ListPedidos[index].idSolicitante;
            tableRow[3].innerHTML = fechaEmision;
            tableRow[4].innerHTML = fechaVencimiento;
            tableRow[5].innerHTML = ListPedidos[index].cantidadSolicitada;
            tableRow[6].innerHTML = ListPedidos[index].grupoSanguineo + ListPedidos[index].factor;
            if(ListPedidos[index].completado)
            {
                tableRow[7].innerHTML = "SI";
            }
            else
            {
                tableRow[7].innerHTML = "NO";
            }   
            innerIndex++;
        }
    }
}

async function SetSolicitanteTable(SubIndex)
{
    ListSolicitantes = await GetSolicitantes();
    if(ListSolicitantes.length - SubIndex >= 5)
    {
        cleanTable("solicitante");
        var innerIndex = 1;
        for(var index = SubIndex; index < SubIndex+5; index++)
        {            
            var tableRow = document.getElementById("s"+innerIndex).children;
            tableRow[0].disabled = false;
            tableRow[1].innerHTML = ListSolicitantes[index].id;
            tableRow[2].innerHTML = ListSolicitantes[index].nombre;
           
            innerIndex++;
        }
    }
    else
    {
        cleanTable("solicitante");
        var innerIndex = 1;
        for(var index = SubIndex; index < ListSolicitantes.length; index++)
        {                        
            var tableRow = document.getElementById("s"+innerIndex).children;
            tableRow[0].disabled = false;
            tableRow[1].innerHTML = ListSolicitantes[index].id;
            tableRow[2].innerHTML = ListSolicitantes[index].nombre;
            innerIndex++;
        }
    }
}


async function SetDisplayButtons(prefix,view,chk)
{
    var editButton = document.getElementById("edit"+ view);  
    var removeButton = document.getElementById("remove"+ view);
    var checkbox = document.getElementById(chk);
    var isChecked = false;

    for (let index = 0; index < 5; index++)
    {
        var checkboxIndex = index + 1;
        var tmpCheckbox = document.getElementById(prefix+checkboxIndex+"chk");

        if(checkbox == tmpCheckbox)
        {
            if(checkbox.checked)
            {
                isChecked = true;
            }
        }
        else
        {
            tmpCheckbox.checked = false;
         }
    }

    if(isChecked)
    {
        editButton.disabled = false;
        removeButton.disabled = false;

        
        editButton.style.animation = "300ms linear forwards buttonChangeToEnable"; 
        removeButton.style.animation = "300ms linear forwards buttonChangeToEnable"; 

        setTimeout(() => {
            editButton.style.background = "white";
            removeButton.style.background = "white";
        }, 300);
    }

    else
    {
        editButton.disabled = true;
        removeButton.disabled = true;

        editButton.style.animation = "300ms linear forwards buttonChangeToDisable"; 
        removeButton.style.animation = "300ms linear forwards buttonChangeToDisable"; 

        setTimeout(() => {
            editButton.style.background = "lightgray";
            removeButton.style.background = "lightgray";
        }, 300);
    }
}

function cleanTable(view)
{

    switch(view)
    {
        case "asociado":
        for(var index = 1; index <= 5; index++)
        {
                var tableRow = document.getElementById("a"+index).children;
                tableRow[0].disabled = true;
                tableRow[1].innerHTML = "";
                tableRow[2].innerHTML = "";
                tableRow[3].innerHTML = "";
                tableRow[4].innerHTML = "";
                tableRow[5].innerHTML = "";
                tableRow[6].innerHTML = "";
                tableRow[7].innerHTML = "";
        }
        break;

        case "cuota":
            for(var index = 1; index <= 5; index++)
            {
                var tableRow = document.getElementById("c"+index).children;
                tableRow[0].disabled = true;
                tableRow[1].innerHTML ="";
                tableRow[2].innerHTML ="";
                tableRow[3].innerHTML ="";
                tableRow[4].innerHTML ="";
                tableRow[5].innerHTML ="";
                tableRow[6].innerHTML ="";
                tableRow[7].innerHTML ="";
            }
        break;

        case "donacion":
            for(var index = 1; index <= 5; index++)
            {
                var tableRow = document.getElementById("d"+index).children;
                tableRow[0].disabled = true;
                tableRow[1].innerHTML = "";
                tableRow[2].innerHTML = "";
                tableRow[3].innerHTML = "";
                tableRow[4].innerHTML = "";
                tableRow[5].innerHTML = ""; 
            }
        break;

        case "pedido":
            for(var index = 1; index <= 5; index++)
            {
                var tableRow = document.getElementById("p"+index).children;
                tableRow[0].disabled = true;
                tableRow[1].innerHTML = "";
                tableRow[2].innerHTML = "";
                tableRow[3].innerHTML = "";
                tableRow[4].innerHTML = "";
                tableRow[5].innerHTML = "";
                tableRow[6].innerHTML = "";
            }
        break;
        
        default:
            for(var index = 1; index <= 5; index++)
            {
                var tableRow = document.getElementById("s"+index).children;
                tableRow[0].disabled = true;
                tableRow[1].innerHTML =""
                tableRow[2].innerHTML ="";
            }
        break;
    }
}

async function GetAsociados()
{
    const response = await fetch(urlAsociado,
        {
            method : 'GET',
            headers:
            {
            'accept' : 'application/json',
            'Content-Type' : 'application/json; charset=utf-8',
            }
        })
        .then(response => response.json())
        return response.asociados;
}

async function GetCuotas()
{
    const response = await fetch(urlCuota,
        {
            method : 'GET',
            headers:
            {
            'accept' : 'application/json',
            'Content-Type' : 'application/json; charset=utf-8',
            }
        })
        .then(response => response.json())
        return response.cuotas;
}


async function GetDonaciones()
{
    const response = await fetch(urlDonacion,
        {
            method : 'GET',
            headers:
            {
            'accept' : 'application/json',
            'Content-Type' : 'application/json; charset=utf-8',
            }
        })
        .then(response => response.json())
        return response.donaciones;
}


async function GetPedidos()
{
    const response = await fetch(urlPedido,
        {
            method : 'GET',
            headers:
            {
            'accept' : 'application/json',
            'Content-Type' : 'application/json; charset=utf-8',
            }
        })
        .then(response => response.json())
        return response.pedidos;
}

async function GetSolicitantes()
{
    const response = await fetch(urlSolicitante,
        {
            method : 'GET',
            headers:
            {
            'accept' : 'application/json',
            'Content-Type' : 'application/json; charset=utf-8',
            }
        })
        .then(response => response.json())
        return response.solicitantes;
}

function ShowOverlapView(view,overlapView)
{
    var addView = document.getElementById(view+"AddView");
    var editView = document.getElementById(view+'EditView');
    var removeView = document.getElementById(view+"RemoveView");

    switch (overlapView)
    {
        case 'AddView':
            addView.style.display = "inherit";
            editView.style.display = "none";
            removeView.style.display = "none";
            break;
        case 'RemoveView':
            addView.style.display = "none";
            editView.style.display = "none";
            removeView.style.display = "inherit";

            switch (view) {
                case 'Asociado':                    
                    var asociadoSelected = document.getElementById('a'+ SearchAsociado()).children;
                    document.getElementById('AsociadoRemoveViewMessage').innerHTML = "¿Esta seguro que desea borrar al asociado " + asociadoSelected.Nombre.innerHTML +" " + asociadoSelected.Apellido.innerHTML+"?";                
                    break;
                case 'Cuota':
                    var CuotaSelected = document.getElementById('c'+SearchCuota()).children;                        
                    document.getElementById('CuotaRemoveViewMessage').innerHTML = "¿Esta seguro que desea borrar la cuota N° " + CuotaSelected.ID.innerHTML+"?"; 
                    break;
                case 'Donacion':
                    var DonacionSelected = document.getElementById('d'+SearchDonacion()).children;                        
                    document.getElementById('DonacionRemoveViewMessage').innerHTML = "¿Esta seguro que desea borrar la donación N° " + DonacionSelected.ID.innerHTML+"?"; 
                    break;
                case 'Pedido':
                    var pedidoSelected = document.getElementById('c'+SearchPedido()).children;                        
                    document.getElementById('PedidoRemoveViewMessage').innerHTML = "¿Esta seguro que desea borrar el pedido N° " + pedidoSelected.ID.innerHTML+"?";
                    break; 
                default:
                    var solicitanteSelected = document.getElementById('c'+SearchSolicitante()).children;                        
                    document.getElementById('SolicitanteRemoveViewMessage').innerHTML = "¿Esta seguro que desea borrar al solicitante " + solicitanteSelected.ID.innerHTML+"?";
                    break; 
            }
            break;
        case "EditView":
            addView.style.display = "none";
            editView.style.display = "inherit";
            removeView.style.display = "none";
            break;
        default:
            addView.style.display = "none";
            editView.style.display = "none";
            removeView.style.display = "none";
            break;
    }
}

function SetViews()
{
    const defaultView = document.getElementById('defaultView');
    const AsociadoView = document.getElementById('AsociadoView');
    const CuotaView = document.getElementById('CuotaView');
    const DonacionView = document.getElementById('DonacionView');
    const PedidoView = document.getElementById('PedidoView');
    const SolicitanteView = document.getElementById('SolicitanteView');

    return [AsociadoView, CuotaView, DonacionView, PedidoView, SolicitanteView];
}

function SetButtons()
{
    const AsociadoButton = document.getElementById('btnAsociado');
    const CuotaButton = document.getElementById('btnCuota');
    const DonacionButton = document.getElementById('btnDonacion');
    const PedidoButton = document.getElementById('btnPedido');
    const SolicitanteButton = document.getElementById('btnSolicitante');

    return [AsociadoButton, CuotaButton, DonacionButton, PedidoButton, SolicitanteButton];
}

function SetEstaEnfermo(checkbox)
{
    var asociadoEstaEnfermo = document.getElementById('asociadoEstaEnfermo');
    var asociadoNoEstaEnfermo = document.getElementById('asociadoNoEstaEnfermo');

    if(checkbox == 'asociadoEstaEnfermo')
    {
        if(asociadoNoEstaEnfermo.checked)
        {
            asociadoNoEstaEnfermo.checked = !asociadoNoEstaEnfermo.checked;
        }
    }

    else
    {
        if(asociadoEstaEnfermo.checked)
        {
            asociadoEstaEnfermo.checked = !asociadoEstaEnfermo.checked;
        }
    }
}
function SetAsociadoMedicado(checkbox)
{
    var asociadoEstaMedicado = document.getElementById('asociadoEstaMedicado');
    var asociadoNoEstaMedicado = document.getElementById('asociadoNoEstaMedicado');

    if(checkbox == 'asociadoEstaMedicado')
    {
        if(asociadoNoEstaMedicado.checked)
        {
            asociadoNoEstaMedicado.checked = !asociadoNoEstaMedicado.checked;
        }
    }

    else
    {
        if(asociadoEstaMedicado.checked)
        {
            asociadoEstaMedicado.checked = !asociadoEstaMedicado.checked;
        }
    }
}
function SetGrupoSanguineo(div,view)
{
    var grupos = setGrupos(view);
    const grupoSanguineoSelected = document.getElementById(div);

        for(var index = 0; index < grupos.length; index++)
        {
            if(grupos[index] != grupoSanguineoSelected)
            {
                grupos[index].checked = false;
            }
        }
}
function setGrupos(view)
{
    if(view == "asociado")
    {
    grupoSanguineoA = document.getElementById('asociadoGrupoSanguineoA');
    grupoSanguineoB = document.getElementById('asociadoGrupoSanguineoB');
    grupoSanguineoO = document.getElementById('asociadoGrupoSanguineoO');
    grupoSanguineoAB = document.getElementById('asociadoGrupoSanguineoAB');

    return [grupoSanguineoA, grupoSanguineoB, grupoSanguineoAB, grupoSanguineoO];
    }

    else
    {
    grupoSanguineoA = document.getElementById('pedidoGrupoSanguineoA');
    grupoSanguineoB = document.getElementById('pedidoGrupoSanguineoB');
    grupoSanguineoO = document.getElementById('pedidoGrupoSanguineoO');
    grupoSanguineoAB = document.getElementById('pedidoGrupoSanguineoAB');
    
    return [grupoSanguineoA, grupoSanguineoB, grupoSanguineoAB, grupoSanguineoO];
    }
}
function SetAsociadoFactor(checkbox)
{
    var asociadoFactorPositivo = document.getElementById('asociadoFactorPositivo');
    var asociadoFactorNegativo = document.getElementById('asociadoFactorNegativo');

    if(checkbox == 'asociadoFactorPositivo')
    {
        if(asociadoFactorNegativo.checked)
        {
            asociadoFactorNegativo.checked = !asociadoFactorNegativo.checked;
        }
    }

    else
    {
        if(asociadoFactorPositivo.checked)
        {
            asociadoFactorPositivo.checked = !asociadoFactorPositivo.checked;
        }
    }
}
function SetPedidoFactor(checkbox)
{
    var pedidoFactorPositivo = document.getElementById('pedidoFactorPositivo');
    var pedidoFactorNegativo = document.getElementById('pedidoFactorNegativo');

    if(checkbox == 'pedidoFactorPositivo')
    {
        if(pedidoFactorNegativo.checked)
        {
            pedidoFactorNegativo.checked = !pedidoFactorNegativo.checked;
        }
    }

    else
    {
        if(pedidoFactorPositivo.checked)
        {
            pedidoFactorPositivo.checked = !pedidoFactorPositivo.checked;
        }
    }
}


function AsociadoCanPost()
{
    const asociado = SetAsociado("Array");
    return  asociado.every(x => x != "");;
}

function CuotaCanPost()
{
    const Cuota = SetCuota("Array");
    return cuota.every(x => x != "");
}

function DonacionCanPost()
{
    const Donacion = SetDonacion("Array");
    return Donacion.every(x => x != "");
}

function PedidoCanPost()
{
    const Pedido = SetPedido("Array");
    return Pedido.every(x => x != "");
}

function SolicitanteCanPost()
{
    const Solicitante = SetSolicitante("Array");
    return Solicitante.every(x => x != "");
}

async function PostAsociado()
{
    const sePuedeCargar = AsociadoCanPost();
    var htmlState = document.getElementById('AsociadoPostStateExecution');

    if(sePuedeCargar)
    {
        
        const AsociadoObject = SetAsociado("Object"); 
        const response = await fetch(urlAsociado,
            {
                method : 'POST',
                headers:
                {
                'accept' : 'application/json',
                'Content-Type' : 'application/json; charset=utf-8',
                },
                body : JSON.stringify(AsociadoObject)
            })
            .then(response => response.json())

            setTimeout(() => {
                if(response.executionSuccessful)
                {
                    htmlState.innerHTML = "El asociado " +AsociadoObject.Nombre + " "+ AsociadoObject.Apellido  +" se ha cargado exitosamente.";
                    htmlState.style.color = "green"; htmlState.style.display = "inherit";
                    clearInputs("AsociadAddView");
                    
                    SetAsociadoTable(5);
                }
                else
                {
                    htmlState.innerHTML = "El asociado ya fue ingresado.";
                    htmlState.style.color = "red"; htmlState.style.display = "inherit";
                }
            }, 150);
    }
    else
    {
        htmlState.innerHTML = "No has ingresado todos los datos, por favor revise lo ingresado.";
        htmlState.style.color = "red"; htmlState.style.display = "inherit";
    }
}

async function PostCuota()
{
    var StateExecution = document.getElementById('CuotaStateExecution');
    const canPost = CuotaCanPost();

    if(canPost)
    {

    }
}

async function PostDonacion()
{
    var StateExecution = document.getElementById('DonacionStateExecution');
    const canPost = DonacionCanPost();

    if(canPost)
    {

    }
}

async function PostPedido()
{
    var StateExecution = document.getElementById('PedidoAddStateExecution');
    const canPost = PedidoCanPost();

    if(canPost)
    {
        var pedido =SetPedido("Object");
        var response = await fetch(urlPedido,
            {
                method : 'POST',
                headers:
                {
                'accept' : 'application/json',
                'Content-Type' : 'application/json; charset=utf-8',
                },
                body : JSON.stringify(pedido)
            })
            .then(response => response.json())

            setTimeout(() => {
                if(response.executionSuccessful)
                {
                    StateExecution.innerHTML = "El pedido se ha cargado exitosamente.";
                    StateExecution.style.color = "green"; StateExecution.style.display = "inherit";
                    clearInputs("PedidoAddView");
                }
            }, 150);
    }
   
    else
    {
        StateExecution.innerHTML = "No has ingresado todos los datos, por favor revise lo ingresado.";
        StateExecution.style.color = "red"; StateExecution.style.display = "inherit";
    }
}
async function PostSolicitante()
{
    var StateExecution = document.getElementById('SolicitanteStateExecution');
    const canPost = SolicitanteCanPost();

    if(canPost)
    {
        var solicitante = SetSolicitante("Object");
        var response = await fetch(urlSolicitante,
            {
                method : 'POST',
                headers:
                {
                'accept' : 'application/json',
                'Content-Type' : 'application/json; charset=utf-8',
                },
                body : JSON.stringify(solicitante)
            })
            .then(response => response.json())

            setTimeout(() => {
                if(response.executionSuccessful)
                {
                    StateExecution.innerHTML = "El Solicitante " +solicitante.Nombre + " se ha cargado exitosamente.";
                    StateExecution.style.color = "green"; StateExecution.style.display = "inherit";
                    clearInputs("SolicitanteAddView");
                }
                else
                {
                    StateExecution.innerHTML = "El solicitante ya fue ingresado.";
                    StateExecution.style.color = "red"; StateExecution.style.display = "inherit";
                }
            }, 150);
    }

    else
    {
        StateExecution.innerHTML = "No has ingresado todos los datos, por favor revise lo ingresado.";
        StateExecution.style.color = "red"; StateExecution.style.display = "inherit";
    }
}

function clearInputs(div)
{
      const inputs = document.getElementsByTagName('input');

    for(let i = 0; i < inputs.length -1; i++)
    {
        if(inputs[i].Type == "checkbox")
        {
            inputs[i].checked = false;
        }

        else
        {
            inputs[i].value = "";
        }
    }
}

function SetAsociado(type)
{
    var asociadoName = document.getElementById('asociadoName').value;
    var asociadoLastname = document.getElementById('asociadoLastName').value;
    var asociadoEmail = document.getElementById('asociadoEmail').value;
    var asociadoEstaEnfermo = SearchEstaEnfermo().toString();
    var asociadoEstaMedicado = SearchEstaMedicado().toString();
    var asociadoID = document.getElementById('asociadoID').value;
    var asociadoLocalidad = document.getElementById('asociadoLocalidad').value;
    var asociadoDomicilio = document.getElementById('asociadoDomicilio').value;
    var asociadoGrupoSanguineo = SearchGrupoSanguineo("asociado");
    var asociadoFactorSangre = SearchFactor("asociado");
    var asociadoTelefono = document.getElementById('asociadoTelefono').value;
    var asociadoFechaNacimiento = document.getElementById('asociadoFechaNacimiento').value;

    if(type == "Array")
    {
        return [
            asociadoID
            ,asociadoName
            ,asociadoLastname
            ,asociadoEmail
            ,asociadoFechaNacimiento
            ,asociadoTelefono
            ,asociadoEstaEnfermo
            ,asociadoEstaMedicado
            ,asociadoLocalidad
            ,asociadoDomicilio
            ,asociadoGrupoSanguineo
            ,asociadoFactorSangre
        ]
    }

    else
    {
        return {
            ID : asociadoID
            ,Nombre : asociadoName
            ,Apellido : asociadoLastname
            ,Email : asociadoEmail
            ,FechaNacimiento : asociadoFechaNacimiento
            ,Telefono : asociadoTelefono
            ,EstaEnfermo :  SearchEstaEnfermo()
            ,EstaMedicado :  SearchEstaMedicado()
            ,Localidad : asociadoLocalidad
            ,Domicilio : asociadoDomicilio
            ,GrupoSanguineo : asociadoGrupoSanguineo
            ,Factor : asociadoFactorSangre
        };
    }
}

function SetCuota(type)
{
    var asociadoSelected = document.getElementById('AsociadoCuotaSelect').value;
    var cuotaImporte = document.getElementById('cuotaImporte').value;
    var cuotaFechaEmision = Date.now();
    var cuotaFechaVencimiento = document.getElementById('cuotaFechaVencimiento').value;
    
    if(type == "Array")
    {
        return [
            asociadoSelected,
            cuotaImporte,
            cuotaFechaVencimiento
        ];
    }
    else
    {
        return {
            asociadoID : asociadoSelected
            ,FechaEmitida : cuotaFechaEmision
            ,FechaVencimiento : cuotaFechaVencimiento
            ,Importe : parseFloat(cuotaImporte)
        };
    }
}

function SetDonacion(type)
{
    var asociadoSelected = document.getElementById('AsociadoDonacionSelected').value;
    var pedidoSelected = document.getElementById('PedidoDonacionSelected').value;
    var DonacionCantidad = document.getElementById('DonacionCantidad').value;
    var pedidoFecha = Date.now();
    
    if(type == "Array")
    {
        return [
            asociadoSelected
            ,pedidoSelected
            ,DonacionCantidad
        ];
    }
    else
    {
        return {
            IDAsociado : asociadoSelected
            ,IDPedido : pedidoSelected
            ,Cantidad : DonacionCantidad
            ,Fecha : pedidoFecha
        };
    }
}

function SetPedido(type)
{
    var selectedSolicitante = document.getElementById('SolicitantePedidoSelect').value;
    var fechaEmision = new Date();
    var fechaVencimiento = new Date(document.getElementById('PedidoFechaVencimiento').value);
    var cantidad = document.getElementById('PedidoCantidad').value;
    var grupoSanguineo = SearchGrupoSanguineo("pedido");
    var factor = SearchFactor("pedido");

    if(type == "Array")
    {
        return [
            selectedSolicitante
            ,fechaVencimiento
            ,cantidad
            ,grupoSanguineo
            ,factor
        ];
    }

    else
    {
        return {
            IDSolicitante : selectedSolicitante
            ,FechaEmision : fechaEmision.toJSON()
            ,FechaVencimiento : fechaVencimiento.toJSON()
            ,Cantidad : cantidad
            ,GrupoSanguineo : grupoSanguineo
            ,Factor : factor
        };
    }
}
function SetSolicitante(type)
{
    var idSolicitante = document.getElementById('solicitanteID').value;
    var nombreSolicitante = document.getElementById('solicitanteNombre').value;

    if(type == "Array")
    {
        return [
            idSolicitante
            ,nombreSolicitante
        ];
    }
    else
    {
        return {
            ID : idSolicitante
            , Nombre : nombreSolicitante
        };
    }
}



function SearchEstaEnfermo()
{
    var asociadoEstaEnfermo = document.getElementById('asociadoEstaEnfermo').checked;
    var asociadoNoEstaEnfermo = document.getElementById('asociadoNoEstaEnfermo').checked;

    if(asociadoEstaEnfermo)
    {
        return true;
    }
    else if(asociadoNoEstaEnfermo)
    {
        return false;
    }
    else
    {
        return null;
    }
}
function SearchEstaMedicado()
{
    var asociadoEstaMedicado = document.getElementById('asociadoEstaMedicado').checked;
    var asociadoNoEstaMedicado = document.getElementById('asociadoNoEstaMedicado').checked;

    if(asociadoEstaMedicado)
    {
        return true;
    }
    else if(asociadoNoEstaMedicado)
    {
        return false;
    }
    else    
    {
        return null;
    }
}
function SearchGrupoSanguineo(div)
{
    var GrupoSanguineoA;
    var GrupoSanguineoB;
    var GrupoSanguineoAB;
    var GrupoSanguineoO;
    

    if(div == "asociado")
    {
        GrupoSanguineoA = document.getElementById('asociadoGrupoSanguineoA' ).checked;
        GrupoSanguineoB = document.getElementById('asociadoGrupoSanguineoB' ).checked;
        GrupoSanguineoAB= document.getElementById('asociadoGrupoSanguineoAB').checked;
        GrupoSanguineoO = document.getElementById('asociadoGrupoSanguineoO' ).checked;
    }
    else
    {
        GrupoSanguineoA = document.getElementById('pedidoGrupoSanguineoA' ).checked;
        GrupoSanguineoB = document.getElementById('pedidoGrupoSanguineoB' ).checked;
        GrupoSanguineoAB= document.getElementById('pedidoGrupoSanguineoAB').checked;
        GrupoSanguineoO = document.getElementById('pedidoGrupoSanguineoO' ).checked;
    }

    if(GrupoSanguineoA)
    {
        return "A";
    }
    else if(GrupoSanguineoB)
    {
        return "B";
    }
    else if(GrupoSanguineoAB)
    {
        return "AB";
    }
    else if(GrupoSanguineoO)
    {
        return "0";
    }
    else
    {
        return null;
    }
}

function SearchFactor(div)
{
    var FactorPositivo;
    var FactorNegativo;

    if(div == "asociado")
    {
        FactorPositivo = document.getElementById('asociadoFactorPositivo').checked;
        FactorNegativo = document.getElementById('asociadoFactorNegativo').checked;
    }
    else
    {
        FactorPositivo = document.getElementById('pedidoFactorPositivo').checked;
        FactorNegativo = document.getElementById('pedidoFactorNegativo').checked;
    }
    if(FactorPositivo)
    {
        return "+";
    }
    else if(FactorNegativo)
    {
        return "-";
    }
    else
    {
        return null;
    }
}

function SearchAsociado()
{
    const asociados = document.getElementsByClassName('AsociadoCheckbox');

    for (let index = 0; index < asociados.length; index++)
    {
        if(asociados[index].checked)
        {
            return asociadoSelected = index+1;
        }
    }
}

async function RemoveAsociado()
{
    var asociadoSelected = SearchAsociado();

    if(asociadoSelected != null)
    {
        asociadoSelected = document.getElementById('a'+asociadoSelected).children;
        const asociado = {
            ID : asociadoSelected.ID.innerHTML
        }

        response = await fetch(urlAsociado
            ,
            {
            method : 'DELETE',
            headers:
            {
            'accept' : 'application/json',
            'Content-Type' : 'application/json; charset=utf-8',
            },
            body : JSON.stringify(asociado)
            })
            .then(response => response.json())

            SetAsociadoTable(0);
            document.getElementById('AsociadoRemoveStateExecution').innerHTML = "El asociado se ha eliminado exitosamente.";
    }
}

async function RemoveCuota()
{
    var CuotaSelected = SearchCuota();
    if(CuotaSelected != null)
    {
        CuotaSelected =document.getElementById('c'+CuotaSelected).children;

        const cuota = {
            ID : CuotaSelected.ID.innerHTML
        }

        response = await fetch(urlCuota,
            {
                method : 'DELETE'
                ,headers : 
                {
                    'accept' : 'application/json'
                    ,'Content-Type' : 'application/json; charset=utf-8',
                },
                body : JSON.stringify(cuota)
            })
            .then(response => response.JSON())


            document.getElementById('CuotaRemoveStateExecution').innerHTML = "La cuota se ha eliminado exitosamente";
    }
}

async function RemoveDonacion()
{
    var DonacionSelected = SearchDonacion();
    if(DonacionSelected != null)
    {
        DonacionSelected =document.getElementById('d'+DonacionSelected).children;

        const donacion = {
            ID : DonacionSelected.ID.innerHTML
        }

        response = await fetch(urlDonacion,
            {
                method : 'DELETE'
                ,headers : 
                {
                    'accept' : 'application/json'
                    ,'Content-Type' : 'application/json; charset=utf-8',
                },
                body : JSON.stringify(donacion)
            })
            .then(response => response.JSON())


            document.getElementById('DonacionRemoveStateExecution').innerHTML = "La donación se ha eliminado exitosamente";
    }
}

async function RemovePedido()
{
var pedidoSelected = pedidoSelected();
    if(pedidoSelected != null)
    {
        pedidoSelected =document.getElementById('p'+pedidoSelected).children;

        const pedido = {
            ID : pedidoSelected.ID.innerHTML
        }

        response = await fetch(urlPedido,
            {
                method : 'DELETE'
                ,headers : 
                {
                    'accept' : 'application/json'
                    ,'Content-Type' : 'application/json; charset=utf-8',
                },
                body : JSON.stringify(pedido)
            })
            .then(response => response.JSON())


            document.getElementById('PedidoRemoveStateExecution').innerHTML = "El pedido se ha eliminado exitosamente";
    }
}

async function RemoveSolicitante()
{
    var solicitanteSelected = SearchSolicitante();
    if(solicitanteSelected != null)
    {
        solicitanteSelected =document.getElementById('s'+solicitanteSelected).children;

        const solicitante = {
            ID : solicitanteSelected.ID.innerHTML
        }

        response = await fetch(urlSolicitante,
            {
                method : 'DELETE'
                ,headers : 
                {
                    'accept' : 'application/json'
                    ,'Content-Type' : 'application/json; charset=utf-8',
                },
                body : JSON.stringify(solicitante)
            })
            .then(response => response.JSON())


            document.getElementById('SolicitanteRemoveStateExecution').innerHTML = "El solicitante se ha eliminado exitosamente";
    }
}