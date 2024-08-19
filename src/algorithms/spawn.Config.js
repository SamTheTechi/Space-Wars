export const solidRect = (col, row) => {
  const arr = [];
  for (let i = 0; i < row; i++) {
    arr[i] = [];
    for (let j = 0; j < col; j++) {
      arr[i][j] = 1;
    }
  }
  return arr;
};

export const hollowRect = (col, row) => {
  const arr = [];
  for (let i = 0; i < row; i++) {
    arr[i] = [];
    for (let j = 0; j < col; j++) {
      if (i === 0 || i === row - 1 || j === 0 || j === col - 1) {
        arr[i][j] = 1;
      } else {
        arr[i][j] = 0;
      }
    }
  }
  return arr;
};

export const netRect = (col, row) => {
  const arr = [];
  let flag = true;
  for (let i = 0; i < row; i++) {
    arr[i] = [];
    for (let j = 0; j < col; j++) {
      arr[i][j] = (i + j) % 2;
    }
  }
  return arr;
};
