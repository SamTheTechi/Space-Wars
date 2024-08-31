import { Animation } from '../classes/animation';
import { PushArray } from '../store/gameObject';

export function generateAnimation(positionY, positionX) {
  const anima = new Animation(positionY, positionX);
  PushArray(anima);
}
