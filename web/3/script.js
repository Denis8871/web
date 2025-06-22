// === Стилізація тіла ===
document.body.style.margin = "0";
document.body.style.background = "white";
document.body.style.height = "100vh";
document.body.style.display = "flex";
document.body.style.justifyContent = "center";
document.body.style.alignItems = "center";
document.body.style.fontFamily = "sans-serif";

// === Створення основного контейнера ===
const calculator = document.createElement("div");
Object.assign(calculator.style, {
  width: "90vw",
  maxWidth: "340px",
  background: "black",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  borderRadius: "40px",
});

// === Дисплей ===
const display = document.createElement("div");
display.id = "display";
display.textContent = "0";
Object.assign(display.style, {
  color: "white",
  fontSize: "70px",
  textAlign: "right",
  padding: "20px 15px",
  overflowX: "auto",
});

// === Контейнер кнопок ===
const buttonsContainer = document.createElement("div");
Object.assign(buttonsContainer.style, {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "10px",
  padding: "10px",
});

// === Дані кнопок ===
const buttons = [
  { label: "AC", class: "function", action: () => display.textContent = "0" },
  { label: "±", class: "function", action: () => {
    if (display.textContent !== "0") {
      display.textContent = display.textContent.startsWith("-")
        ? display.textContent.slice(1)
        : "-" + display.textContent;
    }
  }},
  { label: "%", class: "function", action: () => append("%") },
  { label: "÷", class: "operator", action: () => append("/") },

  { label: "7", action: () => append("7") },
  { label: "8", action: () => append("8") },
  { label: "9", action: () => append("9") },
  { label: "×", class: "operator", action: () => append("*") },

  { label: "4", action: () => append("4") },
  { label: "5", action: () => append("5") },
  { label: "6", action: () => append("6") },
  { label: "−", class: "operator", action: () => append("-") },

  { label: "1", action: () => append("1") },
  { label: "2", action: () => append("2") },
  { label: "3", action: () => append("3") },
  { label: "+", class: "operator", action: () => append("+") },

  { label: "0", class: "zero", action: () => append("0") },
  { label: ".", action: () => append(".") },
  { label: "=", class: "operator", action: calculate }
];

// === Створення кнопок ===
buttons.forEach(btn => {
  const button = document.createElement("button");
  button.textContent = btn.label;
  button.onclick = btn.action;

  Object.assign(button.style, {
    fontSize: "24px",
    border: "none",
    borderRadius: btn.class === "zero" ? "50px" : "50%",
    padding: btn.class === "zero" ? "20px 0 20px 30px" : "20px",
    textAlign: btn.class === "zero" ? "left" : "center",
    color: btn.class === "function" ? "black" : "white",
    backgroundColor: btn.class === "operator" ? "orange"
                  : btn.class === "function" ? "#a5a5a5"
                  : "#333",
    cursor: "pointer"
  });

  if (btn.class === "zero") {
    button.style.gridColumn = "span 2";
  }

  button.onmouseover = () => button.style.opacity = "0.9";
  button.onmouseleave = () => button.style.opacity = "1";

  buttonsContainer.appendChild(button);
});

// === Додавання елементів на сторінку ===
calculator.appendChild(display);
calculator.appendChild(buttonsContainer);
document.body.appendChild(calculator);

// === Логіка ===
function append(value) {
  if (display.textContent === "0" && value !== ".") {
    display.textContent = value;
  } else {
    display.textContent += value;
  }
}

function calculate() {
  try {
    const expr = display.textContent
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/−/g, "-")
      .replace(/%/g, "/100");

    const result = eval(expr);
    display.textContent = Number(result.toFixed(10)).toString();
  } catch {
    display.textContent = "Помилка";
  }
}
