/** @type {HTMLCanvasElement} */
import { movementKeys } from './src/util/keybinding';
import { PlayerClass } from './src/classes/player';
import { loadasset } from './src/util/loadasset';
import { EnemyClass } from './src/classes/enemy';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let ObjectArray = new Array();

let hero, enemy, laser;

const canvasHeight = (canvas.height = 650);
const canvasWidth = (canvas.width = 800);

function generateEnemy() {
  const row = 5;
  const col = 3;
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      const emy = new EnemyClass(
        canvasWidth / 2 - 75 * x,
        (y * canvasHeight) / (row * 2)
      );
      emy.img = enemy;
      ObjectArray.push(emy);
    }
  }
}

const playerSpirit = new PlayerClass(
  canvasWidth / 2,
  canvasHeight - canvasHeight / 4
);

const animation = () => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  playerSpirit.draw(hero);

  ObjectArray.map((item) => {
    if (item.type === 'enemy') {
      item.draw(enemy);
      item.movement();
    }
  });
  requestAnimationFrame(animation);
};

window.onload = async () => {
  hero = await loadasset(`/player.png`);
  enemy = await loadasset(`/enemyShip.png`);
  laser = await loadasset(`/laserRed.png`);
  generateEnemy();
  animation();
};

movementKeys();
