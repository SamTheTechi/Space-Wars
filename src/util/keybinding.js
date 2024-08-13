export const movementKeys = async () => {
  window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case `w`:
        console.log(`w`);
        break;
      case `a`:
        console.log(`a`);
        break;
      case `d`:
        console.log(`d`);
        break;
      case `s`:
        console.log(`s`);
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
