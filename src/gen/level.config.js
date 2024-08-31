import { solidRect, hollowRect, netRect } from '../algorithms/spawn.Config';

export const lavalConfiguration = [
  {
    // wave one
    type: '',
    algorithm: '',
    spawnConfig: solidRect,
    count: {
      col: 4,
      row: 6,
    },
  },
  {
    // wave two
    type: '',
    algorithm: 'boids',
    spawnConfig: hollowRect,
    count: {
      col: 4,
      row: 6,
    },
  },
  {
    // wave three
    type: '',
    algorithm: 'sinosodial',
    spawnConfig: netRect,
    count: {
      col: 4,
      row: 10,
    },
  },
  {
    // wave four
    type: '',
    algorithm: 'circular',
    spawnConfig: solidRect,
    count: {
      col: 1,
      row: 6,
    },
  },
  {
    // wave five
    type: '',
    algorithm: '',
    spawnConfig: netRect,
    count: {
      col: 3,
      row: 6,
    },
  },
  {
    type: '',
    algorithm: '',
    spawnConfig: '',
    count: {
      col: 1,
      row: 6,
    },
  },
];
