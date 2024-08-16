// let position = { meanX: 0, meanY: 0, meanDx: 0, meanDy: 0 };
// import { collision } from './collision';

// const flockTowardsCenter = (arr) => {
//   position.meanX = 0;
//   position.meanY = 0;
//   for (let i of arr) {
//     position.meanX += i.positionX;
//     position.meanY += i.positionY;
//   }
//   return {
//     meanX: Math.floor(position.meanX / arr.length),
//     meanY: Math.floor(position.meanY / arr.length),
//   };
// };

// const avoideOther = (arr) => {
//   arr.forEach((i, indexI) => {
//     let avoidance = { x: 0, y: 0 };
//     arr.forEach((j, indexJ) => {
//       if (
//         collision(i.collisionBoundries(), j.collisionBoundries()) &&
//         indexI !== indexJ
//       ) {
//         let distanceX = i.positionX - j.positionX;
//         let distanceY = i.positionY - j.positionY;

//         const avoidanceStrength =
//           100 / Math.sqrt(distanceX * distanceX + distanceY * distanceY);

//         avoidance.x = (distanceX > 0 ? -1 : 1) * avoidanceStrength;
//         avoidance.y = (distanceY > 0 ? -1 : 1) * avoidanceStrength;
//       }
//     });
//     i.velocity.dx += avoidance.x * 0.1;
//     i.velocity.dy += avoidance.y * 0.1;
//   });
// };

// const matchVelocity = (arr) => {
//   position.meanDx = 0;
//   position.meanDy = 0;
//   for (let i of arr) {
//     position.meanDx += i.velocity.dx;
//     position.meanDy += i.velocity.dy;
//   }
//   return {
//     meanDx: Math.round((position.meanDx / arr.length) * 100),
//     meanDy: Math.round((position.meanDy / arr.length) * 100),
//   };
// };

// export const boidsAlgo = (arr) => {
//   avoideOther(arr);
//   // console.log(flockTowardsCenter(arr));
//   // console.log(matchVelocity(arr));
// };
import { collision } from './collision';

export const boidsAlgo = (arr) => {
  // Avoid other boids
  arr.forEach((boid, indexI) => {
    let avoidance = { x: 0, y: 0 };
    arr.forEach((otherBoid, indexJ) => {
      if (
        collision(boid.collisionBoundries(), otherBoid.collisionBoundries()) &&
        indexI !== indexJ
      ) {
        const distanceX = boid.positionX - otherBoid.positionX;
        const distanceY = boid.positionY - otherBoid.positionY;

        const avoidanceStrength =
          100 / Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        avoidance.x += (distanceX > 0 ? -1 : 1) * avoidanceStrength;
        avoidance.y += (distanceY > 0 ? -1 : 1) * avoidanceStrength;
      }
    });
    boid.velocity.dx += avoidance.x * 0.1;
    boid.velocity.dy += avoidance.y * 0.1;
  });

  // Flock towards center
  const center = { x: 0, y: 0 };
  arr.forEach((boid) => {
    center.x += boid.positionX;
    center.y += boid.positionY;
  });
  center.x /= arr.length;
  center.y /= arr.length;

  arr.forEach((boid) => {
    const distanceX = center.x - boid.positionX;
    const distanceY = center.y - boid.positionY;
    const alignmentStrength = 0.1; // Adjust as needed
    boid.velocity.dx += distanceX * alignmentStrength;
    boid.velocity.dy += distanceY * alignmentStrength;
  });

  // Match velocity
  const averageVelocity = { x: 0, y: 0 };
  arr.forEach((boid) => {
    averageVelocity.x += boid.velocity.dx;
    averageVelocity.y += boid.velocity.dy;
  });
  averageVelocity.x /= arr.length;
  averageVelocity.y /= arr.length;

  arr.forEach((boid) => {
    const alignmentStrength = 0.1; // Adjust as needed
    boid.velocity.dx +=
      (averageVelocity.x - boid.velocity.dx) * alignmentStrength;
    boid.velocity.dy +=
      (averageVelocity.y - boid.velocity.dy) * alignmentStrength;
  });
};
