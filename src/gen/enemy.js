import { EnemyClass } from '../classes/enemy';
import { canvasHeight, canvasWidth } from '../store/canvasProperty';
import { PushArray } from '../store/gameObject';
import { solidRect } from '../algorithms/spawn.Config';

export function generateEnemy(row, col, type = solidRect, enemy) {
  const arr = type(col, row);
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (arr[i][j]) {
        const emy = new EnemyClass(
          canvasWidth / 1.5 - 70 * i,
          (j * canvasHeight) / (row * 0.92)
        );
        emy.img = enemy;
        PushArray(emy);
      }
    }
  }
}
