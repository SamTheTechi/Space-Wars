export const collision = (rect1, rect2) => {
  if (
    rect1.positionX + 50 > rect2.positionX &&
    rect1.positionX - 50 < rect2.positionX &&
    rect1.positionY + 50 > rect2.positionY &&
    rect1.positionY < rect2.positionY
  ) {
    return true;
  } else return false;
};
