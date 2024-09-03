import { solidRect, hollowRect, netRect } from '../algorithms/spawn.Config';
import { EnemyMetaData } from '../meta/enemy';

export const LevelConfiguration = [
  {
    // 1
    class: EnemyMetaData.nuker,
    algorithm: '',
    spawnConfig: solidRect,
    count: {
      col: 4,
      row: 8,
    },
  },
  {
    // 1
    class: EnemyMetaData.kamekaze,
    algorithm: '',
    spawnConfig: solidRect,
    count: {
      col: 4,
      row: 8,
    },
  },
  {
    // 2
    class: EnemyMetaData.fighter,
    algorithm: '',
    spawnConfig: hollowRect,
    count: {
      col: 3,
      row: 5,
    },
  },
  {
    // 3
    class: EnemyMetaData.chaser,
    algorithm: '',
    spawnConfig: solidRect,
    count: {
      col: 1,
      row: 6,
    },
  },
  {
    // 4
    class: EnemyMetaData.kamekaze,
    algorithm: 'LB',
    spawnConfig: hollowRect,
    count: {
      col: 4,
      row: 6,
    },
  },
  {
    // 5
    class: EnemyMetaData.fighter,
    algorithm: 'LC',
    spawnConfig: netRect,
    count: {
      col: 2,
      row: 8,
    },
  },
  {
    // 6
    class: EnemyMetaData.chaser,
    algorithm: 'LS',
    spawnConfig: hollowRect,
    count: {
      col: 3,
      row: 6,
    },
  },
  {
    // 7
    class: EnemyMetaData.fighter,
    algorithm: 'LS',
    spawnConfig: solidRect,
    count: {
      col: 1,
      row: 9,
    },
  },
  {
    // 8
    class: EnemyMetaData.chaser,
    algorithm: 'LC',
    spawnConfig: netRect,
    count: {
      col: 4,
      row: 8,
    },
  },
  {
    // 9
    class: EnemyMetaData.kamekaze,
    algorithm: 'LB',
    spawnConfig: solidRect,
    count: {
      col: 4,
      row: 5,
    },
  },
  {
    // 10 fighterboss
    class: EnemyMetaData.fighterBoss,
    algorithm: 'HS',
    spawnConfig: netRect,
    count: {
      col: 1,
      row: 6,
    },
  },
  {
    // 11
    class: EnemyMetaData.fighter,
    algorithm: 'boids',
    spawnConfig: netRect,
    count: {
      col: 2,
      row: 3,
    },
  },
  {
    // 12
    class: EnemyMetaData.fighter,
    algorithm: 'circular',
    spawnConfig: solidRect,
    count: {
      col: 4,
      row: 8,
    },
  },
  {
    // 13
    class: EnemyMetaData.fighter,
    algorithm: '',
    spawnConfig: hollowRect,
    count: {
      col: 3,
      row: 7,
    },
  },
  {
    // 14
    class: EnemyMetaData.kamekaze,
    algorithm: 'sinosodial',
    spawnConfig: netRect,
    count: {
      col: 6,
      row: 8,
    },
  },
  {
    // 15
    class: EnemyMetaData.chaser,
    algorithm: 'circular',
    spawnConfig: netRect,
    count: {
      col: 3,
      row: 7,
    },
  },
  {
    // 16
    class: EnemyMetaData.kamekaze,
    algorithm: 'boids',
    spawnConfig: hollowRect,
    count: {
      col: 4,
      row: 6,
    },
  },
  {
    // 17
    class: EnemyMetaData.fighter,
    algorithm: 'circular',
    spawnConfig: hollowRect,
    count: {
      col: 4,
      row: 6,
    },
  },
  {
    // 18
    class: EnemyMetaData.chaser,
    algorithm: 'circular',
    spawnConfig: solidRect,
    count: {
      col: 2,
      row: 9,
    },
  },
  {
    // 19
    class: EnemyMetaData.kamekaze,
    algorithm: 'boids',
    spawnConfig: netRect,
    count: {
      col: 6,
      row: 9,
    },
  },
  {
    // 20 crabBoss
    class: EnemyMetaData.crabBoss,
    algorithm: 'HB',
    spawnConfig: solidRect,
    count: {
      col: 1,
      row: 2,
    },
  },
  {
    // 21
    class: EnemyMetaData.chaser,
    algorithm: 'boids',
    spawnConfig: solidRect,
    count: {
      col: 3,
      row: 6,
    },
  },
  {
    // 22
    class: EnemyMetaData.crabBoss,
    algorithm: 'boids',
    spawnConfig: netRect,
    count: {
      col: 2,
      row: 3,
    },
  },
  {
    // 23
    class: EnemyMetaData.fighter,
    algorithm: 'circular',
    spawnConfig: solidRect,
    count: {
      col: 4,
      row: 8,
    },
  },
  {
    // 24
    class: EnemyMetaData.fighter,
    algorithm: '',
    spawnConfig: hollowRect,
    count: {
      col: 3,
      row: 7,
    },
  },
  {
    // 25
    class: EnemyMetaData.kamekaze,
    algorithm: 'sinosodial',
    spawnConfig: netRect,
    count: {
      col: 6,
      row: 8,
    },
  },
  {
    // 26
    class: EnemyMetaData.chaser,
    algorithm: 'circular',
    spawnConfig: netRect,
    count: {
      col: 3,
      row: 7,
    },
  },
  {
    // 27
    class: EnemyMetaData.kamekaze,
    algorithm: 'boids',
    spawnConfig: solidRect,
    count: {
      col: 4,
      row: 6,
    },
  },
  {
    // 28
    class: EnemyMetaData.fighter,
    algorithm: 'HC',
    spawnConfig: hollowRect,
    count: {
      col: 3,
      row: 9,
    },
  },
  {
    //  29
    class: EnemyMetaData.chaser,
    algorithm: 'LB',
    spawnConfig: solidRect,
    count: {
      col: 4,
      row: 6,
    },
  },
  {
    // 30
    class: EnemyMetaData.gunShip,
    algorithm: 'HC',
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
