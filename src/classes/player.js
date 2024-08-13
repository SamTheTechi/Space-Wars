import { GameObject } from './object';
import { LaserClass } from './laser';

export class PlayerClass extends GameObject {
  constructor(positionX, positionY) {
    super(positionX, positionY);
    this.velocity = { dx: 25, dy: 25 };
    this.cooldown = 0;
    this.type = 'player';
    this.block = false;
  }
  movement() {}
  fire(ObjectArray) {
    if (this.canfire()) {
      ObjectArray.push(
        new LaserClass(this.positionX, this.positionY, this.type)
      );
      this.cooldown = 25;
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
