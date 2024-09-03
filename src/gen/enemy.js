import { EnemyClass } from '../classes/enemy';
import { canvasHeight, canvasWidth } from '../store/canvasProperty';
import { PushArray, CurrentLevel } from '../store/globalStore';

export function generateEnemy(data) {
  let col = data[CurrentLevel()].count.col;
  let row = data[CurrentLevel()].count.row;
  let MetaData = data[CurrentLevel()].class;
  const arr = data[CurrentLevel()].spawnConfig(col, row);

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (arr[i][j]) {
        const emy = new EnemyClass(canvasWidth / 1.5 - 70 * i, (j * canvasHeight) / (row * 1.5), MetaData);
        PushArray(emy);
      }
    }
  }
}
