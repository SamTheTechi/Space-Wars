const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const canvasHeight = (canvas.height = 650);
const canvasWidth = (canvas.width = 800);

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
  }

  draw(img) {
    this.img = img;
    ctx.drawImage(
      this.img,
      this.positionX - this.width / 2,
      this.positionY,
      this.width,
      this.height
    );
  }
}
