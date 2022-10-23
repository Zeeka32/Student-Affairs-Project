window.onload = function search() {

    function updateTable(res) {
        const data = res.data
        if (true) {

            let elements = document.getElementsByClassName("r2");
            while (elements.length > 0) {
                elements[0].parentNode.removeChild(elements[0]);
            }

            data.forEach(series => {
                const row = document.createElement("tr");
                row.classList.add("r2");
                row.innerHTML += `<td>${series.name}</td> 
                            <td>${series.stud_ID}</td> 
                            <td>${series.GPA}</td> 
                            <td>${series.level}</td> 
                            <td>${series.department}</td> 
                            <td> 
                                <input type="button" class="toggle" value="Assign Department" id="button0" onclick='window.location.href = x + "?studID=${series.stud_ID}"'>  
                            </td>
                        `
                result.appendChild(row);
            });
        }
    }


    const sendSearchData = (series:string) => {
        const xhttp = new XMLHttpRequest();
        var currentLink = window.location.origin;
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                var myArr = JSON.parse(xhttp.responseText);
                updateTable(myArr);
            }
        }

        xhttp.open("POST", currentLink + "/Search_Students/searchActive/");
        if (document.cookie.indexOf('csrftoken') > -1) {
            var value = document.cookie.split('csrftoken')[1].split('=')[1];
            xhttp.setRequestHeader('X-CSRFToken', value);
        }
        xhttp.send(JSON.stringify({
            'series': series,
        }));
    }

    const search_input = document.getElementById('searchInput');

    const result = document.getElementById('table__body');

    search_input.addEventListener('keyup', e => {
        sendSearchData(e.target.value);
    });
}