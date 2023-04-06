
function showToastBottom(mess,title, timeout){
    if (typeof toastr === 'undefined') {
        alert(mess);
        return;
    }
    toastr.options.closeButton =  true;
    toastr.options.positionClass= "toast-bottom-right";
    if(timeout)
        toastr.info(mess,title, {timeOut: timeout});
    else
        toastr.info(mess,title, {timeOut: 3000});
}


function showToastWarningBottom(mess,title, timeout){

    if (typeof toastr === 'undefined') {
        alert(mess);
        return;
    }

    toastr.options.closeButton =  true;
    toastr.options.positionClass= "toast-bottom-right";
    if(timeout)
        toastr.warning(mess,title, {timeOut: timeout});
    else
        toastr.warning(mess,title, {timeOut: 2000});
}

function showToastWarningTop(mess,title, timeout){
    if (typeof toastr === 'undefined') {
        alert(mess);
        return;
    }

    toastr.options.closeButton =  true;
    //toastr.options.positionClass= "toast-bottom-right";
    if(timeout)
        toastr.warning(mess,title, {timeOut: timeout});
    else
        toastr.warning(mess,title, {timeOut: 2000});
}

function showToastInfoBottom(mess,title, timeout){
    if (typeof toastr === 'undefined') {
        alert(mess);
        return;
    }

    toastr.options.closeButton =  true;
    toastr.options.positionClass= "toast-bottom-right";
    if(timeout)
        toastr.info(mess,title, {timeOut: timeout});
    else
        toastr.info(mess,title, {timeOut: 2000});
}

function showToastInfoTop(mess,title, timeout){
    if (typeof toastr === 'undefined') {
        alert(mess);
        return;
    }

    toastr.options.closeButton =  true;
    //toastr.options.positionClass= "toast-bottom-right";
    if(timeout)
        toastr.info(mess,title, {timeOut: timeout});
    else
        toastr.info(mess,title, {timeOut: 2000});
}
