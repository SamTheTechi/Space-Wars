let GameObject = new Array();
let Level = 0;
let Player = {
  Y: 0,
  X: 0,
};

export const UpdateX = (X) => (Player.X = X);
export const UpdateY = (Y) => (Player.Y = Y);
export const PlayerCoordinates = () => Player;

export const IncreaseLevel = () => Level++;
export const CurrentLevel = () => Level;

export const WriteArray = (arr) => {
  GameObject.splice(0, GameObject.length);
  GameObject = arr;
};
export const PushArray = (item) => {
  GameObject.push(item);
};
export const ReadArray = () => {
  return GameObject;
};
