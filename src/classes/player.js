import { GameObject } from './object';
import { LaserClass } from './laser';
import { countDown } from '../util/countdown';

export class PlayerClass extends GameObject {
  constructor(positionX, positionY) {
    super(positionX, positionY);
    this.velocity = { dx: 2, dy: 5 };
    this.cooldown = 0;
    this.type = 'player';
  }
  movement() {}
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
