function ShowDiv(view)
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
