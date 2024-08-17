export const collision = (rect1, rect2, buffer = 0) => {
  return !(
    rect2.left > rect1.right + buffer ||
    rect2.right < rect1.left - buffer ||
    rect2.top > rect1.bottom + buffer ||
    rect2.bottom < rect1.top - buffer
  );
};
