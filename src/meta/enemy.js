import { WeaponMetaData } from './weapon';
import { AnimationMetaData } from './effect';

export const EnemyMetaData = {
  kamekaze: {
    type: 'kamekaze',
    weapon: 'none',
    width: 50,
    height: 50,
    blastAnimation: AnimationMetaData.samllExplosion,
  },
  fighter: {
    type: 'fighter',
    weapon: WeaponMetaData.dropboom,
    width: 50,
    height: 50,
    blastAnimation: AnimationMetaData.mediumExplosion,
  },
  chaser: {
    type: 'chaser',
    weapon: WeaponMetaData.homing,
    width: 50,
    height: 50,
    blastAnimation: AnimationMetaData.mediumExplosion,
  },
  boss: {
    type: 'boss',
    weapon: WeaponMetaData.nuke,
    width: 50,
    height: 50,
    blastAnimation: AnimationMetaData.largeExplosion,
  },
};
