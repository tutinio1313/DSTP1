var ListAsociados;
const urlAsociado = "https://localhost:7278/Asociado";

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
    //ListSolicitantes = await GetSolicitantes();


    switch (view) {
        case "AsociadoView":
            console.log(ListAsociados);
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

function cleanAsociadoTable()
{
    for(var index = 1; index <= 5; index++)
    {
            var tableRow = document.getElementById("a"+index).children;
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

function ShowOverlapView(overlapView, view)
{
    document.getElementById(view+overlapView).style.display = 'inherit';
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
    const asociado = SetAsociado();
    var state = asociado.every(x => x != "")

    if(state)
    {
        document.getElementById('Submit').disable = false;
    }
    else
    {
        document.getElementById('Submit').disable = true;
    }

    return state;
}

async function PostAsociado()
{
    const sePuedeCargar = AsociadoCanPost();
    const AsociadoObject = SetAsociadoObject();
    var htmlState = document.getElementById('StateExecution');

    if(sePuedeCargar)
    {
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
                    clearInputs("columns");
                    
                    SetAsociadoTable(5);
                }
                else
                {
                    htmlState.innerHTML = "El asociado ya fue ingresado.";
                    htmlState.style.color = "red"; htmlState.style.display = "inherit";
                }
            }, 300);
    }
    else
    {
        htmlState.innerHTML = "No has ingresado todos los datos, por favor revise lo ingresado.";
        htmlState.style.color = "red"; htmlState.style.display = "inherit";
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

function SetAsociado()
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

function SetAsociadoObject()
{
    var asociadoName = document.getElementById('asociadoName').value;
    var asociadoLastname = document.getElementById('asociadoLastName').value;
    var asociadoEmail = document.getElementById('asociadoEmail').value;
    var asociadoEstaEnfermo = SearchEstaEnfermo();
    var asociadoEstaMedicado = SearchEstaMedicado();
    var asociadoID = document.getElementById('asociadoID').value;
    var asociadoLocalidad = document.getElementById('asociadoLocalidad').value;
    var asociadoDomicilio = document.getElementById('asociadoDomicilio').value;
    var asociadoGrupoSanguineo = SearchGrupoSanguineo();
    var asociadoFactorSangre = SearchFactor();
    var asociadoTelefono = document.getElementById('asociadoTelefono').value;
    var asociadoFechaNacimiento = document.getElementById('asociadoFechaNacimiento').value;

    return {
        ID : asociadoID
        ,Nombre : asociadoName
        ,Apellido : asociadoLastname
        ,Email : asociadoEmail
        ,FechaNacimiento : asociadoFechaNacimiento
        ,Telefono : asociadoTelefono
        ,EstaEnfermo : asociadoEstaEnfermo
        ,EstaMedicado : asociadoEstaMedicado
        ,Localidad : asociadoLocalidad
        ,Domicilio : asociadoDomicilio
        ,GrupoSanguineo : asociadoGrupoSanguineo
        ,Factor : asociadoFactorSangre
    };
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
    var asociadoGrupoSanguineoA = document.getElementById('asociadoGrupoSanguineoA').checked;
    var asociadoGrupoSanguineoB = document.getElementById('asociadoGrupoSanguineoB').checked;
    var asociadoGrupoSanguineoAB = document.getElementById('asociadoGrupoSanguineoAB').checked;
    var asociadoGrupoSanguineoO = document.getElementById('asociadoGrupoSanguineoO').checked;

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