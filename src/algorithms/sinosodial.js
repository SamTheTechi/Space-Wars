export const highSinCirParameter = {
  amplitude: 85,
  frequency: 0.31,
  offset: 20,
};

export const sinosodial = (arr, parameter) => {
  const time = performance.now() / 100;
  arr.forEach((i, index) => {
    const phase = (index * Math.PI * 2) / arr.length;
    const sinValue = Math.sin(time * parameter.frequency + phase) * parameter.amplitude;

    i.positionY = i.originalPositionY + sinValue - parameter.offset;
  });
};
