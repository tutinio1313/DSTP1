var ListAsociados;
const urlAsociado = "https://localhost:7278/Asociado";

async function ShowDiv(view)
{
    let views = SetViews(); 
    let buttons = SetButtons();
    let strViews = ['AsociadoView', 'CuotaView', 'DonacionView', 'PedidoView', 'SolicitanteView'];

    let defaultView = document.getElementById("defaultView");
   

    for (var index = 0; index < views.length; index++) 
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

    switch (view) {
        case "AsociadoView":
            ListAsociados = await GetAsociados();
            setTimeout(() => {
                console.table(ListAsociados); 
            }, 200);
            break;
        case "CuotaView":

            break;
        case "DonacionView":

            break;
        case "PedidoView":

            break;

        default:
        
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
    var asociadoGrupoSanguineoAB = document.getElementById('asociadoGrupoSanguineoO').checked;
    var asociadoGrupoSanguineoO = document.getElementById('asociadoGrupoSanguineoAB').checked;

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
        return "O";
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