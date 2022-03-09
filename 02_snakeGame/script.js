/*
1. comer estrella -- done
2. score modificado por velocidad
3. generar estrella nueva
4. guardar posicion de estrella
5. paredes
6. cola
7. partir de una velocidad mas alta


*/

// Creacion del tablero
var cantidadCeldas = 20;
var grid = document.querySelector('.grid');
var teclaPulsada = document.querySelector('#tecla');
var velocimetro = document.querySelector('#velocidad');
var score = document.querySelector('.scoreDisplay');
velocidad = 0;
grid.style.width = cantidadCeldas * cantidadCeldas + 'px';
grid.style.height = cantidadCeldas * cantidadCeldas + 'px';
createBoard();
var tablero = Array.from(document.querySelectorAll('.celda'));
const tableroArray = [];
while (tablero.length) tableroArray.push(tablero.splice(0, cantidadCeldas));
console.table(tableroArray);
var posicionActualX = 0;
var posicionActualY = 0;
var posicionFrutaX = 0;
var posicionFrutaY = 0;
var movimientoX = 0;
var movimientoY = 0;
var movimiento = 0;
var gameInterval = null;
var timeCounter = 0;
var cambioVel = 0;
var puntuacion = 0;

gameStart();

function game() {
  // Y, X
  tableroArray[posicionActualY][posicionActualX].classList.remove('snake');
  posicionActualX = posicionActualX + movimientoX;
  posicionActualY = posicionActualY + movimientoY;
  reglas();
  tableroArray[posicionActualY][posicionActualX].classList.add('snake');
  if (posicionActualX == posicionFrutaX && posicionActualY == posicionFrutaY) {
    puntoFruta();
  }

  // console.log(posicionActualX, posicionActualY);
}

// Función para ganar el punto de la fruta y generar una nueva
function puntoFruta() {
  puntuacion = puntuacion + 1;
  score.innerHTML = puntuacion;
  tableroArray[posicionFrutaY][posicionFrutaX].classList.remove('apple');
  posicionFrutaX = Math.floor(Math.random() * cantidadCeldas);
  posicionFrutaY = Math.floor(Math.random() * cantidadCeldas);
  tableroArray[posicionFrutaY][posicionFrutaX].classList.add('apple');
}

function createBoard() {
  for (let i = 0; i < cantidadCeldas * cantidadCeldas; i++) {
    let div = document.createElement('div');
    div.classList.add('celda');
    div.style.width = cantidadCeldas + 'px';
    div.style.height = cantidadCeldas + 'px';
    grid.appendChild(div);
  }
}

function gameStart() {
  posicionActualX = cantidadCeldas / 2;
  posicionActualY = cantidadCeldas / 2;
  posicionFrutaX = Math.floor(Math.random() * cantidadCeldas);
  posicionFrutaY = Math.floor(Math.random() * cantidadCeldas);
  tableroArray[posicionActualY][posicionActualX].classList.add('snake');
  tableroArray[posicionFrutaY][posicionFrutaX].classList.add('apple');
  gameInterval = setInterval(game, 1000);
  setInterval(counter, 100);
}

function reglas() {
  if (posicionActualY >= cantidadCeldas) {
    posicionActualY = 0;
  } else if (posicionActualY < 0) {
    posicionActualY = cantidadCeldas - 1;
  } else if (posicionActualX >= cantidadCeldas) {
    posicionActualX = 0;
  } else if (posicionActualX < 0) {
    posicionActualX = cantidadCeldas - 1;
  } else {
    console.log(posicionActualY, posicionActualX);
  }
}

document.addEventListener('keypress', (e) => {
  console.log(e);
});

// Event listeners para flechas
document.addEventListener('keypress', (e) => {
  switch (e.code) {
    case 'KeyA':
      movimientoX = -1;
      movimientoY = 0;
      teclaPulsada.innerHTML = 'A - IZQUIERDA';
      console.log('left');
      break;
    case 'KeyW':
      movimientoX = 0;
      movimientoY = -1;
      console.log('up');
      teclaPulsada.innerHTML = 'W - ARRIBA';
      break;
    case 'KeyD':
      movimientoX = +1;
      movimientoY = 0;
      console.log('right');
      teclaPulsada.innerHTML = 'D - DERECHA';
      break;
    case 'KeyS':
      movimientoX = 0;
      movimientoY = +1;
      console.log('down');
      teclaPulsada.innerHTML = 'S - ABAJO';
      break;
    case 'KeyQ':
      if (timeCounter > 5) {
        console.log('Menos velocidad');
        timeCounter = 0;
        if (velocidad != 800) {
          velocidad = velocidad + 800;
        }
        velocimetro.innerHTML = (
          Math.round((1 - velocidad / 1000) * 100) / 100
        ).toFixed(2);
        updateInterval();
      }

      break;
    case 'KeyE':
      if (timeCounter > 5) {
        console.log('Más velocidad');
        timeCounter = 0;
        if (velocidad != -800) {
          velocidad = velocidad - 800;
        }
        velocimetro.innerHTML = (
          Math.round((1 - velocidad / 1000) * 100) / 100
        ).toFixed(2);
        updateInterval();
      }

      break;
  }
});

function updateInterval() {
  clearInterval(gameInterval);
  gameInterval = setInterval(game, 1000 + velocidad);
}

function counter() {
  timeCounter = timeCounter + 1;
}
