export const AnimationMetaData = {
  smallExplosion: {
    Kind: 'smallExplosion',
    Image: Object.assign(new Image(), { src: '/effect/smallExplosion.png' }),
    AnimationFrame: 4,
    width: 32,
    height: 32,
    scalingFactor: 1,
  },
  mediumExplosion: {
    Kind: 'mediumExplosion',
    Image: Object.assign(new Image(), { src: '/effect/mediumExplosion.png' }),
    AnimationFrame: 9,
    width: 63.5,
    height: 63.5,
    scalingFactor: 0.9,
  },
  largeExplosion: {
    Kind: 'largeExplosion',
    Image: Object.assign(new Image(), { src: '/effect/largeExplosion.png' }),
    AnimationFrame: 10,
    width: 480,
    height: 480,
    scalingFactor: 0.7,
  },
  shield: {
    Kind: 'shield',
    Image: Object.assign(new Image(), { src: '/effect/shield.png' }),
    AnimationFrame: 11,
    width: 100,
    height: 100,
    scalingFactor: 1,
  },
};
