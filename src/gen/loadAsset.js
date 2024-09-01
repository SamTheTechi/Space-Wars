import { GameUnloadedAssets } from '../store/assets';

export const GameloadedAssets = {};
const assetsName = GameUnloadedAssets.map(
  (item) => item.split('/')[2].split('.')[0]
);

assetsName.forEach((variable) => {
  Object.defineProperty(GameloadedAssets, variable, {
    value: '',
    writable: true,
  });
});

Promise.all(
  GameUnloadedAssets.map((item) => {
    const name = item.split('/')[2].split('.')[0];
    return new Promise((resolve) => {
      const img = new Image();
      img.src = item;
      img.onload = () => {
        resolve({ key: name, image: img });
      };
    });
  })
).then((loaded) => {
  loaded.forEach(({ key, image }) => {
    GameloadedAssets[key] = image;
  });
});
