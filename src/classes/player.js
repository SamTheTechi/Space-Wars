import { GameObject } from './object';
import { LaserClass } from './laser';
import { WeaponMetaData } from '../meta/weapon';
import { UpdateX, UpdateY } from '../store/globalStore';
import { player } from '../meta/player';
import { ctx } from '../store/canvasProperty';
import { playSound } from '../util/playSound';

export class PlayerClass extends GameObject {
  constructor(positionX, positionY) {
    super(positionX, positionY);
    this.velocity = { dx: 8, dy: 8 };
    this.cooldown = 0;
    this.type = 'player';
    this.movementParameter = {
      up: false,
      down: false,
      left: false,
      right: false,
    };
    this.img = player;
    this.frame = 2;
    this.motion = true;
    this.width = this.width - 2;
    this.scalingFactor = 1.2;
    this.buffer = 15;
    this.fireSound = '/audio/weapon/player.mp3';
  }
  drawPlayer() {
    ctx.drawImage(
      this.img,
      this.width * this.frame,
      0,
      this.width,
      this.height,
      this.positionX - this.width / 2,
      this.positionY,
      this.width * this.scalingFactor,
      this.height * this.scalingFactor
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
      this.canvasHeight > this.positionY + this.buffer + this.height * this.scalingFactor
    ) {
      this.positionY += this.velocity.dy;
    } else if (
      this.movementParameter.left &&
      0 < this.positionX - this.buffer - (this.width * this.scalingFactor) / 2
    ) {
      this.positionX -= this.velocity.dx;
    } else if (
      this.movementParameter.right &&
      this.canvasWidth > this.positionX + this.buffer + (this.width * this.scalingFactor) / 2
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
  }

  fire(ObjectArray) {
    if (this.canfire()) {
      playSound(this.fireSound);
      ObjectArray.push(
        new LaserClass(
          this.positionX + (this.scalingFactor * this.width) / 18,
          this.positionY,
          this.type,
          WeaponMetaData.bullet
        )
      );
      this.cooldown = 18;
    }
  }
  canfire() {
    return this.cooldown === 0;
  }
  cool() {
    if (this.cooldown > 0) {
      this.cooldown -= 1;
    }
  }
  update() {
    this.movement();
    this.cool();
  }
}
