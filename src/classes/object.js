import { canvasHeight, canvasWidth, ctx } from '../store/canvasProperty';

export class GameObject {
  constructor(positionX, positionY) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.canvasHeight = canvasHeight;
    this.canvasWidth = canvasWidth;
    this.type = '';
    this.dead = false;
    this.img = new Image();
    this.img.src = '';
    this.height = 50;
    this.width = 50;
    this.motion = false;
    this.frame = 0;
    this.gameframe = 0;
  }
  draw(img) {
    this.img = img;
    if (this.motion) {
      ctx.drawImage(
        this.img,
        this.width * this.frame,
        0,
        this.width,
        this.height,
        this.positionX - this.width / 2,
        this.positionY,
        this.width + this.width / 15,
        this.height + this.height / 15
      );
    } else {
      ctx.drawImage(
        this.img,
        this.positionX - this.width / 2,
        this.positionY,
        this.width + this.width / 15,
        this.height + this.height / 15
      );
    }
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
