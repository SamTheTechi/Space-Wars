import { Animation } from '../classes/animation';
import { PushArray } from '../store/gameObject';

export function generateAnimation(positionY, positionX, width, height) {
  const anima = new Animation(positionY, positionX, width, height);
  PushArray(anima);
}
