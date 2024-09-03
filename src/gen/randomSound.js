const generateRandomNum = () => Math.floor(Math.random() * 7);
const sounds = [
  '/audio/weird/alien1.mp3',
  '/audio/weird/alien2.mp3',
  '/audio/weird/alien3.mp3',
  '/audio/weird/scream.mp3',
  '/audio/weird/hitech.mp3',
  '/audio/weird/retro.mp3',
  '/audio/weird/interferences.mp3',
];
export const generateAlianNoise = () => sounds[generateRandomNum()];
