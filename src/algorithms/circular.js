const parameter = {
  amplitude: 40,
  frequency: 0.3,
};

export const circular = (arr) => {
  const time = performance.now() / 100;

  arr.forEach((i, index) => {
    const phase = (index * Math.PI * 2) / arr.length;
    const angle = time * parameter.frequency + phase;
    i.positionX = i.originalPositionX + Math.cos(angle) * parameter.amplitude;
    i.positionY = i.originalPositionY + Math.sin(angle) * parameter.amplitude;
  });
};
