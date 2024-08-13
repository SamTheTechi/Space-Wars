/** @type {HTMLCanvasElement} */
import { keybindings, preventDefaultBehavior } from './src/util/keybinding';
import { PlayerClass } from './src/classes/player';
import { loadasset } from './src/util/loadasset';
import { EnemyClass } from './src/classes/enemy';
import { eventEmmiter, EventMaping } from './src/util/eventBinding';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let ObjectArray = new Array();

let hero,
  enemy,
  laser,
  playerSpirit = new EnemyClass();

const canvasHeight = (canvas.height = 650);
const canvasWidth = (canvas.width = 800);

function generateEnemy() {
  const row = 5;
  const col = 3;
  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      const emy = new EnemyClass(
        canvasWidth / 1.5 - 100 * x,
        (y * canvasHeight) / (row * 2)
      );
      emy.img = enemy;
      ObjectArray.push(emy);
    }
  }
}

function generatePlayer() {
  playerSpirit = new PlayerClass(
    canvasWidth / 2,
    canvasHeight - canvasHeight / 4
  );
  ObjectArray.push(playerSpirit);
}

function updateGame() {
  let Enemy = ObjectArray.filter((obj) => obj.type === `enemy`);
  let Laser = ObjectArray.filter((obj) => obj.type === `laser`);
  let Player = ObjectArray.filter((obj) => obj.type === `player`);

  Player.forEach((obj) => {
    obj.draw(hero);
    obj.update();
  });
  Enemy.forEach((obj) => {
    obj.draw(enemy);
    obj.movement();
  });
  Laser.forEach((obj) => {
    obj.draw(laser);
    obj.movement();
  });

  ObjectArray = ObjectArray.filter((obj) => !obj.dead);
}

const EventListener = () => {
  eventEmmiter.on(EventMaping.UP_KEY, () => {
    playerSpirit.positionY -= playerSpirit.velocity.dy;
  });
  eventEmmiter.on(EventMaping.DOWN_KEY, () => {
    playerSpirit.positionY += playerSpirit.velocity.dy;
  });
  eventEmmiter.on(EventMaping.LEFT_KEY, () => {
    playerSpirit.positionX -= playerSpirit.velocity.dx;
  });
  eventEmmiter.on(EventMaping.RIGHT_KEY, () => {
    playerSpirit.positionX += playerSpirit.velocity.dx;
  });
  eventEmmiter.on(EventMaping.SPACE_KEY, () => {
    if (playerSpirit.canfire()) playerSpirit.fire(ObjectArray);
  });
};

const animation = () => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  updateGame();
  requestAnimationFrame(animation);
};

window.onload = async () => {
  hero = await loadasset(`/player.png`);
  enemy = await loadasset(`/enemyShip.png`);
  laser = await loadasset(`/laserRed.png`);
  EventListener();
  generateEnemy();
  generatePlayer();
  animation();
};

keybindings();
preventDefaultBehavior();
