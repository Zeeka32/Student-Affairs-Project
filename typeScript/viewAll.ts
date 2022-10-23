function updateID(id:string) {
    let x = document.getElementById('' + id)
    if (x.innerHTML == "Active")
        document.getElementById('' + id).innerHTML = "Inactive";
    else
        document.getElementById('' + id).innerHTML = "Active";
}

function changeStatus(status:string, id:string) {
    const xhttp = new XMLHttpRequest();
    var currentLink:string = window.location.origin;
    
    xhttp.open("POST", currentLink + "/View_Students/update/");
    if (document.cookie.indexOf('csrftoken') > -1) {
        var value = document.cookie.split('csrftoken')[1].split('=')[1];
        xhttp.setRequestHeader('X-CSRFToken', value);
    }
    xhttp.send(JSON.stringify({
        'status': status,
        'id': id,
    }));

    updateID(id)
}