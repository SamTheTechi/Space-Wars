const generateRandomNum = () => Math.floor(Math.random() * 4);
const sounds = [
  '/audio/alian/alien1.wav',
  '/audio/alian/alien2.wav',
  '/audio/alian/alien3.wav',
  '/audio/alian/scream.wav',
];
export const generateAlianNoise = () => sounds[generateRandomNum()];
