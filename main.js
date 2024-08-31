/** @type {HTMLCanvasElement} */
import { keybindings, preventDefaultBehavior } from './src/util/keybinding';
import { PlayerClass } from './src/classes/player';
import { eventEmmiter, EventMaping } from './src/util/eventBinding';
import { collision } from './src/util/collision';
import { PushArray, WriteArray, ReadArray } from './src/store/gameObject';
import { canvasHeight, canvasWidth, ctx } from './src/store/canvasProperty';
import { boidsAlgo } from './src/algorithms/boids';
import { sinosodial } from './src/algorithms/sinosodial';
import { circular } from './src/algorithms/circular';
import { GameloadedAssets } from './src/gen/loadAsset';
import { generateEnemy } from './src/gen/enemy';
import { generateAnimation } from './src/gen/animation';
import { lavalConfiguration } from './src/gen/level.config';

export let onWindowLoad = false;
const div = document.querySelector(`#hit`);
let playerSpirit, player, enemy, laser, explosion1, explosion2, explosion3;
let hitcount = 0;
let Level = 0;
let GameStarted = false;
let engageMovementAlgo = false;

function generatePlayer() {
  playerSpirit = new PlayerClass(
    canvasWidth / 2,
    canvasHeight - canvasHeight / 4
  );
  PushArray(playerSpirit);
}

function updateGame() {
  let Player = ReadArray().filter((obj) => obj.type === `player`);
  let Animation = ReadArray().filter((obj) => obj.type === `animation`);
  let Laser = ReadArray().filter((obj) => obj.type === `laser`);
  let Enemy = ReadArray().filter((obj) => obj.type === `enemy`);

  Player.forEach((obj) => {
    obj.draw(player);
    obj.update();
  });

  Animation.forEach((obj) => {
    obj.draw(explosion1);
    console.log(`working`);
  });

  Laser.forEach((obj) => {
    obj.draw(laser);
    obj.movement();
  });

  Enemy.forEach((obj) => {
    obj.fire(
      ReadArray(),
      obj.locatePlayer(playerSpirit.positionX, playerSpirit.positionY)
    );
    obj.movement();
    obj.draw(enemy);
    if (obj.condition == true) engageMovementAlgo = true;
    if (collision(playerSpirit.collisionBoundries(), obj.collisionBoundries()))
      eventEmmiter.emit(EventMaping.COLLISON_PLAYER, obj);
    Laser.forEach((lsr) => {
      if (lsr.owner === 'player') {
        if (collision(obj.collisionBoundries(), lsr.collisionBoundries()))
          eventEmmiter.emit(EventMaping.COLLISON_LASER, { obj, lsr });
      } else {
        if (
          collision(playerSpirit.collisionBoundries(), lsr.collisionBoundries())
        )
          eventEmmiter.emit(EventMaping.HIT_LASER, lsr);
      }
    });
  });

  if (engageMovementAlgo) {
    switch (lavalConfiguration[Level - 1].algorithm) {
      case 'boids':
        boidsAlgo(Enemy);
        break;
      case 'sinosodial':
        sinosodial(Enemy);
        break;
      case 'circular':
        circular(Enemy);
        break;

      default:
        break;
    }
  }

  if (Enemy.length <= 0 && GameStarted === true)
    eventEmmiter.emit(EventMaping.NEXT_LEVEL, lavalConfiguration);

  WriteArray(ReadArray().filter((obj) => !obj.dead));
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
    if (playerSpirit.canfire()) playerSpirit.fire(ReadArray());
  });
  eventEmmiter.on(EventMaping.COLLISON_PLAYER, (_, obj) => {
    obj.dead = true;
    hitcount++;
  });
  eventEmmiter.on(EventMaping.COLLISON_LASER, (_, { obj, lsr }) => {
    generateAnimation(obj.positionY, obj.positionY);
    obj.dead = true;
    lsr.dead = true;
  });
  eventEmmiter.on(EventMaping.HIT_LASER, (_, lsr) => {
    lsr.dead = true;
    hitcount++;
  });
  eventEmmiter.on(EventMaping.NEXT_LEVEL, (_, data) => {
    if (lavalConfiguration.length - 1 > Level) {
      generateEnemy(
        data[Level].count.col,
        data[Level].count.row,
        enemy,
        data[Level].spawnConfig
      );
      engageMovementAlgo = false;
      Level++;
    } else {
      // console.log('end of game');
    }
  });
  eventEmmiter.on(EventMaping.ENTER_KEY, () => {
    if (GameStarted != true) {
      eventEmmiter.emit(EventMaping.NEXT_LEVEL, lavalConfiguration);
      GameStarted = true;
    }
  });
};

const animation = () => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  updateGame();
  requestAnimationFrame(animation);
};

window.onload = async () => {
  onWindowLoad = true;
  player = GameloadedAssets.player;
  enemy = GameloadedAssets.enemy;
  laser = GameloadedAssets.laserHoming;
  explosion1 = GameloadedAssets.explosion1;
  explosion2 = GameloadedAssets.explosion2;
  explosion3 = GameloadedAssets.explosion3;
  EventListener();
  generatePlayer();
  animation();
};

keybindings();
preventDefaultBehavior();
