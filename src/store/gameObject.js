let GameObject = new Array();
let Level = 0;

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
