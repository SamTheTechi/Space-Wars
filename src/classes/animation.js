import { GameObject } from './object';

export class Animation extends GameObject {
  constructor(positionY, positionX, width, height) {
    super(positionX, positionY);
    this.type = 'animation';
    this.motion = true;
    this.width = width;
    this.height = height;
    this.AnimationFrame = 11;
    this.AnimationDuration = 5;
  }

  // movement() {
  //   if (this.gameframe % this.AnimationDuration === 0) {
  //     if (this.frame < this.AnimationFrame) this.frame++;
  //     else this.frame = 0;
  //   }
  //   this.gameframe++;
  // }

  movement() {
    if (this.gameframe % this.AnimationDuration === 0) {
      if (this.frame < this.AnimationFrame) this.frame++;
      else this.dead = true;
    }
    this.gameframe++;
  }
}
