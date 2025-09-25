const grid = document.getElementById('grid');
const mineCountEl = document.getElementById('mineCount');
const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const signalBtn = document.getElementById('signalBtn');
const timerEl = document.getElementById('timer');

let mineCount = 3;
const gridSize = 5;

function renderGrid(mines = []) {
  grid.innerHTML = '';
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    if (mines.length > 0) {
      cell.classList.add('revealed');
      if (mines.includes(i)) {
        cell.classList.add('mine');
        cell.textContent = '💣';
      } else {
        cell.classList.add('safe');
        cell.textContent = '⭐';
      }
    }
    grid.appendChild(cell);
  }
}

function generateMines(count) {
  const mines = new Set();
  while (mines.size < count) {
    mines.add(Math.floor(Math.random() * gridSize * gridSize));
  }
  return Array.from(mines);
}

function startTimer(duration) {
  let remaining = duration;
  timerEl.textContent = `⏳ ${remaining} сек`;
  const interval = setInterval(() => {
    remaining--;
    timerEl.textContent = `⏳ ${remaining} сек`;
    if (remaining <= 0) {
      clearInterval(interval);
      timerEl.textContent = '';
      signalBtn.disabled = false;
    }
  }, 1000);
}

minusBtn.addEventListener('click', () => {
  if (mineCount > 1) {
    mineCount--;
    mineCountEl.textContent = mineCount;
  }
});
plusBtn.addEventListener('click', () => {
  if (mineCount < gridSize * gridSize - 1) {
    mineCount++;
    mineCountEl.textContent = mineCount;
  }
});

signalBtn.addEventListener('click', () => {
  const mines = generateMines(mineCount);
  renderGrid(mines);
  signalBtn.disabled = true;
  startTimer(30);
});

// initial empty grid
renderGrid();