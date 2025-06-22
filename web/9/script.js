$(function() {
  const CATEGORY_IMG_COUNTS = 20;
  let category = 'animals';
  let imagesPool = [];
  let targetIndex = 0;

  function startGame() {
    $('#main-page').removeClass('active');
    $('#game-page').addClass('active');

    category = $('input[name="category"]:checked').val();
    setupNewRound();
  }

  function setupNewRound() {
    imagesPool = generateRandomImages(category);
    // Вибираємо випадковий індекс для картинки, яку треба знайти, не першу
    targetIndex = Math.floor(Math.random() * (imagesPool.length - 1)) + 1; // від 1 до 24

    renderGameField(imagesPool);
    renderCurrentPicture(imagesPool[targetIndex]);
    makeGameCellsClickable();
  }

  function generateRandomImages(cat) {
    let nums = Array.from({length: CATEGORY_IMG_COUNTS}, (_, i) => i+1);
    shuffleArray(nums);
    nums = nums.slice(0, 25);
    return nums.map(n => `${cat}/${cat}${n}.jpg`);
  }

  function shuffleArray(arr) {
    for(let i=arr.length-1; i>0; i--) {
      const j = Math.floor(Math.random()*(i+1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function renderGameField(images) {
    const $field = $('#game-field');
    $field.empty();
    images.forEach(src => {
      const $cell = $('<div>').addClass('game-cell').attr('data-src', src);
      const $img = $('<img>').attr('src', `images/${src}`);
      $cell.append($img);
      $field.append($cell);
    });
  }

  function renderCurrentPicture(src) {
    $('#current-picture').empty();
    const $img = $('<img>').attr('src', `images/${src}`);
    $('#current-picture').append($img);
  }

  function makeGameCellsClickable() {
    $('.game-cell').off('click').on('click', function() {
      const clickedSrc = $(this).attr('data-src');
      const targetSrc = imagesPool[targetIndex];

      if (clickedSrc === targetSrc) {
        alert('Правильно! Генеруємо нове поле...');
        setupNewRound();
      } else {
        alert('Не вірна картинка, спробуйте ще раз.');
      }
    });
  }

  function restartGame() {
    $('#game-page').removeClass('active');
    $('#main-page').addClass('active');
  }

  $('#start-game-btn').click(startGame);
  $('#restart-btn').click(restartGame);
});
