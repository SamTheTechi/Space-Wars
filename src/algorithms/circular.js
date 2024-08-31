// const parameter = {
//   amplitude: 40,
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
const parameter = {
  initialRadius: 150,
  frequency: 0.3,
  decayRate: 0,
};

export const circular = (arr) => {
  const time = performance.now() / 400;

  arr.forEach((i, index) => {
    const phase = (index * Math.PI * 2) / arr.length;
    const angle = time * parameter.frequency + phase;

    const radius =
      parameter.initialRadius * Math.exp(-parameter.decayRate * time);

    i.positionX = i.canvasWidth / 2 + Math.cos(angle) * (radius * 2);
    i.positionY = i.canvasHeight / 3 + Math.sin(angle) * radius;
  });
};
