import { WeaponMetaData } from './weapon';
import { AnimationMetaData } from './effect';

export const EnemyMetaData = {
  kamekaze: {
    Image: Object.assign(new Image(), { src: '/enemy/kamekazi.png' }),
    weapon: WeaponMetaData.empty,
    width: 50,
    height: 50,
    hitSound: '/audio/hitSound/kamekazi.wav',
    blastAnimation: AnimationMetaData.mediumExplosion,
  },
  fighter: {
    Image: Object.assign(new Image(), { src: '/enemy/fighter.png' }),
    weapon: WeaponMetaData.dropbomb,
    width: 50,
    height: 50,
    hitSound: '/audio/hitSound/fighter.wav',
    blastAnimation: AnimationMetaData.mediumExplosion,
  },
  chaser: {
    Image: Object.assign(new Image(), { src: '/enemy/chaser.png' }),
    weapon: WeaponMetaData.homing,
    width: 50,
    height: 50,
    hitSound: '/audio/hitSound/chaser.wav',
    blastAnimation: AnimationMetaData.mediumExplosion,
  },
  boss: {
    Image: Object.assign(new Image(), { src: '/enemy/boss.png' }),
    weapon: WeaponMetaData.nuke,
    width: 50,
    height: 50,
    hitSound: '/audio/hitSound/boss.wav',
    blastAnimation: AnimationMetaData.largeExplosion,
  },
};
