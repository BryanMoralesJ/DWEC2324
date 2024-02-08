const tablero = document.getElementById('tablero');
const nuevaPartidaBtn = document.getElementById('nuevaPartida');
let juegoEnCurso = true; 

nuevaPartidaBtn.addEventListener('click', nuevaPartida);

// Generamos le tablero en la pantalla
function dibujarTableroHTML() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const celda = document.createElement('div');
      celda.className = 'celda';
      celda.dataset.x = i;
      celda.dataset.y = j;
      celda.addEventListener('click', investigarCelda);
      celda.addEventListener('contextmenu', colocarBandera);
      tablero.appendChild(celda);
    }
  }
}

function nuevaPartida() {
  juegoEnCurso = true;
  tablero.innerHTML = '';
  dibujarTableroHTML();
}

// Aquí voy a validar también si no se encontró ya una bomba, en caso de que juegoEnCurso sea false no se podrá manipular más el tablero
function investigarCelda(event) {
  if (!juegoEnCurso) return; 
  
  const celda = event.target;
  const x = parseInt(celda.dataset.x);
  const y = parseInt(celda.dataset.y);
  const tieneBomba = calcularNumMinas(x, y);

  if (tieneBomba) {
    celda.classList.add('bomba');
    juegoEnCurso = false;
    alert('¡Has perdido!');
  } else {
    const numMinas = calcularNumMinasAlrededor(x, y);
    celda.textContent = numMinas;
  }
}

function colocarBandera(event) {
  event.preventDefault();
  const celda = event.target;
  if (!celda.textContent && juegoEnCurso) {
    celda.classList.toggle('bandera');
  }
}

// Lo hice un poco simple, si son pares mete las bombas
function calcularNumMinas(x, y) {
  return x % 2 === 0 && y % 2 === 0;
}

function calcularNumMinasAlrededor(x, y) {
  let numMinas = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i >= 0 && i < 8 && j >= 0 && j < 8) {
        if (!(i === x && j === y)) {
          if (calcularNumMinas(i, j)) {
            numMinas++;
          }
        }
      }
    }
  }
  return numMinas;
}

document.addEventListener('DOMContentLoaded', nuevaPartida);
