import { GameObject } from './object';
import { LaserClass } from './laser';
import { ctx } from '../store/canvasProperty';

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
    this.centerFrame = 2;
    this.frame = 2;
    this.motion = true;
    this.width = this.width - 2;
  }

  movement() {
    this.gameframe++;
    if (this.movementParameter.up && 0 < this.positionY) {
      this.positionY -= this.velocity.dy;
    } else if (
      this.movementParameter.down &&
      this.canvasHeight > this.positionY + this.height
    ) {
      this.positionY += this.velocity.dy;
    } else if (
      this.movementParameter.left &&
      0 < this.positionX - this.width / 2
    ) {
      this.positionX -= this.velocity.dx;
    } else if (
      this.movementParameter.right &&
      this.canvasWidth > this.positionX + this.width / 2
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
      ObjectArray.push(
        new LaserClass(this.positionX, this.positionY, this.type)
      );
      this.cooldown = 10;
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
