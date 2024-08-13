import { GameObject } from './object';
import { collision } from '../util/collision';

export class EnemyClass extends GameObject {
  constructor(positionX, positionY) {
    super(positionX, positionY);
    this.velocity = { dx: 3, dy: 50 };
    this.type = 'enemy';
  }
  movement() {
    this.positionX += this.velocity.dx;
    if (
      this.positionX + this.width > this.canvasWidth ||
      this.positionX < this.width
    ) {
      this.velocity.dx = -this.velocity.dx;
      this.positionY += this.velocity.dy;
    }
  }
}
