import { GameObject } from './object';

export class LaserClass extends GameObject {
  constructor(positionX, positionY, parent) {
    super(positionX, positionY);
    this.velocity = 12;
    this.type = 'laser';
    this.height = 25;
    this.width = 6;
    this.owner = parent;
    if (this.positionY > 0) {
      this.positionY -= this.velocity;
    } else {
      this.dead = true;
    }
  }
  movement() {
    switch (this.owner) {
      case 'player':
        this.positionY -= this.velocity;
        if (this.positionX < 0) this.dead = true;
        break;
      case `enemy`:
        this.positionY += this.velocity;
        if (this.positionY > this.canvasHeight) this.dead = true;
        break;
    }
  }
}
