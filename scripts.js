let xContent = document.querySelector('.x').innerHTML;
document.querySelector('.x').innerHTML = document.querySelector('.y').innerHTML;
document.querySelector('.y').innerHTML = xContent;

// Task 2: Calculate and display the area of a circle
const radius = 5; // You can use any value here
const circleArea = calculateCircleArea(radius);
document.querySelector('.three').innerHTML += `<p>Площа кола з радіусом ${radius} см: ${circleArea}</p>`;
function calculateCircleArea(radius) {
    return Math.PI * Math.pow(radius, 2);
}

// Task 4: Change background color on blur and save to localStorage
function changeColorAndSave() {
    // Get the color value from the user
    var userColor = prompt('Enter a color (e.g., red, #00ff00):');

    // Validate if the color is valid
    if (isValidColor(userColor)) {
        // Set the background color of the "two" block
        document.getElementById('blockTwo').style.backgroundColor = userColor;

        // Save the color value to localStorage
        localStorage.setItem('blockTwoColor', userColor);
    } else {
        alert('Invalid color. Please enter a valid color.');
    }
}

// Function to check if a color is valid
function isValidColor(color) {
    var element = document.createElement('div');
    element.style.backgroundColor = color;
    return element.style.backgroundColor !== '';
}

// Check for stored color in localStorage on page load
window.onload = function() {
    var storedColor = localStorage.getItem('blockTwoColor');
    if (storedColor) {
        // Set the background color of the "two" block
        document.getElementById('blockTwo').style.backgroundColor = storedColor;
    }
};

// Task 5
// Function to show edit form
function showEditForm(blockId) {
    var block = document.querySelector('.' + blockId);
    var originalContent = block.innerHTML;

    // Create form elements
    var editForm = document.createElement('form');
    var textarea = document.createElement('textarea');
    textarea.value = originalContent;
    var saveButton = document.createElement('button');
    saveButton.textContent = 'Save Changes';
    saveButton.onclick = function () { saveChanges(blockId, textarea.value); };
    var resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Changes';
    resetButton.onclick = function () { resetChanges(blockId, originalContent); };

    // Append elements to the form
    editForm.appendChild(textarea);
    editForm.appendChild(saveButton);
    editForm.appendChild(resetButton);

    // Replace the block content with the edit form
    block.innerHTML = '';
    block.appendChild(editForm);
}

// Function to save changes to localStorage
function saveChanges(blockId, content) {
    localStorage.setItem(blockId, content);

    // Change background color to a random color
    document.querySelector('.' + blockId).style.backgroundColor = getRandomColor();

    // Reset the block content
    resetChanges(blockId, content);
}

// Function to reset changes and revert to original content
function resetChanges(blockId, originalContent) {
    document.querySelector('.' + blockId).innerHTML = originalContent;
}

// Function to generate a random color
function getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

// Check for stored content in localStorage on page load
window.onload = function() {
    for (var i = 1; i <= 6; i++) {
        var blockId = 'block' + i;
        var storedContent = localStorage.getItem(blockId);
        if (storedContent) {
            document.querySelector('.' + blockId).innerHTML = storedContent;
            document.querySelector('.' + blockId).style.backgroundColor = getRandomColor();
        }
    }
};

// Function to calculate the maximum value from an array of numbers
function calculateMaxNumbers() {
    // Отримуємо значення з форми
    var values = document.getElementById('three').querySelectorAll('input[type="number"]');
    var numbers = Array.from(values).map(function(input) {
        return parseInt(input.value);
    });

    // Знаходимо максимальне значення
    var maxNumber = Math.max(...numbers);

    // Знаходимо кількість максимальних значень
    var countMaxNumbers = numbers.filter(function(number) {
        return number === maxNumber;
    }).length;

    // Зберігаємо результат в cookies
    document.cookie = 'countMaxNumbers=' + countMaxNumbers;

    // Виводимо результат за допомогою діалогового вікна
    alert('Кількість максимальних чисел: ' + countMaxNumbers);

    // Перевірка, чи є дані в cookies при оновленні сторінки
    var storedCountMaxNumbers = getCookie('countMaxNumbers');

    if (storedCountMaxNumbers !== "") {
        var confirmDelete = confirm('Знайдено дані у cookies. Видалити дані?');

        if (confirmDelete) {
            // Видаляємо cookies
            document.cookie = 'countMaxNumbers=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            // Оновлюємо сторінку
            location.reload();
        } else {
            alert('Дані залишаться в cookies. Перезавантажте сторінку, щоб використовувати форму знову.');
        }
    }
}

// Функція для отримання значення з cookies за ім'ям
function getCookie(name) {
    var cookieArr = document.cookie.split(';');
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split('=');
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return "";
}