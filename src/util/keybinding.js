import { eventEmmiter, EventMaping } from './eventBinding';

export const movementKeys = async () => {
  window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case `w`:
      case `W`:
      case `ArrowUp`:
        eventEmmiter.emit(EventMaping.UP_KEY);
        break;
      case `a`:
      case `A`:
      case `ArrowLeft`:
        eventEmmiter.emit(EventMaping.LEFT_KEY);
        break;
      case `d`:
      case `D`:
      case `ArrowRight`:
        eventEmmiter.emit(EventMaping.RIGHT_KEY);
        break;
      case `s`:
      case `S`:
      case `ArrowDown`:
        eventEmmiter.emit(EventMaping.DOWN_KEY);
        break;
      case `Enter`:
        eventEmmiter.emit(EventMaping.ENTER_KEY);
        break;
      case ` `:
        eventEmmiter.emit(EventMaping.SPACE_KEY);
        break;
    }
  });
};

export const preventDefaultBehavior = async () => {
  window.addEventListener(`keydown`, (event) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
      case ' ':
        event.preventDefault();
        break;
      default:
        break;
    }
  });
};
