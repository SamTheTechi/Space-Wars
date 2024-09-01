/** @type {HTMLCanvasElement} */
import { keybindings, preventDefaultBehavior } from './src/util/keybinding';
import { PlayerClass } from './src/classes/player';
import { eventEmmiter, EventMaping } from './src/util/eventBinding';
import { collision } from './src/util/collision';
import { PushArray, WriteArray, ReadArray, CurrentLevel, IncreaseLevel } from './src/store/gameObject';
import { canvasHeight, canvasWidth, ctx } from './src/store/canvasProperty';
import { boidsAlgo } from './src/algorithms/boids';
import { sinosodial } from './src/algorithms/sinosodial';
import { circular } from './src/algorithms/circular';
import { GameloadedAssets } from './src/gen/loadAsset';
import { generateEnemy } from './src/gen/enemy';
import { generateAnimation } from './src/gen/animation';
import { LevelConfiguration } from './src/gen/level.config';

import { Zplayer } from './src/store/assets';

export let onWindowLoad = false;
const div = document.querySelector(`#hit`);
let hitcount = 0;
let GameStarted = false;
let engageMovementAlgo = false;
let playerSpirit,
  player,
  shipgun,
  chaser,
  kamekazi,
  fighter,
  boss,
  smallExplosion,
  mediumExplosion,
  largeExplosion,
  shield,
  homing,
  dropboom,
  bullets,
  nuke;

function generatePlayer() {
  playerSpirit = new PlayerClass(canvasWidth / 2, canvasHeight - canvasHeight / 4);
  PushArray(playerSpirit);
}

function updateGame() {
  let Player = ReadArray().filter((obj) => obj.type === `player`);
  let Animation = ReadArray().filter((obj) => obj.type === `animation`);
  let Laser = ReadArray().filter((obj) => obj.type === `laser`);
  let Enemy = ReadArray().filter((obj) => obj.type === `enemy`);

  Player.forEach((obj) => {
    obj.draw(Zplayer);
    obj.update();
  });

  Animation.forEach((obj) => {
    obj.draw(largeExplosion);
    obj.movement();
  });

  Laser.forEach((obj) => {
    obj.draw(bullets);
    obj.movement();
  });

  Enemy.forEach((obj) => {
    let enemyType = LevelConfiguration[CurrentLevel()].class.type;
    console.log(enemyType);
    obj.draw(fighter);
    obj.fire(ReadArray(), obj.locatePlayer(playerSpirit.positionX, playerSpirit.positionY));
    obj.movement();

    if (obj.condition == true) engageMovementAlgo = true;
    if (collision(playerSpirit.collisionBoundries(), obj.collisionBoundries()))
      eventEmmiter.emit(EventMaping.COLLISON_PLAYER, obj);

    Laser.forEach((lsr) => {
      if (lsr.owner === 'player') {
        if (collision(obj.collisionBoundries(), lsr.collisionBoundries()))
          eventEmmiter.emit(EventMaping.COLLISON_LASER, { obj, lsr });
      } else {
        if (collision(playerSpirit.collisionBoundries(), lsr.collisionBoundries()))
          eventEmmiter.emit(EventMaping.HIT_LASER, lsr);
      }
    });
  });

  if (engageMovementAlgo) {
    switch (LevelConfiguration[CurrentLevel() - 1].algorithm) {
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

  if (Enemy.length <= 0 && GameStarted === true) eventEmmiter.emit(EventMaping.NEXT_LEVEL, LevelConfiguration);

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
    generateAnimation(obj.positionY, obj.positionX, 50, 50);
    obj.dead = true;
    lsr.dead = true;
  });
  eventEmmiter.on(EventMaping.HIT_LASER, (_, lsr) => {
    lsr.dead = true;
    hitcount++;
  });
  eventEmmiter.on(EventMaping.NEXT_LEVEL, (_, data) => {
    if (LevelConfiguration.length - 1 > CurrentLevel()) {
      generateEnemy(data);
      engageMovementAlgo = false;
      IncreaseLevel();
    } else {
      // console.log('end of game');
    }
  });
  eventEmmiter.on(EventMaping.ENTER_KEY, () => {
    if (GameStarted != true) {
      eventEmmiter.emit(EventMaping.NEXT_LEVEL, LevelConfiguration);
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
  player = GameloadedAssets.player;
  shipgun = GameloadedAssets.shipgun;
  chaser = GameloadedAssets.chaser;
  fighter = GameloadedAssets.fighter;
  kamekazi = GameloadedAssets.kamekazi;
  boss = GameloadedAssets.boss;
  smallExplosion = GameloadedAssets.smallExplosion;
  mediumExplosion = GameloadedAssets.mediumExplosion;
  largeExplosion = GameloadedAssets.largeExplosion;
  shield = GameloadedAssets.shield;
  homing = GameloadedAssets.homing;
  dropboom = GameloadedAssets.dropboom;
  bullets = GameloadedAssets.bullets;
  nuke = GameloadedAssets.nuke;
  onWindowLoad = true;

  EventListener();
  generatePlayer();

  animation();
};

keybindings();
preventDefaultBehavior();
