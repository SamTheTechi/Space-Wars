import { GameObject } from "./object";
import { LaserClass } from "./laser";
import { WeaponMetaData } from "../meta/weapon";
import { UpdateX, UpdateY } from "../store/globalStore";
import { player, exaust } from "../meta/player";
import { ctx } from "../store/canvasProperty";
import { playSound } from "../util/playSound";
import { generateAnimation } from "../gen/animation";
import { AnimationMetaData } from "../meta/effect";
const game = document.querySelector(`#game`);

export class PlayerClass extends GameObject {
  constructor(positionX, positionY) {
    super(positionX, positionY);
    this.velocity = { dx: 8.5, dy: 8.5 };
    this.cooldown = 0;
    this.val = true;
    this.resistance = 0;
    this.type = "player";
    this.movementParameter = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.Onfire = false;
    this.img = player;
    this.exaustImg = exaust;
    this.hp = 10;
    this.frame = 2;
    this.exaustFrame = 0;
    this.motion = true;
    this.width = this.width - 2;
    this.scalingFactor = 1.2;
    this.buffer = 15;
    this.fireSound = "/audio/weapon/player.mp3";
  }

  drawPlayer() {
    ctx.drawImage(
      this.exaustImg,
      12 * this.exaustFrame,
      0,
      12,
      24,
      this.positionX - 4.5,
      this.positionY + this.height - 8,
      12 * this.scalingFactor * 1.3,
      24 * this.scalingFactor * 1.3,
    );
    ctx.drawImage(
      this.img,
      this.width * this.frame,
      0,
      this.width,
      this.height,
      this.positionX - this.width / 2,
      this.positionY,
      this.width * this.scalingFactor,
      this.height * this.scalingFactor,
    );
  }

  movement() {
    UpdateX(this.positionX);
    UpdateY(this.positionY);
    this.gameframe++;
    if (this.movementParameter.up && 0 < this.positionY - this.buffer) {
      this.positionY -= this.velocity.dy;
    } else if (
      this.movementParameter.down &&
      this.canvasHeight >
        this.positionY + this.buffer + this.height * this.scalingFactor
    ) {
      this.positionY += this.velocity.dy;
    } else if (
      this.movementParameter.left &&
      0 < this.positionX - this.buffer - (this.width * this.scalingFactor) / 2
    ) {
      this.positionX -= this.velocity.dx;
    } else if (
      this.movementParameter.right &&
      this.canvasWidth >
        this.positionX + this.buffer + (this.width * this.scalingFactor) / 2
    ) {
      this.positionX += this.velocity.dx;
    }
    if (this.gameframe % 12 === 0) {
      if (this.movementParameter.right && this.frame <= 3) {
        this.frame++;
      } else if (this.movementParameter.left && this.frame > 0) {
        this.frame--;
      } else {
        if (this.frame > 2 && !this.movementParameter.right) {
          this.frame--;
        } else if (this.frame < 2 && !this.movementParameter.left) {
          this.frame++;
        }
      }
    }
    if (this.gameframe % 5 === 0)
      this.exaustFrame < 3 ? this.exaustFrame++ : (this.exaustFrame = 0);
  }

  fire(ObjectArray) {
    if (this.canfire()) {
      playSound(this.fireSound);
      ObjectArray.push(
        new LaserClass(
          this.positionX + (this.scalingFactor * this.width) / 18,
          this.positionY,
          this.type,
          WeaponMetaData.bullet,
        ),
      );
      this.cooldown = 15;
    }
  }
  dmgTaken() {
    if (this.hp <= 0) {
      if (this.val) {
        playSound("/audio/hitSound/boss.mp3");
        generateAnimation(
          this.positionX,
          this.positionY,
          AnimationMetaData.largeExplosion,
        );
        setTimeout(() => {
          playSound("/audio/event/gameover.mp3");
        }, 1000);
        this.dead = true;
        this.val = false;
        game.innerHTML = "Game Over";
      }
    } else if (this.resistance === 0) {
      this.hp--;
      playSound("/audio/hitSound/player.mp3");
      this.resistance = 45;
    }
  }
  canfire() {
    return this.cooldown === 0;
  }
  cool() {
    if (this.resistance) {
      this.resistance -= 1;
    }
    if (this.cooldown > 0) {
      this.cooldown -= 1;
    }
  }
  update() {
    this.movement();
    this.cool();
  }
}
