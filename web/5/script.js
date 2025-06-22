function sendNumber() {
    const number = document.getElementById("numberInput").value;
  
    if (number === "") {
      document.getElementById("result").innerText = "Будь ласка, введіть число";
      return;
    }
  
    const xhr = new XMLHttpRequest(); // Створення нового AJAX-запиту
    xhr.open("POST", "server.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
    xhr.onload = function () { // Обробка відповіді від сервера
      if (this.status === 200) { // якщо відповідь 200 (успішно) то виводимо текст
        document.getElementById("result").innerText = this.responseText;
      } else {
        document.getElementById("result").innerText = "Помилка";
      }
    };
  
    xhr.send("number=" + encodeURIComponent(number));
  }
  