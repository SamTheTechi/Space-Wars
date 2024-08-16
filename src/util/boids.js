let position = { meanX: 0, meanY: 0, meanDx: 0, meanDy: 0 };

const meanWeight = (arr) => {
  for (let i of arr) {
    position.meanX += i.positionX;
    position.meanY += i.positionY;
  }
  return {
    meanX: meanX / arr.length,
    meanY: meanY / arr.length,
  };
};

const meanVelocity = (arr) => {};

export const boidsAlgo = (arr) => {
  meanVelocity(arr);

  // meanWeight(arr);
};
