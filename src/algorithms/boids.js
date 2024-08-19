import { collision } from '../util/collision';
import { distanceBetween } from '../util/distance';

const parameter = {
  flockStrength: 10,
  avoideStrength: 2,
  veocityStrength: 8,
  gradientStrength: 20,
  noise: 5,
  maxSpeed: 10,
};

const addnoise = (value) => {
  return value + (Math.random() - 0.5) * (parameter.noise / 10);
};

const flockTowardsCenter = (arr) => {
  const center = { x: 0, y: 0 };

  for (let i of arr) {
    center.x += i.positionX;
    center.y += i.positionY;
  }
  center.x = center.x / arr.length;
  center.y = center.y / arr.length;

  arr.forEach((i) => {
    const distanceX = center.x - i.positionX;
    const distanceY = center.y - i.positionY;
    i.velocity.dx += addnoise(distanceX * parameter.flockStrength) / 100000;
    i.velocity.dy += addnoise(distanceY * parameter.flockStrength) / 100000;

    i.velocity.dy -=
      (parameter.gradientStrength / 1000) * (i.positionY / center.y);
  });
};

const matchVelocity = (arr) => {
  const avgVelocity = { dx: 0, dy: 0 };
  for (let i of arr) {
    avgVelocity.dx += i.velocity.dx;
    avgVelocity.dy += i.velocity.dy;
  }
  avgVelocity.dx /= arr.length;
  avgVelocity.dy /= arr.length;

  arr.forEach((i) => {
    i.velocity.dx +=
      ((avgVelocity.dx - i.velocity.dx) * parameter.veocityStrength) / 800;
    i.velocity.dy +=
      ((avgVelocity.dy - i.velocity.dy) * parameter.veocityStrength) / 800;

    const speed = Math.sqrt(
      i.velocity.dx * i.velocity.dx + i.velocity.dy * i.velocity.dy
    );
    if (speed > parameter.maxSpeed) {
      const scaleFactor = parameter.maxSpeed / speed;
      i.velocity.dx *= scaleFactor;
      i.velocity.dy *= scaleFactor;
    }
  });
};

const avoiedOther = (arr) => {
  arr.forEach((i, indexI) => {
    arr.forEach((j, indexJ) => {
      if (indexI !== indexJ) {
        if (collision(i.collisionBoundries(), j.collisionBoundries(), 200)) {
          let distanceX = i.positionX - j.positionX;
          let distanceY = i.positionY - j.positionY;

          const distance = distanceBetween(distanceX, distanceY);

          const avoidanceStrength = 100 / (distance * 2 + 0.1);
          let avoidanceX = (distanceX > 0 ? -1 : 1) * avoidanceStrength;
          let avoidanceY = (distanceY > 0 ? -1 : 1) * avoidanceStrength;

          i.velocity.dx += addnoise(
            (avoidanceX * parameter.avoideStrength) / 100
          );
          i.velocity.dy += addnoise(
            (avoidanceY * parameter.avoideStrength) / 100
          );

          j.velocity.dx -= addnoise(
            (avoidanceX * parameter.avoideStrength) / 100
          );
          j.velocity.dy -= addnoise(
            (avoidanceY * parameter.avoideStrength) / 100
          );
        }
      }
    });
  });
};

export const boidsAlgo = (arr) => {
  avoiedOther(arr);
  flockTowardsCenter(arr);
  matchVelocity(arr);
};
