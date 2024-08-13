import { GameObject } from './object';

export class LaserClass extends GameObject {
  constructor(positionX, positionY) {
    super(positionX, positionY);
    this.velocity = 10;
    this.type = 'laser';
    this.height = 25;
    this.width = 10;
    if (this.positionY > 0) {
      this.positionY -= this.velocity;
    } else {
      this.dead = true;
    }
  }
  movement() {
    this.positionY -= this.velocity;
  }
}
