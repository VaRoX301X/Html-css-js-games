/*
1. comer estrella -- done
2. score modificado por velocidad -- meh
3. generar estrella nueva sin chocar con cola -- done
5. paaaredes -- done
6. cola -- done
7. partir de una velocidad mas alta -- done
8. funcion de velocidad -- meh
9. Añadir reglas de moverse hacia la cola -- done
10. restriccion de generacion de fruta donde hay serpiente -- done
11. girar cabeza dependiendo de la direccion -- done


*/

// Creacion del tablero
var cantidadCeldas = 20;
var grid = document.querySelector('.grid');
var teclaPulsada = document.querySelector('#tecla');
var velocimetro = document.querySelector('#velocidad');
var score = document.querySelector('.scoreDisplay');
var main = document.querySelector('.main');
var titulo = document.querySelector('.titulo');
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
var snake = [[0, 0]];
snake.push([0, 0]);
var posicionFrutaX = 0;
var posicionFrutaY = 0;
var movimientoX = 0;
var movimientoY = 0;
var movimiento = 0;
var gameInterval = null;
var counterInterval = null;
var timeCounter = 0;
var cambioVel = 0;
var puntuacion = 0;
var snakeParts = ['snake-head-W', 'snake-head-S','snake-head-A','snake-head-D', 'snake-body', 'snake-tail'];
var tamSnake = 0;
var headDir = 'snake-head-W';
var gridModeBool = false;

gameStart();

function game() {
  // Y, X
  movimientoSerpiente();
  if (posicionActualX == posicionFrutaX && posicionActualY == posicionFrutaY) {
    puntoFruta();
  }

  // console.log(posicionActualX, posicionActualY);
}

// Función para ganar el punto de la fruta y generar una nueva
function puntoFruta() {
  puntuacion = puntuacion + 1;
  score.innerHTML = puntuacion;
  ampliarSerpiente();
  tableroArray[posicionFrutaY][posicionFrutaX].classList.remove('apple');
  crearFruta();
}
function crearFruta(){
  let creada = false;
  while(!creada) {
    posicionFrutaX = Math.floor(Math.random() * cantidadCeldas);
  posicionFrutaY = Math.floor(Math.random() * cantidadCeldas);
  if(!(snakeParts.some(snakePart => tableroArray[posicionFrutaY][posicionFrutaX].classList.contains(snakePart)))) {
    tableroArray[posicionFrutaY][posicionFrutaX].classList.add('apple');
    creada = true;
  }
  }
}

// Función para ampliar la serpiente
function ampliarSerpiente() {
  snake.push([posicionFrutaY, posicionFrutaX]);
  tamSnake = snake.length-1;
  console.log(tamSnake);
}

function movimientoSerpiente() {
  // calcular nueva posicion
  posicionActualX = posicionActualX + movimientoX;
  posicionActualY = posicionActualY + movimientoY;
  if (!reglas()) {
    for (let i = snake.length - 1; i > 0; i--) {
      snake[i] = snake[i - 1];
    }
    snake[0] = [posicionActualY, posicionActualX];
    for (let i = 0; i < snake.length; i++) {
      if (i != snake.length - 1) {
        // asignar casilla de color
        if (i == 0) {
          tableroArray[snake[i][0]][snake[i][1]].classList.add(headDir);
        } else if (i < snake.length - 2) {
          tableroArray[snake[i][0]][snake[i][1]].classList.add('snake-body');
        } else {
          tableroArray[snake[i][0]][snake[i][1]].classList.add('snake-tail');
        }
      } else {
        // quitar casilla de color
        snakeParts.forEach(snakePart => {
          tableroArray[snake[i][0]][snake[i][1]].classList.remove(snakePart);
        });
      }
    }
  }
  
  

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
  snake[0] = [posicionActualY, posicionActualX];
  console.log(snake);
  posicionFrutaX = Math.floor(Math.random() * cantidadCeldas);
  posicionFrutaY = Math.floor(Math.random() * cantidadCeldas);
  tableroArray[snake[0][0]][snake[0][1]].classList.add('snake');
  tableroArray[posicionFrutaY][posicionFrutaX].classList.add('apple');
  gameInterval = setInterval(game, 500);
  counterInterval = setInterval(counter, 100);
}

function reglas() {
  if ((posicionActualY >= cantidadCeldas) 
  || (posicionActualY < 0) 
  || (posicionActualX >= cantidadCeldas) 
  || (posicionActualX < 0)) {
    // posicionActualY = 0;
    // posicionActualY = cantidadCeldas - 1;
    // posicionActualX = 0;
    // posicionActualX = cantidadCeldas - 1;
    console.log("fuera de mapa");
    lose();
    return true;
  } else if(['snake-body', 'snake-tail'].some(snakePart => tableroArray[posicionActualY][posicionActualX].classList.contains(snakePart))) {
    console.log("choque con cuerpo");
    lose();
    return true;
  }
  return false;
}

// Event listeners para flechas
document.addEventListener('keypress', (e) => {
  switch (e.code) {
    case 'KeyA':
      if (!(movimientoX == +1 && tamSnake > 1)){
      movimientoX = -1;
      movimientoY = 0;
      teclaPulsada.innerHTML = 'A - IZQUIERDA';
      headDir = 'snake-head-A';
      }
      break;
    case 'KeyW':
      if (!(movimientoY == +1 && tamSnake > 1)){
      movimientoX = 0;
      movimientoY = -1;
      teclaPulsada.innerHTML = 'W - ARRIBA';
      headDir = 'snake-head-W';
      }
      break;
    case 'KeyD':
      if (!(movimientoX == -1 && tamSnake > 1)){
      movimientoX = +1;
      movimientoY = 0;
      teclaPulsada.innerHTML = 'D - DERECHA';
      headDir = 'snake-head-D';
      }
      break;
    case 'KeyS':
      if (!(movimientoY == -1 && tamSnake > 1)){
      movimientoX = 0;
      movimientoY = +1;
      teclaPulsada.innerHTML = 'S - ABAJO';
      headDir = 'snake-head-S';
      }
      break;
    case 'KeyQ':
      if (timeCounter > 5) {
        console.log('Menos velocidad');
        timeCounter = 0;
        if (velocidad != 300) {
          velocidad = velocidad + 300;
        }
        velocimetro.innerHTML = (
          Math.round((0.5 + velocidad / 1000) * 100) / 100
        ).toFixed(2);
        updateInterval();
      }

      break;
    case 'KeyE':
      if (timeCounter > 5) {
        console.log('Más velocidad');
        timeCounter = 0;
        if (velocidad != -300) {
          velocidad = velocidad - 300;
        }
        velocimetro.innerHTML = (
          Math.round((0.5 + velocidad / 1000) * 100) / 100
        ).toFixed(2);
        updateInterval();
      }
      break;
      case 'KeyG':
        gridMode();
      break;
  }
});

function updateInterval() {
  clearInterval(gameInterval);
  gameInterval = setInterval(game, 500 + velocidad);
}

function counter() {
  timeCounter = timeCounter + 1;
}

function lose() {
  console.log(posicionActualY, posicionActualX);
  clearInterval(gameInterval);
  clearInterval(counterInterval);
  // fondo en rojo
  main.style.background = "red";
  // Texto de Snake game con mensaje
  titulo.innerHTML = "¡HAS PERDIDO!"
  // Terminar los intervalos
  // Cambiar color de serpiente a rojo
  grid.style.background = "black";
  tableroArray[posicionFrutaY][posicionFrutaX].classList.remove('apple');
  console.log(snake);
  for (let i = 0; i < snake.length; i++) {
    if (i != snake.length - 1) {
      if (i == 0) {
        tableroArray[snake[i][0]][snake[i][1]].classList.remove('snake-head');
        tableroArray[snake[i][0]][snake[i][1]].classList.add('snake-head-lose');
      } else if (i < snake.length - 2) {
        tableroArray[snake[i][0]][snake[i][1]].classList.remove('snake-body');
        tableroArray[snake[i][0]][snake[i][1]].classList.add('snake-body-lose');
      } else {
        tableroArray[snake[i][0]][snake[i][1]].classList.remove('snake-tail');
        tableroArray[snake[i][0]][snake[i][1]].classList.add('snake-tail-lose');
      }
    } else {
      // quitar casilla de color
      tableroArray[snake[i][0]][snake[i][1]].classList.remove('snake-head');
      tableroArray[snake[i][0]][snake[i][1]].classList.remove('snake-body');
      tableroArray[snake[i][0]][snake[i][1]].classList.remove('snake-tail');
    }
  }
}

function gridMode() {
  if (!gridModeBool) {

    for(var i = 0; i < tableroArray.length; i++) {
      for(var j = 0; j < tableroArray[i].length; j++) {
          tableroArray[i][j].classList.add('gridMode');
      }
    }
    gridModeBool = !gridModeBool;
  } else {
    for(var i = 0; i < tableroArray.length; i++) {
      for(var j = 0; j < tableroArray[i].length; j++) {
          tableroArray[i][j].classList.remove('gridMode');
      }
    }
    gridModeBool = !gridModeBool;
  }
}
