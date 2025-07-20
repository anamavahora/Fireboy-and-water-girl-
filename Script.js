const game = document.getElementById('game');
const width = 15;
const layout = [
  // 0 empty, 1 platform, 2 lava, 3 water, 4 fireboy, 5 watergirl, 6 exit
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,3,0,0,0,0,0,0,1,
  1,0,2,0,0,0,0,1,0,0,0,2,0,0,1,
  1,0,0,0,1,1,1,1,1,1,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,6,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,4,0,0,0,0,0,0,0,0,0,0,0,5,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
];

const squares = [];
let fireboyIndex = 0;
let watergirlIndex = 0;

function createBoard() {
  layout.forEach((cell, i) => {
    const tile = document.createElement('div');
    tile.classList.add('tile');

    switch (cell) {
      case 1: tile.classList.add('platform'); break;
      case 2: tile.classList.add('lava'); break;
      case 3: tile.classList.add('water'); break;
      case 4:
        tile.classList.add('fireboy');
        fireboyIndex = i;
        break;
      case 5:
        tile.classList.add('watergirl');
        watergirlIndex = i;
        break;
      case 6: tile.classList.add('exit'); break;
    }

    game.appendChild(tile);
    squares.push(tile);
  });
}

function moveCharacter(index, newIndex, charClass, dieCondition) {
  if (!squares[newIndex] || squares[newIndex].classList.contains('platform')) return;

  const newTile = squares[newIndex];

  if (newTile.classList.contains(dieCondition)) {
    alert(`${charClass} died!`);
    return;
  }

  squares[index].classList.remove(charClass);
  squares[newIndex].classList.add(charClass);

  return newIndex;
}

function handleMovement(e) {
  // Fireboy controls - Arrow keys
  if (e.key === 'ArrowLeft' && fireboyIndex % width !== 0)
    fireboyIndex = moveCharacter(fireboyIndex, fireboyIndex - 1, 'fireboy', 'water') || fireboyIndex;
  else if (e.key === 'ArrowRight' && fireboyIndex % width < width - 1)
    fireboyIndex = moveCharacter(fireboyIndex, fireboyIndex + 1, 'fireboy', 'water') || fireboyIndex;

  // Watergirl controls - WASD
  if (e.key === 'a' && watergirlIndex % width !== 0)
    watergirlIndex = moveCharacter(watergirlIndex, watergirlIndex - 1, 'watergirl', 'lava') || watergirlIndex;
  else if (e.key === 'd' && watergirlIndex % width < width - 1)
    watergirlIndex = moveCharacter(watergirlIndex, watergirlIndex + 1, 'watergirl', 'lava') || watergirlIndex;

  checkWin();
}

function checkWin() {
  if (
    squares[fireboyIndex].classList.contains('exit') &&
    squares[watergirlIndex].classList.contains('exit')
  ) {
    alert('You win! Both reached the exit.');
  }
}

createBoard();
document.addEventListener('keydown', handleMovement);
