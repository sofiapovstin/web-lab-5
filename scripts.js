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

//Task 3
// Function to calculate the maximum value from an array of numbers
// Функція для збереження даних в cookies
function saveToCookies(value) {
    document.cookie = "maxCount=" + encodeURIComponent(value);

}

// Функція для отримання даних з cookies
function getFromCookies() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'maxCount') {
            return parseInt(value) || 0;
        }
    }
    return 0;
}

// Функція для перевірки та збереження кількості максимальних чисел
function checkMaxNumbers() {
    const numbers = [];
    for (let i = 1; i <= 10; i++) {
        const inputValue = parseInt(document.getElementById('number' + i).value);
        if (!isNaN(inputValue)) {
            numbers.push(inputValue);
        }
    }

    if (numbers.length > 0) {
        const maxNumber = Math.max(...numbers);
        const maxCount = numbers.filter(num => num === maxNumber).length;

        saveToCookies(maxCount);

        alert("Кількість максимальних чисел: " + maxCount);
    } else {
        alert("Будь ласка, введіть числа.");
    }
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
    }
}
// Функція для ініціалізації сторінки
function initializePage() {
    var savedMaxCount = getFromCookies();

    if (savedMaxCount > 0) {
        const confirmDelete = confirm("Інформація з cookies: Кількість максимальних чисел - " + savedMaxCount + "\nВидалити дані з cookies?");

        if (confirmDelete) {
            deleteAllCookies();
        } else {
            alert("Дані з cookies залишаються. Перезавантажте сторінку для оновлення.");
        }
    }
}

// Ініціалізація сторінки при завантаженні
window.onload = initializePage;