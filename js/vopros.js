'use strict';

function showUser(surname, name) {
    console.log(this);
    alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
}

const ageInput = document.getElementById('age');

ageInput.addEventListener('input', function () {
    console.log(this);
    showUser.call(ageInput, 'Ромашов', 'Евгений');
});