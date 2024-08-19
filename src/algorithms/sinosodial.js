const parameter = {
  amplitude: 80,
  frequency: 0.3,
};

export const sinosodial = (arr) => {
  const time = performance.now() / 100;
  arr.forEach((i, index) => {
    const phase = (index * Math.PI * 2) / arr.length;
    const sinValue =
      Math.sin(time * parameter.frequency + phase) * parameter.amplitude;

    i.positionY = i.originalPosition + sinValue;
  });
};
