/** @type {HTMLCanvasElement} */
import { keybindings, preventDefaultBehavior } from './src/util/keybinding';
import { PlayerClass } from './src/classes/player';
import { loadasset } from './src/util/loadasset';
import { EnemyClass } from './src/classes/enemy';
import { eventEmmiter, EventMaping } from './src/util/eventBinding';
import { collision } from './src/util/collision';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const div = document.querySelector(`#hit`);
let ObjectArray = new Array();

let hero,
  enemy,
  laser,
  playerSpirit = new EnemyClass();
let hitcount = 0;

const canvasHeight = (canvas.height = 700);
const canvasWidth = (canvas.width = 1000);

function generateEnemy() {
  const row = 8;
  const col = 2;

  for (let x = 0; x < row; x++) {
    for (let y = 0; y < col; y++) {
      const emy = new EnemyClass(
        canvasWidth / 1.5 - 60 * x,
        (y * canvasHeight) / (row * 1.9)
      );
      emy.img = enemy;
      ObjectArray.push(emy);
    }
  }
  // for (let x = 0; x < row; x++) {
  //   for (let y = 0; y < col; y++) {
  //     const emy = new EnemyClass(
  //       Math.floor(Math.random() * canvasWidth),
  //       Math.floor(Math.random() * canvasHeight)
  //     );
  //     emy.img = enemy;
  //     ObjectArray.push(emy);
  //   }
  // }
}

function generatePlayer() {
  playerSpirit = new PlayerClass(
    canvasWidth / 2,
    canvasHeight - canvasHeight / 4
  );
  ObjectArray.push(playerSpirit);
}

import { boidsAlgo } from './src/algo/boids';
import { sinosodial } from './src/algo/sinosodial';
import { circular } from './src/algo/circular';

function updateGame() {
  let Enemy = ObjectArray.filter((obj) => obj.type === `enemy`);
  let Laser = ObjectArray.filter((obj) => obj.type === `laser`);
  let Player = ObjectArray.filter((obj) => obj.type === `player`);

  boidsAlgo(Enemy);
  // sinosodial(Enemy);

  Player.forEach((obj) => {
    obj.draw(hero);
    obj.update();
  });

  Enemy.forEach((obj) => {
    obj.movement();
    obj.fire(
      ObjectArray,
      obj.locatePlayer(playerSpirit.positionX, playerSpirit.positionY)
    );
    obj.draw(enemy);
    if (collision(playerSpirit.collisionBoundries(), obj.collisionBoundries()))
      eventEmmiter.emit(EventMaping.COLLISON_PLAYER, obj);
  });

  Laser.forEach((obj) => {
    obj.draw(laser);
    obj.movement();
  });

  Enemy.forEach((emy) => {
    Laser.forEach((lsr) => {
      if (lsr.owner === 'player') {
        if (collision(emy.collisionBoundries(), lsr.collisionBoundries()))
          eventEmmiter.emit(EventMaping.COLLISON_LASER, { emy, lsr });
      } else {
        if (
          collision(playerSpirit.collisionBoundries(), lsr.collisionBoundries())
        )
          eventEmmiter.emit(EventMaping.HIT_LASER, lsr);
      }
    });
  });

  ObjectArray = ObjectArray.filter((obj) => !obj.dead);
  div.innerHTML = `Damage taken ${hitcount}`;
}

const EventListener = () => {
  eventEmmiter.on(EventMaping.UP_KEY, (_, onMove) => {
    if (onMove) playerSpirit.movementParameter.up = true;
    else playerSpirit.movementParameter.up = false;
  });
  eventEmmiter.on(EventMaping.DOWN_KEY, (_, onMove) => {
    if (onMove) playerSpirit.movementParameter.down = true;
    else playerSpirit.movementParameter.down = false;
  });
  eventEmmiter.on(EventMaping.LEFT_KEY, (_, onMove) => {
    if (onMove) playerSpirit.movementParameter.left = true;
    else playerSpirit.movementParameter.left = false;
  });
  eventEmmiter.on(EventMaping.RIGHT_KEY, (_, onMove) => {
    if (onMove) playerSpirit.movementParameter.right = true;
    else playerSpirit.movementParameter.right = false;
  });
  eventEmmiter.on(EventMaping.SPACE_KEY, () => {
    if (playerSpirit.canfire()) playerSpirit.fire(ObjectArray);
  });
  eventEmmiter.on(EventMaping.COLLISON_PLAYER, (_, emy) => {
    emy.dead = true;
    hitcount++;
  });
  eventEmmiter.on(EventMaping.COLLISON_LASER, (_, { emy, lsr }) => {
    emy.dead = true;
    lsr.dead = true;
  });
  eventEmmiter.on(EventMaping.HIT_LASER, (_, lsr) => {
    lsr.dead = true;
    hitcount++;
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
  // laser = await loadasset(`/laserGreen.png`);
  laser = await loadasset(`/ball.png`);
  EventListener();
  generateEnemy();
  generatePlayer();
  animation();
};

keybindings();
preventDefaultBehavior();
