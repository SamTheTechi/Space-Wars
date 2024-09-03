import { GameObject } from './object';
import { ctx } from '../store/canvasProperty';
import { PlayerCoordinates } from '../store/globalStore';

export class LaserClass extends GameObject {
  constructor(positionX, positionY, parent, weaponData, component) {
    super(positionX, positionY);
    this.velocity = { homing: 6, bomb: 8, nuke: 0.1, bullet: 12 };
    this.type = 'laser';
    this.component = component;
    this.owner = parent;
    this.height = weaponData.height;
    this.width = weaponData.width;
    this.weaponKind = weaponData.Kind;
    this.img = weaponData.Image;
    this.motion = weaponData.motion;
    this.AnimationFrame = weaponData.AnimationFrame;
    this.scalingFactor = weaponData.scalingFactor;
  }

  drawAmmo() {
    if (this.motion) {
      ctx.drawImage(
        this.img,
        this.width * this.frame,
        0,
        this.width,
        this.height,
        this.positionX - this.width / 2,
        this.positionY,
        this.width * this.scalingFactor,
        this.height * this.scalingFactor
      );
    } else {
      ctx.drawImage(
        this.img,
        this.positionX - this.width / 2,
        this.positionY,
        this.width * this.scalingFactor,
        this.height * this.scalingFactor
      );
    }
  }

  movement() {
    switch (this.owner) {
      case 'player':
        this.positionY -= this.velocity.bullet;
        break;
      case 'enemy':
        switch (this.weaponKind) {
          case 'homing':
            this.positionX += this.velocity.homing * this.component.x;
            this.positionY += this.velocity.homing * this.component.y;
            break;
          case 'dropbomb':
            this.positionY += this.velocity.bomb;
            break;
          case 'invbullet':
            this.positionY += this.velocity.bullet;
            break;
          case 'nuke':
            this.positionY += this.velocity.nuke * (this.positionY / 5);
            this.positionX += (this.velocity.nuke * (PlayerCoordinates().X - this.positionX)) / 10;
            break;
          default:
            break;
        }
        break;
    }
    if (this.gameframe % this.AnimationDuration === 0) {
      if (this.frame < this.AnimationFrame) this.frame++;
      else this.frame = 0;
    }
    this.gameframe++;
    if (
      this.positionX - 10 < 0 ||
      this.positionX + 10 > this.canvasWidth ||
      this.positionY - 10 < 0 ||
      this.positionY + 10 > this.canvasHeight
    )
      this.dead = true;
  }
}
