export const playSound = (audio, volume = 1, loop = false) => {
  const sound = Object.assign(new Audio(), { src: audio, loop: loop, preload: 'auto', volume: volume });
  sound.play();
  return sound;
};
