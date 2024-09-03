import { solidRect, hollowRect, netRect } from '../algorithms/spawn.Config';
import { EnemyMetaData } from '../meta/enemy';

export const LevelConfiguration = [
  {
    // wave one
    class: EnemyMetaData.kamekaze,
    algorithm: '',
    spawnConfig: solidRect,
    count: {
      col: 4,
      row: 8,
    },
  },
  {
    // wave two
    class: EnemyMetaData.fighter,
    algorithm: '',
    spawnConfig: hollowRect,
    count: {
      col: 3,
      row: 7,
    },
  },
  {
    // wave three
    class: EnemyMetaData.kamekaze,
    algorithm: 'sinosodial',
    spawnConfig: netRect,
    count: {
      col: 6,
      row: 8,
    },
  },
  {
    // wave four
    class: EnemyMetaData.chaser,
    algorithm: 'circular',
    spawnConfig: netRect,
    count: {
      col: 3,
      row: 7,
    },
  },
  {
    // wave five
    class: EnemyMetaData.kamekaze,
    algorithm: 'boids',
    spawnConfig: hollowRect,
    count: {
      col: 4,
      row: 6,
    },
  },
  {
    // wave six
    class: EnemyMetaData.fighter,
    algorithm: 'circular',
    spawnConfig: hollowRect,
    count: {
      col: 4,
      row: 6,
    },
  },
  {
    // wave seven
    class: EnemyMetaData.chaser,
    algorithm: 'circular',
    spawnConfig: solidRect,
    count: {
      col: 2,
      row: 9,
    },
  },
  {
    // wave eight
    class: EnemyMetaData.kamekaze,
    algorithm: 'boids',
    spawnConfig: netRect,
    count: {
      col: 6,
      row: 9,
    },
  },
  {
    // wave nine
    class: EnemyMetaData.fighter,
    algorithm: 'sinosodial',
    spawnConfig: solidRect,
    count: {
      col: 4,
      row: 8,
    },
  },
  {
    // wave ten
    class: EnemyMetaData.chaser,
    algorithm: 'boids',
    spawnConfig: solidRect,
    count: {
      col: 3,
      row: 6,
    },
  },
  {
    // boss
    class: EnemyMetaData.boss,
    algorithm: '',
    spawnConfig: solidRect,
    count: {
      col: 1,
      row: 1,
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
