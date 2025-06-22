// Завдання 1.1
document.querySelectorAll("img").forEach(img => {
    img.onclick = function() {
        console.log(this.getAttribute("width"));
    };
});

// Завдання 1.2
document.querySelectorAll("a").forEach(link => {
    function addTitle() {
        this.setAttribute("title", this.getAttribute("href"));
    }
    
    function removeTitle() {
        this.removeAttribute("title");
    }
    
    link.addEventListener("mouseover", addTitle);
    link.addEventListener("mouseout", removeTitle);
});

// Завдання 1.3-1.4
const inputs = document.querySelectorAll('input');

// Додаємо обробник події на клік для кожного input
inputs.forEach(input => {
    let clickedOnce = false;

    input.addEventListener('click', function() {
        if (!clickedOnce) {
            console.log(input.value);
            clickedOnce = true;
        } else {
            alert(input.value);
        }
    });
});

// Завдання 1.5

function wordToNumber(word) {
    const numbers = {
        "один": 1,
        "два": 2,
        "три": 3,
        "чотири": 4,
        "п'ять": 5,
        "шість": 6,
        "сім": 7,
        "вісім": 8,
        "дев'ять": 9,
    };
    return numbers[word.toLowerCase()] || null;
}

const paragraphs = document.querySelectorAll('p');

paragraphs.forEach(paragraph => {
    paragraph.addEventListener('click', function() {
        const numberWord = paragraph.innerText.trim();
        const number = wordToNumber(numberWord); 

        if (number !== null) {
            const square = number * number;
            paragraph.innerText = `${square}`;
        }
    });
});

// Завдання 2
function paintRed(event) {
    event.target.style.backgroundColor = 'red';
    event.target.removeEventListener('click', paintRed);
    event.target.addEventListener('click', paintGreen); 
}

function paintGreen(event) {
    event.target.style.backgroundColor = 'green';
    event.target.removeEventListener('click', paintGreen);
    event.target.addEventListener('click', paintRed);
}

const divs = document.querySelectorAll('div');

divs.forEach(div => {
    div.addEventListener('click', paintRed);
});