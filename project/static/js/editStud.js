function validategpa(gpa) {

    if (gpa >= 1 && gpa <= 4) {
        return 1;
    } else {
        return 0;
    }

}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;

    inputControl.classList.add('error');

    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
    return false;
};


const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateUserName(username) {
    var usernameRegex = /^[a-z ,.'-]+$/i;

    return usernameRegex.test(username);
}

function updateFunction(username, phone, email, id, gpa, date, status, gender, dep, level) {
    var old_ID = location.search.split('studID=')[1]
    var currentLink = window.location.origin;
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", currentLink + "/Edit_Students/update/", false);
    if (document.cookie.indexOf('csrftoken') > -1) {
        var value = document.cookie.split('csrftoken')[1].split('=')[1];
        xhttp.setRequestHeader('X-CSRFToken', value);
    }
    xhttp.send(JSON.stringify({
        'old': old_ID,
        'name': username,
        'phone': phone,
        'email': email,
        'id': id,
        'gpa': gpa,
        'date': date,
        'status': status,
        'gender': gender,
        'department': dep,
        'level': level,
    }));
}

function deleteFunction() {
    var old_ID = location.search.split('studID=')[1]
    var currentLink = window.location.origin;
    console.log(old_ID)
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", currentLink + "/Edit_Students/delete/", false);
    if (document.cookie.indexOf('csrftoken') > -1) {
        var value = document.cookie.split('csrftoken')[1].split('=')[1];
        xhttp.setRequestHeader('X-CSRFToken', value);
    }
    xhttp.send(JSON.stringify({
        'old': old_ID
    }));
}

const validateform = (ev) => {

    const form = document.getElementById('add_stud');
    const username = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const ID = document.getElementById('ID');
    const GPA = document.getElementById('GPA');
    const date = document.getElementById('bdate');
    var status;

    if (document.getElementById('act').checked) {
        status = "Active";
    } else {
        status = "Inactive";
    }

    var gender;

    if (document.getElementById('Male').checked) {
        gender = "Male";
    } else {
        gender = "Female";
    }

    const level = document.getElementById('level').value;
    const department = document.getElementById('dep').value;

    let checkname = 0,
        checkemail = 0,
        checkphone = 0,
        checkid = 0,
        checkgpa = 0,
        checkdate = 0;

    form.addEventListener('submit', e => {
        e.stopImmediatePropagation();
        validateInputs();

        if (checkname == 0 || checkphone == 0 || checkemail == 0 || checkgpa == 0 || checkid == 0 || checkdate == 0) {
            e.preventDefault();
        } else if (e.submitter.id === 'Student_delete') {
            if (confirm("you are about to delete this student from the database proceed ? NOTE: THIS ACTION IS IRREVERSIBLE")) {
                deleteFunction();
            } else {
                e.preventDefault();
            }
        } else if (e.submitter.id === 'Student_submit') {
            const usernameValue = username.value.trim();
            const emailValue = email.value.trim();
            const phoneValue = phone.value.trim();
            const gpaValue = GPA.value.trim();
            const idValue = ID.value.trim();
            const dateValue = date.value.trim();
            updateFunction(usernameValue, phoneValue, emailValue, idValue, gpaValue, dateValue, status, gender, department, level);
        }
    });

    function validateInputs() {

        const usernameValue = username.value.trim();
        const emailValue = email.value.trim();
        const phoneValue = phone.value.trim();
        const gpaValue = GPA.value.trim();
        const idValue = ID.value.trim();
        const dateValue = date.value.trim();


        if (usernameValue === '') {
            setError(username, 'Username is required');
        } else if (!validateUserName(usernameValue)) {
            setError(username, 'Name accept only [a:z and A:Z]')
        } else {
            setSuccess(username);
            checkname = 1;
        }

        if (emailValue === '') {
            setError(email, 'Email is required');
        } else if (!isValidEmail(emailValue)) {
            setError(email, 'Provide a valid email address');
        } else {
            setSuccess(email);
            checkemail = 1;
        }

        if (phoneValue === '') {
            setError(phone, 'Phone is required');
        } else if (phoneValue.length != 11) {
            setError(phone, 'Phone number must be 11 digit');
        } else {
            setSuccess(phone);
            checkphone = 1;
        }

        if (gpaValue === '') {
            setError(GPA, 'GPA is required');
        } else if (!validategpa(gpaValue)) {
            setError(GPA, 'GPA must be from 1 to 4.')
        } else {
            setSuccess(GPA);
            checkgpa = 1;
        }

        if (idValue === '') {
            setError(ID, 'ID is required');
        } else if (idValue.length != 8) {
            setError(ID, "ID must be 8 digits");
        } else {
            setSuccess(ID);
            checkid = 1;
        }

        if (dateValue === '') {
            setError(date, 'Date is required');
        } else {
            setSuccess(date);
            checkdate = 1;
        }
    };

}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('Student_submit').addEventListener('click', validateform);
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('Student_delete').addEventListener('click', validateform);
});