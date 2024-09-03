import { canvasHeight, canvasWidth, ctx } from '../store/canvasProperty';

export class GameObject {
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.type = '';
    this.dead = false;
    this.img = '';
    this.height = 50;
    this.width = 50;
    this.motion = false;
    this.frame = 0;
    this.gameframe = 0;
    this.AnimationFrame = 11;
    this.scalingFactor = 1;
    this.AnimationDuration = 5;
  }

  collisionBoundries() {
    return {
      top: this.positionY,
      left: this.positionX - this.width / 2,
      bottom: this.positionY + this.height,
      right: this.positionX + this.width / 2,
    };
  }
}
