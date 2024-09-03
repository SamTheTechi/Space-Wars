import { Animation } from '../classes/animation';
import { PushArray } from '../store/globalStore';

export function generateAnimation(positionY, positionX, AnimationData) {
  const anima = new Animation(positionY, positionX, AnimationData);
  PushArray(anima);
}
