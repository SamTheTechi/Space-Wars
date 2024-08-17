import { GameObject } from './object';
import { LaserClass } from './laser';
const random = () => (Math.random() - 0.5) * 10;

export class EnemyClass extends GameObject {
  constructor(positionX, positionY, img) {
    super(positionX, positionY, img);
    this.velocity = { dx: random(), dy: random() };
    this.type = 'enemy';
    this.fireRate = 250;
  }
  movement() {
    this.positionX += this.velocity.dx;
    this.positionY += this.velocity.dy;
    if (
      this.positionX + this.width / 2 > this.canvasWidth ||
      this.positionX < this.width / 2
    ) {
      this.velocity.dx = -this.velocity.dx;
    } else if (
      this.positionY + this.height > this.canvasHeight ||
      this.positionY < 0
    ) {
      this.velocity.dy = -this.velocity.dy;
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
