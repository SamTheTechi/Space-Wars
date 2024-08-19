let GameObject = new Array();

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
