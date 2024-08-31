import { GameObject } from './object';
import { distanceBetween } from '../util/distance';
import { LaserClass } from './laser';

const noiseFactor = 70;

export class EnemyClass extends GameObject {
  constructor(positionX, positionY) {
    super(positionX, positionY);
    this.velocity = { dx: 2, dy: 3.5 };
    this.verticalOffset = this.canvasHeight;
    this.originalPositionY = this.positionY + 100;
    this.originalPositionX = this.positionX;
    this;
    this.type = 'enemy';
    this.fireRate = 250;
    this.positionY = positionY - this.verticalOffset;
    this.condition = false;
    this.targetPositionX = positionX;
    this.targetPositionY = positionY;
  }
  movement() {
    if (this.verticalOffset >= 0) {
      this.verticalOffset -= this.velocity.dy;
      this.positionY += this.velocity.dy;
    } else if (this.verticalOffset < 0 && !this.condition) {
      this.velocity.dy = 0;
      this.condition = true;
    } else {
      this.positionY += this.velocity.dy;
      this.positionX += this.velocity.dx;
      if (
        this.positionX + this.width / 2 >= this.canvasWidth ||
        this.positionX <= this.width / 2
      ) {
        this.velocity.dx = -this.velocity.dx;
      } else if (
        this.positionY + this.height >= this.canvasHeight ||
        this.positionY <= 0
      ) {
        this.velocity.dy = -this.velocity.dy;
      }
    }
  }
  fire(ObjectArray, component) {
    if (Math.floor(Math.random() * this.fireRate) === 0 && this.condition) {
      ObjectArray.push(
        new LaserClass(this.positionX, this.positionY, this.type, component)
      );
    }
  }
  updatePosition() {
    // Interpolate between current and target positions
    this.positionX +=
      (this.targetPositionX - this.positionX) * this.movementSpeed;
    this.positionY +=
      (this.targetPositionY - this.positionY) * this.movementSpeed;
  }

  locatePlayer(playerX, playerY) {
    const addNoise = (value) =>
      value + (Math.random() - 0.5) * (noiseFactor / 100);
    let component = { x: 0, y: 0 };

    let diffY = playerY - this.positionY;
    let diffX = playerX - this.positionX;

    let distance = distanceBetween(diffX, diffY);

    component.x = addNoise(diffX / distance);
    component.y = addNoise(diffY / distance);

    return component;
  }
}
