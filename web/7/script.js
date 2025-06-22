let timerId = null;

// Функція для показу поточного часу у форматі 09:15:56, середа, 06 травня 2025 року
function showCurrentTime() {
  const now = new Date();

  const days = ['неділя', 'понеділок', 'вівторок', 'середа', 'четвер', "п'ятниця", 'субота'];
  const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];

  const pad = (n) => n.toString().padStart(2, '0');
  const time = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const dayName = days[now.getDay()];
  const dayNum = pad(now.getDate());
  const monthName = months[now.getMonth()];
  const year = now.getFullYear();

  const formatted = `${time}, ${dayName}, ${dayNum} ${monthName} ${year} року`;
  console.log(formatted);
  
  document.getElementById('currentTime').textContent = formatted;

  return formatted;
}

function toggleAutoUpdate(checked) {
  if (checked) {
    showCurrentTime();
    timerId = setInterval(showCurrentTime, 1000);
  } else {
    clearInterval(timerId);
    timerId = null;
  }
}

// Обробка чекбокса після завантаження сторінки
window.onload = function() {
  const checkbox = document.getElementById('autoUpdate');
  checkbox.addEventListener('change', function() {
    toggleAutoUpdate(this.checked);
  });
}

// Гра "Вгадай число"
function guessNumberGame() {
  const maxNumber = 50;

  function getCurrentTimestamp() {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    return `${pad(now.getDate())}.${pad(now.getMonth()+1)}.${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }

  do {
    const secret = Math.floor(Math.random() * (maxNumber + 1));
    let attempts = 0;
    let guessed = false;

    while (!guessed) {
      attempts++;
      let input = prompt(`Вгадайте число від 0 до ${maxNumber}:`);
      if (input === null) {
        alert('Гра завершена.');
        return; // Користувач відмінив
      }

      let guess = Number(input);
      if (isNaN(guess) || guess < 0 || guess > maxNumber) {
        alert('Введіть коректне число');
        attempts--; // ця спроба не рахується
        continue;
      }

      const timestamp = getCurrentTimestamp();
      let diff = Math.abs(guess - secret);

      let hint = '';
      if (guess === secret) {
        alert(`За ${attempts} ${attempts === 1 ? 'спробу' : 'спроб'} ви вгадали число ${secret}`);
        guessed = true;
      } else {
        if (diff > 20) hint = 'холодно';
        else if (diff > 10) hint = 'тепло';
        else hint = 'гаряче';

        alert(`Ні, ${hint}. Спробуйте ще раз.`);
      }

      console.log(`${timestamp} Спроба ${attempts}: число ${guess} – ${guess === secret ? 'вірно' : 'не вірно'}`);
    }
  } while (confirm('Бажаєте зіграти ще раз?'));
}
