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
    celda.classList.add('abierta');
    if (numMinas === 0) {
      expandirCeldas(x, y);
    } else {
      celda.textContent = numMinas;
    }
    verificarVictoria(); // Verificar si todas las celdas no bomba han sido descubiertas
  }
}

function colocarBandera(event) {
  event.preventDefault();
  const celda = event.target;
  if (!celda.textContent && juegoEnCurso) {
    celda.classList.toggle('bandera');
  }
}

function calcularNumMinas(x, y) {
  const probabilidadBomba = 0.2;
  const random = Math.random();
  return random < probabilidadBomba;
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

function expandirCeldas(x, y) {
  const celdasPorExpandir = [{ x, y }];

  while (celdasPorExpandir.length > 0) {
    const { x, y } = celdasPorExpandir.shift();
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i >= 0 && i < 8 && j >= 0 && j < 8) {
          const celda = document.querySelector(`.celda[data-x="${i}"][data-y="${j}"]`);
          if (!celda.classList.contains('abierta')) {
            const tieneBomba = calcularNumMinas(i, j);
            const numMinas = calcularNumMinasAlrededor(i, j);
            if (!tieneBomba) {
              celda.classList.add('abierta');
              if (numMinas === 0) {
                celdasPorExpandir.push({ x: i, y: j });
              } else {
                celda.textContent = numMinas;
              }
            }
          }
        }
      }
    }
  }
}

function verificarVictoria() {
  const celdas = document.querySelectorAll('.celda');
  let todasDescubiertas = true;

  celdas.forEach(celda => {
    if (!celda.classList.contains('bomba') && !celda.classList.contains('abierta')) {
      todasDescubiertas = false;
    }
  });

  if (todasDescubiertas) {
    juegoEnCurso = false;
    alert('¡Has ganado!');
  }
}

document.addEventListener('DOMContentLoaded', nuevaPartida);
