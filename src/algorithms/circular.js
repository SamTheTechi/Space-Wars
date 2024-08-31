// const parameter = {
//   amplitude: 80,
//   frequency: 0.3,
// };

// export const circular = (arr) => {
//   const time = performance.now() / 100;

//   arr.forEach((i, index) => {
//     const phase = (index * Math.PI * 2) / arr.length;
//     const angle = time * parameter.frequency + phase;
//     i.positionX = i.originalPositionX + Math.cos(angle) * parameter.amplitude;
//     i.positionY = i.originalPositionY + Math.sin(angle) * parameter.amplitude;
//   });
// };
// const parameter = {
//   initialRadius: 150,
//   frequency: 0.3,
//   decayRate: 0,
// };

// export const circular = (arr) => {
//   const time = performance.now() / 400;

//   arr.forEach((i, index) => {
//     const phase = (index * Math.PI * 2) / arr.length;s
//     const angle = time * parameter.frequency + phase;

//     const radius =
//       parameter.initialRadius * Math.exp(-parameter.decayRate * time);

//     i.positionX = i.canvasWidth / 2 + Math.cos(angle) * (radius * 2);
//     i.positionY = i.canvasHeight / 3 + Math.sin(angle) * radius;
//   });
// };
const parameter = {
  initialRadius: 80, // Starting radius for circular motion
  frequency: 0.3, // How fast the objects rotate
  decayRate: 0.01, // How quickly the radius decreases over time
  movementSpeed: 0.05, // Speed of gradual movement (0 to 1)
};

export const circular = (arr, centerX, centerY) => {
  const time = performance.now() / 100;

  arr.forEach((i, index) => {
    const phase = (index * Math.PI * 2) / arr.length; // Phase shift for even spacing around the circle
    const angle = time * parameter.frequency + phase; // Angle for circular motion

    // Calculate the current radius for the circular path
    const radius =
      parameter.initialRadius * Math.exp(-parameter.decayRate * time);

    // Calculate target positions based on the current radius and angle
    const targetX = centerX + Math.cos(angle) * radius;
    const targetY = centerY + Math.sin(angle) * radius;

    // Gradually move each object to its target position
    i.positionX += (targetX - i.positionX) * parameter.movementSpeed;
    i.positionY += (targetY - i.positionY) * parameter.movementSpeed;
  });
};
