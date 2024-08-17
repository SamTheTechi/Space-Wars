import { GameObject } from './object';

export class LaserClass extends GameObject {
  constructor(positionX, positionY, parent, component = { x: 0, y: 1 }) {
    super(positionX, positionY);
    this.component = { x: component.x, y: component.y };
    this.component = component;
    this.velocity = { homing: 8, other: 12 };
    this.type = 'laser';
    this.kind = `homing`;
    this.owner = parent;
    this.height = 30;
    this.width = 8;
    if (this.positionY > 0) {
      this.positionY -= this.velocity.other;
    } else {
      this.dead = true;
    }
  }
  movement() {
    switch (this.owner) {
      case 'player':
        this.positionY -= this.velocity.other;
        if (this.positionX < 0) this.dead = true;
        break;
      case `enemy`:
        switch (this.kind) {
          case `homing`:
            this.height = 13;
            this.width = 13;
            this.positionX += this.velocity.homing * this.component.x;
            this.positionY += this.velocity.homing * this.component.y;
            break;
          default:
            this.positionY += this.velocity.other;
            break;
        }
        if (this.positionY > this.canvasHeight) this.dead = true;
        break;
    }
  }
}
