/** @type {HTMLCanvasElement} */
import { PlayerClass } from './src/classes/player';
import { keybindings, preventDefaultBehavior } from './src/util/keybinding';
import { eventEmmiter, EventMaping } from './src/util/eventBinding';
import { collision } from './src/util/collision';
import { PushArray, WriteArray, ReadArray, CurrentLevel, IncreaseLevel } from './src/store/globalStore';
import { canvasHeight, canvasWidth, ctx } from './src/store/canvasProperty';
import { boidsAlgo } from './src/algorithms/boids';
import { sinosodial } from './src/algorithms/sinosodial';
import { circular } from './src/algorithms/circular';
import { generateEnemy } from './src/gen/enemy';
import { LevelConfiguration } from './src/gen/level.config';
import { playSound } from './src/util/playSound';
import { generateAlianNoise } from './src/gen/randomSound';
import { generateAnimation } from './src/gen/animation';
import { AnimationMetaData } from './src/meta/effect';

export let onWindowLoad = false;

const battleMusic = playSound('/audio/backgroundSound/battle.mp3', 0.6, true);
const menuMusic = playSound('/audio/backgroundSound/menu.mp3', 0.6, true);
menuMusic.play();
battleMusic.pause();
const div = document.querySelector(`#hit`);
let hitcount = 0;
let GameStarted = false;
let engageMovementAlgo = false;
let playerSpirit;

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
    obj.drawPlayer();
    obj.update();
  });

  Animation.forEach((obj) => {
    obj.drawAnimation();
    obj.movement();
  });

  Laser.forEach((obj) => {
    obj.drawAmmo();
    obj.movement();
  });

  Enemy.forEach((obj) => {
    obj.drawEnemy();
    obj.fire(ReadArray());
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
    hitcount++;
    obj.deadEffect();
  });
  eventEmmiter.on(EventMaping.COLLISON_LASER, (_, { obj, lsr }) => {
    lsr.dead = true;
    obj.deadEffect();
  });
  eventEmmiter.on(EventMaping.HIT_LASER, (_, lsr) => {
    lsr.dead = true;
    generateAnimation(lsr.positionX, lsr.positionY + 20, AnimationMetaData.smallExplosion);
    hitcount++;
  });
  eventEmmiter.on(EventMaping.NEXT_LEVEL, (_, data) => {
    if (LevelConfiguration.length - 1 > CurrentLevel()) {
      engageMovementAlgo = false;
      generateEnemy(data);
      IncreaseLevel();
    } else {
      // console.log('end of game');
    }
  });
  eventEmmiter.on(EventMaping.ENTER_KEY, () => {
    menuMusic.pause();
    battleMusic.play();
    setInterval(() => {
      playSound(generateAlianNoise(), 0.4);
    }, 5000);

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
  onWindowLoad = true;
  EventListener();
  generatePlayer();
  animation();
};

keybindings();
preventDefaultBehavior();
