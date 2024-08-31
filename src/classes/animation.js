import { GameObject } from './object';

export class Animation extends GameObject {
  constructor(positionY, positionX) {
    super(positionX, positionY);
    this.type = 'animation';
    this.motion = true;
  }
}

// if (this.gameframe % Math.floor(6) === 0) {
//   if (this.frame < 3) this.frame++;
//   else this.frame = 0;
// }
// this.gameframe++;dd
