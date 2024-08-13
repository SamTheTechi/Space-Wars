import { GameObject } from './object';
import { collision } from '../util/collision';

export class EnemyClass extends GameObject {
  constructor(positionX, positionY, img) {
    super(positionX, positionY, img);
    this.velocity = { dx: 8, dy: 30 };
    this.type = 'enemy';
    this.sutter = 3;
    this.sutterRest = 3;
  }
  movement() {
    if (this.sutter > 0) {
      this.sutter--;
    } else {
      this.sutter = this.sutterRest;
      this.positionX += this.velocity.dx;
      if (
        this.positionX + this.width / 2 > this.canvasWidth ||
        this.positionX < this.width / 2
      ) {
        this.positionY += this.velocity.dy;
        this.velocity.dx = -this.velocity.dx;
      }
    }
  }
  fire() {}
}
