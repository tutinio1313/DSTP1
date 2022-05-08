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
    //ListCuotas = await GetCuotas();
    //ListDonaciones = await GetDonaciones();
    //ListPedidos = await GetPedidos();
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
            InsertAsociados(ListAsociados, AsociadoCuotaSelect);
            break;
        case "DonacionView":
            InsertAsociados(ListAsociados, AsociadoDonacionSelect);
            //InsertPedido(ListPedidos, PedidoCuotaSelect);

            break;
        case "PedidoView":

            break;

        default:

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

function InsertAsociados(ListAsociados, list)
{
    if(ListAsociados.length != list.children.length)
    {
        for(var index = 0; index < ListAsociados.length; index++)
        {
            var option = document.createElement('option');
            option.id = index;
            option.value = ListAsociados[index].id;
            option.innerHTML = ListAsociados[index].id;
            list.appendChild(option);
        }
    }
}

async function SetAsociadoTable(SubIndex)
{
    ListAsociados = await GetAsociados();
    if(ListAsociados.length - SubIndex >= 5)
    {
        var indexTableAsociado = document.getElementById('indexTableAsociado');        
        cleanAsociadoTable();
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
        var indexTableAsociado = document.getElementById('indexTableAsociado');        
        cleanAsociadoTable();
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

function cleanAsociadoTable()
{
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
            var asociadoSelected = document.getElementById('a'+ SearchAsociado()).children;
            addView.style.display = "none";
            editView.style.display = "none";
            removeView.style.display = "inherit";

            document.getElementById('AsociadoRemoveViewMessage').innerHTML = "¿Esta seguro que desea borrar al asociado " + asociadoSelected.Nombre.innerHTML +" " + asociadoSelected.Apellido.innerHTML+"?";            
            break;
        case "EditView":
            var asociadoSelected = SearchAsociado();
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
function SetGrupoSanguineo(div)
{
    var grupos = setGrupos();
    const grupoSanguineoSelected = document.getElementById(div);

        for(var index = 0; index < grupos.length; index++)
        {
            if(grupos[index] != grupoSanguineoSelected)
            {
                grupos[index].checked = false;
            }
        }
}
function setGrupos()
{
    grupoSanguineoA = document.getElementById('asociadoGrupoSanguineoA');
    grupoSanguineoB = document.getElementById('asociadoGrupoSanguineoB');
    grupoSanguineoO = document.getElementById('asociadoGrupoSanguineoO');
    grupoSanguineoAB = document.getElementById('asociadoGrupoSanguineoAB');

    return [grupoSanguineoA, grupoSanguineoB, grupoSanguineoAB, grupoSanguineoO];
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
    var htmlState = document.getElementById('AsociadoStateExecution');

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
    var asociadoGrupoSanguineo = SearchGrupoSanguineo();
    var asociadoFactorSangre = SearchFactor();
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
    var fechaVencimiento = document.getElementById('PedidoFechaVencimiento').value;
    var cantidad = document.getElementById('PedidoCantidad').value;

    if(type == "Array")
    {
        return [
            selectedSolicitante
            ,fechaVencimiento
            ,cantidad
        ];
    }

    else
    {
        return {
            IDSolicintante : selectedSolicitante
            ,FechaEmision : Date.now
            ,FechaVencimiento : FechaVencimiento
            ,Cantidad : cantidad
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
function SearchGrupoSanguineo()
{
    var asociadoGrupoSanguineoA = document.getElementById('asociadoGrupoSanguineoA' ).checked;
    var asociadoGrupoSanguineoB = document.getElementById('asociadoGrupoSanguineoB' ).checked;
    var asociadoGrupoSanguineoAB= document.getElementById('asociadoGrupoSanguineoAB').checked;
    var asociadoGrupoSanguineoO = document.getElementById('asociadoGrupoSanguineoO' ).checked;

    if(asociadoGrupoSanguineoA)
    {
        return "A";
    }
    else if(asociadoGrupoSanguineoB)
    {
        return "B";
    }
    else if(asociadoGrupoSanguineoAB)
    {
        return "AB";
    }
    else if(asociadoGrupoSanguineoO)
    {
        return "0";
    }
    else
    {
        return null;
    }
}
function SearchFactor()
{
    var asociadoFactorPositivo = document.getElementById('asociadoFactorPositivo').checked;
    var asociadoFactorNegativo = document.getElementById('asociadoFactorNegativo').checked;

    if(asociadoFactorPositivo)
    {
        return "+";
    }
    else if(asociadoFactorNegativo)
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
    const asociados = document.getElementsByClassName('AsociadoCheckbox');
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