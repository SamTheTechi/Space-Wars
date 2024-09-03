import { WeaponMetaData } from './weapon';
import { AnimationMetaData } from './effect';

export const EnemyMetaData = {
  kamekaze: {
    Image: Object.assign(new Image(), { src: '/enemy/kamekazi.png' }),
    weapon: WeaponMetaData.empty,
    width: 45,
    height: 45,
    hitSound: '/audio/hitSound/kamekazi.mp3',
    weaponSound: '',
    blastAnimation: AnimationMetaData.mediumExplosion,
    hp: 0,
  },
  fighter: {
    Image: Object.assign(new Image(), { src: '/enemy/fighter.png' }),
    weapon: WeaponMetaData.dropbomb,
    width: 55,
    height: 55,
    hitSound: '/audio/hitSound/fighter.mp3',
    weaponSound: '/audio/weapon/dropbomb.mp3',
    blastAnimation: AnimationMetaData.mediumExplosion,
    hp: 0,
  },
  chaser: {
    Image: Object.assign(new Image(), { src: '/enemy/chaser.png' }),
    weapon: WeaponMetaData.homing,
    width: 50,
    height: 50,
    hitSound: '/audio/hitSound/chaser.mp3',
    weaponSound: '/audio/weapon/homing.mp3',
    blastAnimation: AnimationMetaData.mediumExplosion,
    hp: 0,
  },
  boss: {
    Image: Object.assign(new Image(), { src: '/enemy/boss.png' }),
    weapon: WeaponMetaData.nuke,
    width: 100,
    height: 100,
    hitSound: '/audio/hitSound/boss.mp3',
    weaponSound: '/audio/weapon/player.mp3',
    blastAnimation: AnimationMetaData.largeExplosion,
    hp: 14,
  },
};
