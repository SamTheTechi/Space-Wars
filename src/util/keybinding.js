import { eventEmmiter, EventMaping } from './eventBinding';

let onMove;
let onFire;

const keysDown = async () => {
  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case `w`:
      case `W`:
      case `ArrowUp`:
        eventEmmiter.emit(EventMaping.UP_KEY, (onMove = true));
        break;
      case `a`:
      case `A`:
      case `ArrowLeft`:
        eventEmmiter.emit(EventMaping.LEFT_KEY, (onMove = true));
        break;
      case `d`:
      case `D`:
      case `ArrowRight`:
        eventEmmiter.emit(EventMaping.RIGHT_KEY, (onMove = true));
        break;
      case `s`:
      case `S`:
      case `ArrowDown`:
        eventEmmiter.emit(EventMaping.DOWN_KEY, (onMove = true));
        break;
      case `Enter`:
        eventEmmiter.emit(EventMaping.ENTER_KEY);
        break;
      case ` `:
        eventEmmiter.emit(EventMaping.SPACE_KEY, (onFire = true));
        break;
    }
  });
};

const keysUp = async () => {
  window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case `w`:
      case `W`:
      case `ArrowUp`:
        eventEmmiter.emit(EventMaping.UP_KEY, (onMove = false));
        break;
      case `a`:
      case `A`:
      case `ArrowLeft`:
        eventEmmiter.emit(EventMaping.LEFT_KEY, (onMove = false));
        break;
      case `d`:
      case `D`:
      case `ArrowRight`:
        eventEmmiter.emit(EventMaping.RIGHT_KEY, (onMove = false));
        break;
      case `s`:
      case `S`:
      case `ArrowDown`:
        eventEmmiter.emit(EventMaping.DOWN_KEY, (onMove = false));
        break;
      case ` `:
        eventEmmiter.emit(EventMaping.SPACE_KEY, (onFire = false));
        break;
    }
  });
};

export const keybindings = async () => {
  await keysDown();
  await keysUp();
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
