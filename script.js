'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Balls = function () {
    function Balls(context, buffer) {
        _classCallCheck(this, Balls);

        this.context = context;
        this.buffer = buffer;
    }

    _createClass(Balls, [{
        key: 'setup',
        value: function setup() {
            this.gainNode = this.context.createGain();
            this.source = this.context.createBufferSource();
            this.source.buffer = this.buffer;
            this.source.connect(this.gainNode);
            this.gainNode.connect(this.context.destination);
            this.gainNode.gain.setValueAtTime(1, this.context.currentTime);
        }
    }, {
        key: 'play',
        value: function play() {
            this.setup();
            this.source.start(this.context.currentTime);
        }
    }, {
        key: 'stop',
        value: function stop() {
            var ct = this.context.currentTime + 1;
            this.gainNode.gain.exponentialRampToValueAtTime(.1, ct);
            this.source.stop(ct);
        }
    }]);

    return Balls;
}();

var Buffer = function () {
    function Buffer(context, urls) {
        _classCallCheck(this, Buffer);

        this.context = context;
        this.urls = urls;
        this.buffer = [];
    }

    _createClass(Buffer, [{
        key: 'loadSound',
        value: function loadSound(url, index) {
            var request = new XMLHttpRequest();
            request.open('get', url, true);
            request.responseType = 'arraybuffer';
            var thisBuffer = this;
            request.onload = function () {
                thisBuffer.context.decodeAudioData(request.response, function (buffer) {
                    thisBuffer.buffer[index] = buffer;
                    if (index == thisBuffer.urls.length - 1) {
                        thisBuffer.loaded();
                    }
                });
            };
            request.send();
        }
    }, {
        key: 'getBuffer',
        value: function getBuffer() {
            var _this = this;

            this.urls.forEach(function (url, index) {
                _this.loadSound(url, index);
            });
        }
    }, {
        key: 'loaded',
        value: function loaded() {
            _loaded = true;
        }
    }, {
        key: 'getSound',
        value: function getSound(index) {
            return this.buffer[index];
        }
    }]);

    return Buffer;
}();

var balls = null,
    preset = 0,
    _loaded = false;
var path = 'audio/';
var sounds = [path + 'sound1.mp3', path + 'sound2.mp3', path + 'sound3.mp3', path + 'sound4.mp3', path + 'sound5.mp3', path + 'sound6.mp3', path + 'sound7.mp3', path + 'sound8.mp3', path + 'sound9.mp3', path + 'sound10.mp3', path + 'sound11.mp3', path + 'sound12.mp3', path + 'sound13.mp3', path + 'sound14.mp3', path + 'sound15.mp3', path + 'sound16.mp3', path + 'sound17.mp3', path + 'sound18.mp3', path + 'sound19.mp3', path + 'sound20.mp3', path + 'sound21.mp3', path + 'sound22.mp3', path + 'sound23.mp3', path + 'sound24.mp3', path + 'sound25.mp3', path + 'sound26.mp3', path + 'sound27.mp3', path + 'sound28.mp3', path + 'sound29.mp3', path + 'sound30.mp3', path + 'sound31.mp3', path + 'sound32.mp3', path + 'sound33.mp3', path + 'sound34.mp3', path + 'sound35.mp3', path + 'sound36.mp3'];
var context = new (window.AudioContext || window.webkitAudioContext)();

function playBalls() {
    var index = parseInt(this.dataset.note) + preset;
    balls = new Balls(context, buffer.getSound(index));
    balls.play();
}

function stopBalls() {
    balls.stop();
}

var buffer = new Buffer(context, sounds);
var ballsSound = buffer.getBuffer();
var buttons = document.querySelectorAll('.b-ball_bounce');
buttons.forEach(function (button) {
    button.addEventListener('mouseenter', playBalls.bind(button));
    button.addEventListener('mouseleave', stopBalls);
});

function ballBounce(e) {
    var i = e;
    if (e.className.indexOf(" bounce") > -1) {
        return;
    }
    toggleBounce(i);
}

function toggleBounce(i) {
    i.classList.add("bounce");
    function n() {
        i.classList.remove("bounce");
        i.classList.add("bounce1");
        function o() {
            i.classList.remove("bounce1");
            i.classList.add("bounce2");
            function p() {
                i.classList.remove("bounce2");
                i.classList.add("bounce3");
                function q() {
                    i.classList.remove("bounce3");
                }
                setTimeout(q, 300);
            }
            setTimeout(p, 300);
        }
        setTimeout(o, 300);
    }
    setTimeout(n, 300);
}

var array1 = document.querySelectorAll('.b-ball_bounce');
var array2 = document.querySelectorAll('.b-ball_bounce .b-ball__right');

for (var i = 0; i < array1.length; i++) {
    array1[i].addEventListener('mouseenter', function () {
        ballBounce(this);
    });
}

for (var i = 0; i < array2.length; i++) {
    array2[i].addEventListener('mouseenter', function () {
        ballBounce(this);
    });
}

var l = ["49", "50", "51", "52", "53", "54", "55", "56", "57", "48", "189", "187", "81", "87", "69", "82", "84", "89", "85", "73", "79", "80", "219", "221", "65", "83", "68", "70", "71", "72", "74", "75", "76", "186", "222", "220"];
var k = ["90", "88", "67", "86", "66", "78", "77", "188", "190", "191"];
var a = {};
for (var e = 0, c = l.length; e < c; e++) {
    a[l[e]] = e;
}
for (var _e = 0, _c = k.length; _e < _c; _e++) {
    a[k[_e]] = _e;
}

document.addEventListener('keydown', function (j) {
    var i = j.target;
    if (j.which in a) {
        var index = parseInt(a[j.which]);
        balls = new Balls(context, buffer.getSound(index));
        balls.play();
        var ball = document.querySelector('[data-note="' + index + '"]');
        toggleBounce(ball);
    }
});

    function updateCountdown() {
    const now = new Date();
    const year = now.getFullYear() + 1;
    const newYear = new Date(`January 1, ${year} 00:00:00`);

    const diff = newYear - now;

    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

    setInterval(updateCountdown, 1000);
    updateCountdown();

/* Подарки *//* Подарки */
const chest = document.getElementById("chest");
const chestContainer = document.getElementById("chestContainer");

let opened = false;

chest.addEventListener("click", () => {
    if (opened) return;
    opened = true;

    // Запускаем анимацию
    chest.src = "img/Chest.gif";

    // Через время анимации (например 1.2 сек)
    setTimeout(() => {
        chest.src = "img/opengidt.gif"; // статичный открытый сундук
        chestContainer.classList.add("open");
    }, 600); // подгони под длительность GIF
});
// убираем снег

const snow = document.getElementById('snow');
const toggle = document.getElementById('snowToggle');

let snowVisible = true;

function toggleSnow() {
    snowVisible = !snowVisible;

    if (snowVisible) {
        snow.classList.remove('snow-hidden');
        toggle.src = './img/offsnow.png';
    } else {
        snow.classList.add('snow-hidden');
        toggle.src = './img/onsnow.png';
    }
}

// Клик по иконке
toggle.addEventListener('click', toggleSnow);

// Нажатие клавиши (например, S)
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 's') {
        toggleSnow();
    }
});


window.onload = () => {
  const gameField = document.getElementById("gameField");
  const player = document.getElementById("player");
  const scoreEl = document.getElementById("score");
  const livesEl = document.getElementById("lives");
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");

  const fieldWidth = 800;
  const fieldHeight = 600;
  const columns = 5;
  const playerWidth = 120;
  const columnWidth = fieldWidth / columns;

  let playerColumn = 2;
  let score = 0;
  let lives = 3;
  let gamePaused = true;

  const gifts = [];
  const giftSpeed = 2;
  const giftSpawnInterval = 1500;

  // Массив цветов для подарков
  const giftColors = ["#2d72c2ff","#00a2ffff","#5a80d3ff","#003cffff","#1288acff"];

  function updatePlayerPosition() {
    player.style.left = playerColumn * columnWidth + (columnWidth - playerWidth) / 2 + "px";
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && playerColumn > 0) {
      playerColumn--;
      updatePlayerPosition();
    } else if (e.key === "ArrowRight" && playerColumn < columns - 1) {
      playerColumn++;
      updatePlayerPosition();
    }
  });

  startBtn.addEventListener("click", () => gamePaused = false);
  pauseBtn.addEventListener("click", () => gamePaused = true);

  function updateLives() {
    livesEl.textContent = "❤".repeat(lives);
  }

  function spawnGift() {
    if (gamePaused) return;

    const col = Math.floor(Math.random() * columns);
    const gift = document.createElement("div");
    gift.classList.add("gift");
    gift.style.left = col * columnWidth + (columnWidth - 60)/2 + "px";
    gift.dataset.column = col;

    // Задаём случайный цвет
    gift.style.backgroundColor = giftColors[Math.floor(Math.random() * giftColors.length)];

    gameField.appendChild(gift);
    gifts.push(gift);
  }

  function updateGifts() {
    if (gamePaused) return;

    for (let i = gifts.length - 1; i >= 0; i--) {
      const gift = gifts[i];
      gift.style.top = gift.offsetTop + giftSpeed + "px";

      const giftRect = gift.getBoundingClientRect();
      const playerRect = player.getBoundingClientRect();

      if (
        giftRect.bottom >= playerRect.top &&
        giftRect.top <= playerRect.bottom &&
        giftRect.left <= playerRect.right &&
        giftRect.right >= playerRect.left
      ) {
        const col = parseInt(gift.dataset.column);
        if (col === playerColumn) {
          score += 5;
          scoreEl.textContent = "Счёт: " + score;
        } else {
          lives--;
          updateLives();
          if (lives === 0) {
            alert("Игра окончена! Твой счёт: " + score);
            score = 0;
            scoreEl.textContent = "Счёт: " + score;
            lives = 3;
            gifts.forEach(g => g.remove());
            gifts.length = 0;
            updateLives();
            gamePaused = true;
          }
        }
        gift.remove();
        gifts.splice(i, 1);
      } else if (gift.offsetTop > fieldHeight) {
        lives--;
        updateLives();
        gift.remove();
        gifts.splice(i, 1);
        if (lives === 0) {
          alert("Игра окончена! Твой счёт: " + score);
          score = 0;
          scoreEl.textContent = "Счёт: " + score;
          lives = 3;
          gifts.forEach(g => g.remove());
          gifts.length = 0;
          updateLives();
          gamePaused = true;
        }
      }
    }
  }

  updatePlayerPosition();
  setInterval(spawnGift, giftSpawnInterval);
  setInterval(updateGifts, 20);
};


const writeBtn = document.getElementById("writeLetterBtn");
const modal = document.getElementById("letterModal");
const closeModal = document.getElementById("closeModal");
const sendBtn = document.getElementById("sendLetter");
const letterText = document.getElementById("letterText");

// Открываем окно
writeBtn.addEventListener("click", () => {
  modal.style.display = "block";

  // Загружаем сохранённое письмо
  const savedLetter = localStorage.getItem("letterToSanta");
  if (savedLetter) {
    letterText.value = savedLetter;
  }
});

// Закрываем окно крестиком
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Отправка письма
sendBtn.addEventListener("click", () => {
  localStorage.setItem("letterToSanta", letterText.value);
  modal.style.display = "none";
});

// Закрытие при клике вне окна
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});