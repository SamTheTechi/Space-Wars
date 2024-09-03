import { GameObject } from './object';
import { ctx } from '../store/canvasProperty';

export class Animation extends GameObject {
  constructor(positionY, positionX, AnimationData) {
    super(positionX, positionY);
    this.type = 'animation';
    this.motion = true;
    this.kind = AnimationData.Kind;
    this.img = AnimationData.Image;
    this.width = AnimationData.width;
    this.height = AnimationData.height;
    this.scalingFactor = AnimationData.scalingFactor;
    this.AnimationFrame = AnimationData.AnimationFrame;
    this.AnimationDuration = 5;
  }

  drawAnimation() {
    ctx.drawImage(
      this.img,
      this.width * this.frame,
      0,
      this.width,
      this.height,
      this.positionY - this.width / 2,
      this.positionX - this.height / 4,
      this.width * this.scalingFactor,
      this.height * this.scalingFactor
    );
  }

  movement() {
    if (this.gameframe % this.AnimationDuration === 0) {
      if (this.frame < this.AnimationFrame) this.frame++;
      else this.dead = true;
    }
    this.gameframe++;
  }
}
