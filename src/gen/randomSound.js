const generateRandomNum = () => Math.floor(Math.random() * 9);
const sounds = [
  '/audio/weird/alien1.mp3',
  '/audio/weird/alien2.mp3',
  '/audio/weird/alien3.mp3',
  '/audio/weird/computer.mp3',
  '/audio/weird/scream1.mp3',
  '/audio/weird/scream2.mp3',
  '/audio/weird/retro.mp3',
  '/audio/weird/interferences.mp3',
  '/audio/weird/nanana.mp3',
];
export const generateAlianNoise = () => sounds[generateRandomNum()];
