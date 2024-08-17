import { GameObject } from './object';
import { distanceBetween } from '../util/distance';
import { LaserClass } from './laser';

const noiseFactor = 70;

export class EnemyClass extends GameObject {
  constructor(positionX, positionY) {
    super(positionX, positionY);
    this.velocity = { dx: 2, dy: 0 };
    this.originalPosition = this.positionY + 100;
    this.type = 'enemy';
    this.fireRate = 250;
  }
  movement() {
    this.positionX += this.velocity.dx;
    this.positionY += this.velocity.dy;
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
  fire(ObjectArray, component) {
    if (Math.floor(Math.random() * this.fireRate) === 0) {
      ObjectArray.push(
        new LaserClass(this.positionX, this.positionY, this.type, component)
      );
    }
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
