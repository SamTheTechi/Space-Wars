import { GameObject } from './object';
import { LaserClass } from './laser';

export class PlayerClass extends GameObject {
  constructor(positionX, positionY) {
    super(positionX, positionY);
    this.velocity = { dx: 0.2, dy: 0.2 };
    this.cooldown = 0;
    this.type = 'player';
    this.block = false;
  }
  movement() {
    if (
      this.positionX + this.width > this.canvasWidth ||
      this.positionX < this.width
    ) {
      this.block = true;
    }
    this.block = false;
  }
  fire(ObjectArray) {
    ObjectArray.push(new LaserClass(this.positionX, this.positionY));
    this.cooldown = 500;
    let id = setInterval(() => {
      if (this.cooldown > 0) {
        this.cooldown -= 100;
      } else {
        clearInterval(id);
      }
    }, 200);
  }
  canfire() {
    return this.cooldown === 0;
  }
}
