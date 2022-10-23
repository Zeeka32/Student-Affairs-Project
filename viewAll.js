function update(id) {
    x = document.getElementById('' + id)
    console.log(x.innerHTML)
    if (x.innerHTML == "Active")
        document.getElementById('' + id).innerHTML = "Inactive";
    else
        document.getElementById('' + id).innerHTML = "Active";
}

function updateStatus(status, id) {
    const xhttp = new XMLHttpRequest();
    var currentLink = window.location.origin;
    xhttp.open("POST", currentLink + "/View_Students/update/");
    if (document.cookie.indexOf('csrftoken') > -1) {
        var value = document.cookie.split('csrftoken')[1].split('=')[1];
        xhttp.setRequestHeader('X-CSRFToken', value);
    }
    xhttp.send(JSON.stringify({
        'status': status,
        'id': id,
    }));

    update(id)
}
console.log(5);