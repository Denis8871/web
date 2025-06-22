(() => {
  const mainPage = document.getElementById('main-page');
  const gamePage = document.getElementById('game-page');
  const startBtn = document.getElementById('start-game-btn');
  const restartBtn = document.getElementById('restart-btn');
  const timerElem = document.getElementById('timer');
  const gameField = document.getElementById('game-field');
  const statsBody = document.getElementById('stats-body');

  let timeLeft = 60;
  let timerId = null;
  let nextNumber = 1;
  let attempts = [];
  let currentAttemptStart = 0;

  const fontSizes = ['16px', '20px', '24px', '28px', '32px'];

  function randomColor() {
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    return `rgb(${r},${g},${b})`;
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random()*(i+1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function renderGameField() {
    gameField.innerHTML = '';
    const digits = Array.from({length: 20}, (_, i) => i+1);
    shuffle(digits);

    for (const num of digits) {
      const div = document.createElement('div');
      div.classList.add('digit');
      div.textContent = num;
      div.style.color = randomColor();
      div.style.fontSize = fontSizes[Math.floor(Math.random()*fontSizes.length)];
      div.dataset.number = num;
      gameField.appendChild(div);
    }
  }

  function updateTimer() {
    timeLeft--;
    timerElem.textContent = `Час: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      alert('Час вичерпано!');
      startGame();
    }
  }

  function startGame() {
    mainPage.classList.remove('active');
    gamePage.classList.add('active');

    timeLeft = 60;
    timerElem.textContent = `Час: ${timeLeft}`;
    nextNumber = 1;

    renderGameField();

    clearInterval(timerId);
    timerId = setInterval(updateTimer, 1000);

    currentAttemptStart = Date.now();

    document.querySelectorAll('.digit').forEach(d => d.classList.remove('selected'));
  }

  function endAttempt(success) {
    clearInterval(timerId);
    const duration = Math.floor((Date.now() - currentAttemptStart)/1000);
    attempts.push({time: duration, success});
    renderStats();

    if(success) {
      alert('Ви пройшли гру!');
    } else {
      alert('Гра перезапущена.');
    }
    startGame();
  }

  function renderStats() {
    statsBody.innerHTML = '';
    if(attempts.length === 0) return;

    const successfulAttempts = attempts.filter(a => a.success);
    const bestTime = successfulAttempts.length > 0 ? Math.min(...successfulAttempts.map(a => a.time)) : null;

    attempts.forEach((a, i) => {
      const tr = document.createElement('tr');
      if(a.success && a.time === bestTime) {
        tr.classList.add('best-result');
      }
      const attemptTd = document.createElement('td');
      attemptTd.textContent = i + 1;
      const timeTd = document.createElement('td');
      timeTd.textContent = a.time;

      tr.appendChild(attemptTd);
      tr.appendChild(timeTd);
      statsBody.appendChild(tr);
    });
  }

  function digitClickHandler(e) {
    if(!e.target.classList.contains('digit')) return;

    const chosenNumber = parseInt(e.target.dataset.number, 10);

    if(chosenNumber === nextNumber) {
      e.target.classList.add('selected');
      nextNumber++;
      if(nextNumber > 20) {
        endAttempt(true);
      }
    } else {
      alert('Не вірна цифра');
    }
  }

  startBtn.addEventListener('click', startGame);
  restartBtn.addEventListener('click', () => {
    clearInterval(timerId);
    endAttempt(false);
  });

  gameField.addEventListener('click', digitClickHandler);
})();
