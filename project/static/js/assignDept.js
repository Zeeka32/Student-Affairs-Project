const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;

    inputControl.classList.add('error');

    inputControl.classList.remove('success')
}

function levelCheck() {

    const form = document.getElementById('add_stud');
    const level = document.getElementById('level');
    const department = document.getElementById('')

    let checklevel = 0,
        checkDepartment = 0;

    form.addEventListener('submit', ev => {
        validateLevel();

        if (checklevel == 0) {
            ev.preventDefault();
        }
    });

    function validateLevel() {
        const levelValue = document.getElementById('level').innerHTML;
        console.log(levelValue);
        if (levelValue !== '3') {
            setError(level, "Student's level must be 3");
        } else {
            checklevel = 1;
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('Student-submit').addEventListener('click', levelCheck);
});