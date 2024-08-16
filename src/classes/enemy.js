import { GameObject } from './object';
import { LaserClass } from './laser';

export class EnemyClass extends GameObject {
  constructor(positionX, positionY, img) {
    super(positionX, positionY, img);
    // this.velocity = { dx: 0, dy: 0 };
    this.type = 'enemy';
    this.fireRate = 250;
  }
  movement() {
    this.positionX += this.velocity.dx;
    if (
      this.positionX + this.width / 2 > this.canvasWidth ||
      this.positionX < this.width / 2
    ) {
      this.positionY += this.velocity.dy;
      this.velocity.dx = -this.velocity.dx;
    }
  }
  fire(ObjectArray) {
    if (Math.floor(Math.random() * this.fireRate) === 0) {
      ObjectArray.push(
        new LaserClass(this.positionX, this.positionY, this.type)
      );
    }
  }
}
