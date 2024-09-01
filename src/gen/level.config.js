import { solidRect, hollowRect, netRect } from '../algorithms/spawn.Config';
import { EnemyMetaData } from '../meta/enemy';

export const LevelConfiguration = [
  {
    // wave one
    class: EnemyMetaData.fighter,
    algorithm: '',
    spawnConfig: solidRect,
    count: {
      col: 4,
      row: 6,
    },
  },
  {
    // wave two
    class: EnemyMetaData.chaser,
    algorithm: 'sinosodial',
    spawnConfig: netRect,
    count: {
      col: 4,
      row: 8,
    },
  },
  {
    // wave three
    class: EnemyMetaData.kamekaze,
    algorithm: 'boids',
    spawnConfig: hollowRect,
    count: {
      col: 4,
      row: 6,
    },
  },
  {
    // wave four
    class: EnemyMetaData.chaser,
    algorithm: 'circular',
    spawnConfig: solidRect,
    count: {
      col: 4,
      row: 6,
    },
  },
  {
    // wave five
    class: EnemyMetaData.kamekaze,
    algorithm: '',
    spawnConfig: netRect,
    count: {
      col: 4,
      row: 6,
    },
  },
  {
    class: '',
    algorithm: '',
    spawnConfig: '',
    count: {
      col: 1,
      row: 6,
    },
  },
];
