/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2023 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 * Author: Diwen Xiao
 */

(() => {
  'use strict'

  const getStoredTheme = () => localStorage.getItem('theme')
  const setStoredTheme = theme => localStorage.setItem('theme', theme)

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = theme => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme')

    if (!themeSwitcher) {
      return
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text')
    const activeThemeIcon = document.querySelector('.theme-icon-active use')
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`)
    const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href')

    document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
      element.classList.remove('active')
      element.setAttribute('aria-pressed', 'false')
    })

    btnToActive.classList.add('active')
    btnToActive.setAttribute('aria-pressed', 'true')
    activeThemeIcon.setAttribute('href', svgOfActiveBtn)
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`
    themeSwitcher.setAttribute('aria-label', themeSwitcherLabel)

    if (focus) {
      themeSwitcher.focus()
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme()
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          setStoredTheme(theme)
          setTheme(theme)
          showActiveTheme(theme, true)
        })
      })
  })

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()


/*mini game
Author: Mingde Zhou
*/
let canvas, ctx, car, obstacles, score, gameInterval;

function startGame() {
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  let col12Width = document.querySelector('.col-12').offsetWidth;

  canvas.width = col12Width * 0.9;
  canvas.height = window.innerHeight * 0.8;

  car = { x: col12Width / 2 - 20, y: canvas.height - 50, width: 40, height: 40, symbol: "🚗" };
  obstacles = [];
  score = 0;

  document.getElementById("score").innerText = score;

  gameInterval = setInterval(updateGame, 20);

  // Listen for mouse movements
  canvas.addEventListener("mousemove", moveCar);

  // Disable the start button
  document.querySelector("button").disabled = true;
}


function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw car
  ctx.font = "30px Arial";
  ctx.fillText(car.symbol, car.x, car.y);

  // Draw obstacles
  for (let i = 0; i < obstacles.length; i++) {
    ctx.fillText("🚧", obstacles[i].x, obstacles[i].y);
    obstacles[i].y += 2; // Adjust obstacle speed
    if (collision(car, obstacles[i])) {
      endGame();
      return;
    }
    if (obstacles[i].y > canvas.height) {
      score++;
      document.getElementById("score").innerText = score;
      obstacles.splice(i, 1);
      i--;
    }
  }

  // Generate random obstacles
  if (Math.random() < 0.02) {
    let obstacleX = Math.random() * (canvas.width - 40);
    let obstacleY = -40;
    obstacles.push({ x: obstacleX, y: obstacleY, width: 40, height: 40 });
  }
}

function moveCar(event) {
  car.x = event.clientX - canvas.getBoundingClientRect().left - car.width / 2;
  if (car.x < 0) {
    car.x = 0;
  } else if (car.x > canvas.width - car.width) {
    car.x = canvas.width - car.width;
  }
}

function collision(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

function endGame() {
  clearInterval(gameInterval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "30px Arial";
  ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2 - 15);
  document.querySelector("button").disabled = false;
}

function changeCar() {
  car.symbol = document.getElementById("carSelect").value;
}

// Listen for window resize events
window.addEventListener("resize", function () {
  if (gameInterval) {
    clearInterval(gameInterval);
    startGame(); // Restart the game with updated canvas size
  }
});


/*
add confirm box at every "buy me" button in cars pages
Author: Mingde Zhou

document.getElementById("buyMe").addEventListener("click", function () {
  let r = confirm("Are you sure to buy this car?");
  if (r == true) {
    window.location.href = "Buy-Car.html";
  }
});
*/

/*
Debug for each button functional.
Author: Diwen Xiao
*/
document.querySelectorAll('.buyMe').forEach(button => {
  button.addEventListener('click', function () {
    let r = confirm("Are you sure to buy this car?");
    if (r == true) {
      window.location.href = "Buy-Car.html";
    }
  });
});
