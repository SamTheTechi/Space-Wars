import { PlayerClass } from "./src/classes/player";
import { keybindings, preventDefaultBehavior } from "./src/util/keybinding";
import { eventEmmiter, EventMaping } from "./src/util/eventBinding";
import { collision } from "./src/util/collision";
import {
  PushArray,
  WriteArray,
  ReadArray,
  CurrentLevel,
  IncreaseLevel,
} from "./src/store/globalStore";
import { canvasHeight, canvasWidth, ctx } from "./src/store/canvasProperty";
import {
  boids,
  boidsParameter,
  bossBoidsParameter,
} from "./src/algorithms/boids";
import { sinosodial, highSinCirParameter } from "./src/algorithms/sinosodial";
import { circular, lowSinCirParameter } from "./src/algorithms/circular";
import { generateEnemy } from "./src/gen/enemy";
import { LevelConfiguration } from "./src/gen/level.config";
import { playSound } from "./src/util/playSound";
import { generateAlianNoise } from "./src/gen/randomSound";
import { generateAnimation } from "./src/gen/animation";
import { AnimationMetaData } from "./src/meta/effect";

export let onWindowLoad = false;

const battleMusic = playSound("/audio/backgroundSound/battle.mp3", 0.45, true);
const menuMusic = playSound("/audio/backgroundSound/menu.mp3", 0.45, true);
menuMusic.play();
battleMusic.pause();
let GameStarted = false;
let GameWon = false;
let engageMovementAlgo = false;
let playerSpirit;
const div = document.querySelector(`#hit`);
const wave = document.querySelector(`#wave`);
const game = document.querySelector(`#game`);
const rule = document.querySelector(`#countrols`);

function generatePlayer() {
  playerSpirit = new PlayerClass(
    canvasWidth / 2,
    canvasHeight - canvasHeight / 4,
  );
  PushArray(playerSpirit);
}

function updateGame() {
  let Player = ReadArray().filter((obj) => obj.type === `player`);
  let Animation = ReadArray().filter((obj) => obj.type === `animation`);
  let Laser = ReadArray().filter((obj) => obj.type === `laser`);
  let Enemy = ReadArray().filter((obj) => obj.type === `enemy`);
  let playerLaser = Laser.filter((item) => item.owner === "player");
  let enemyLaser = Laser.filter((item) => item.owner === "enemy");
  if (playerSpirit.canfire() && playerSpirit.OnFire)
    playerSpirit.fire(ReadArray());
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

  playerLaser.forEach((playerLsr) => {
    enemyLaser.forEach((enemyLsr) => {
      if (
        collision(playerLsr.collisionBoundries(), enemyLsr.collisionBoundries())
      )
        eventEmmiter.emit(EventMaping.COLLISON_LASER, { playerLsr, enemyLsr });
    });
  });

  Enemy.forEach((obj) => {
    obj.drawEnemy();
    obj.fire(ReadArray());
    obj.movement();

    if (obj.condition == true) engageMovementAlgo = true;
    if (collision(playerSpirit.collisionBoundries(), obj.collisionBoundries()))
      eventEmmiter.emit(EventMaping.COLLISON_PLAYER, obj);

    Laser.forEach((lsr) => {
      if (lsr.owner === "player") {
        if (collision(obj.collisionBoundries(), lsr.collisionBoundries()))
          eventEmmiter.emit(EventMaping.COLLISON_ENEMY, { obj, lsr });
      } else {
        if (
          collision(playerSpirit.collisionBoundries(), lsr.collisionBoundries())
        )
          eventEmmiter.emit(EventMaping.HIT_LASER, lsr);
      }
    });
  });

  if (engageMovementAlgo) {
    switch (LevelConfiguration[CurrentLevel() - 1].algorithm) {
      case "HB":
        boids(Enemy, bossBoidsParameter);
        break;
      case "LB":
        boids(Enemy, boidsParameter);
        break;
      case "HS":
        sinosodial(Enemy, highSinCirParameter);
        break;
      case "LS":
        sinosodial(Enemy, lowSinCirParameter);
        break;
      case "HC":
        circular(Enemy, highSinCirParameter);
        break;
      case "LC":
        circular(Enemy, lowSinCirParameter);
        break;
      default:
        break;
    }
  }

  if (Enemy.length <= 0 && GameStarted === true)
    eventEmmiter.emit(EventMaping.NEXT_LEVEL, LevelConfiguration);

  WriteArray(ReadArray().filter((obj) => !obj.dead));
  div.innerHTML = `Health Remaning : ${playerSpirit.hp}`;
  wave.innerHTML = `Wave Number: ${CurrentLevel()}`;
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
  eventEmmiter.on(EventMaping.SPACE_KEY, (_, onFire) => {
    playerSpirit.OnFire = onFire;
    console.log(onFire);
  });
  eventEmmiter.on(EventMaping.COLLISON_LASER, (_, { playerLsr, enemyLsr }) => {
    playerLsr.dead = true;
    enemyLsr.dead = true;
    playSound("/audio/hitSound/lasercollision.mp3");
    generateAnimation(
      enemyLsr.positionX,
      enemyLsr.positionY,
      AnimationMetaData.smallExplosion,
    );
  });
  eventEmmiter.on(EventMaping.COLLISON_PLAYER, (_, obj) => {
    playerSpirit.dmgTaken();
    obj.deadEffect();
  });
  eventEmmiter.on(EventMaping.COLLISON_ENEMY, (_, { obj, lsr }) => {
    lsr.dead = true;
    obj.deadEffect();
  });
  eventEmmiter.on(EventMaping.HIT_LASER, (_, lsr) => {
    playerSpirit.dmgTaken();
    lsr.dead = true;
    generateAnimation(
      lsr.positionX,
      lsr.positionY + 20,
      AnimationMetaData.smallExplosion,
    );
  });
  eventEmmiter.on(EventMaping.NEXT_LEVEL, (_, data) => {
    if (LevelConfiguration.length - 1 > CurrentLevel()) {
      engageMovementAlgo = false;
      generateEnemy(data);
      IncreaseLevel();
      GameWon = true;
    } else {
      if (GameWon) {
        game.innerHTML = `Mission Completed!`;
        playSound("/audio/event/youwon.mp3");
        GameWon = false;
      }
    }
  });
  eventEmmiter.on(EventMaping.ENTER_KEY, () => {
    if (GameStarted != true) {
      setInterval(() => {
        playSound(generateAlianNoise(), 0.4);
      }, 6000);
      game.innerHTML = ``;
      rule.style.visibility = "hidden";
      menuMusic.pause();
      battleMusic.play();
      eventEmmiter.emit(EventMaping.NEXT_LEVEL, LevelConfiguration);
      GameStarted = true;
    }
  });
};

const FPS = 59;
const interval = 1000 / FPS;
let lastTime = 0;

const animation = (currentTime) => {
  const changeTime = currentTime - lastTime;
  if (changeTime > interval) {
    lastTime = currentTime - (changeTime % interval);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    updateGame();
  }
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
