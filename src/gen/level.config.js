import { solidRect, hollowRect, netRect } from '../algorithms/spawn.Config';
import { EnemyMetaData } from '../meta/enemy';

export const LevelConfiguration = [
  {
    // 1
    class: EnemyMetaData.kamekaze,
    algorithm: '',
    spawnConfig: solidRect,
    count: {
      col: 3,
      row: 7,
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
      row: 8,
    },
  },
  {
    // 4
    class: EnemyMetaData.nuker,
    algorithm: '',
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
    class: EnemyMetaData.nuker,
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
      col: 3,
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
      row: 4,
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
    algorithm: 'LC',
    spawnConfig: solidRect,
    count: {
      col: 2,
      row: 5,
    },
  },
  {
    // 12
    class: EnemyMetaData.nuker,
    algorithm: 'LS',
    spawnConfig: netRect,
    count: {
      col: 4,
      row: 8,
    },
  },
  {
    // 13
    class: EnemyMetaData.kamekaze,
    algorithm: 'LB',
    spawnConfig: hollowRect,
    count: {
      col: 5,
      row: 8,
    },
  },
  {
    // 14
    class: EnemyMetaData.chaser,
    algorithm: '',
    spawnConfig: netRect,
    count: {
      col: 4,
      row: 8,
    },
  },
  {
    // 15
    class: EnemyMetaData.kamekaze,
    algorithm: 'HS',
    spawnConfig: netRect,
    count: {
      col: 6,
      row: 8,
    },
  },
  {
    // 16
    class: EnemyMetaData.fighter,
    algorithm: '',
    spawnConfig: hollowRect,
    count: {
      col: 4,
      row: 6,
    },
  },
  {
    // 17
    class: EnemyMetaData.nuker,
    algorithm: 'HC',
    spawnConfig: hollowRect,
    count: {
      col: 3,
      row: 5,
    },
  },
  {
    // 18
    class: EnemyMetaData.chaser,
    algorithm: 'LS',
    spawnConfig: solidRect,
    count: {
      col: 2,
      row: 9,
    },
  },
  {
    // 19
    class: EnemyMetaData.fighter,
    algorithm: 'LB',
    spawnConfig: netRect,
    count: {
      col: 4,
      row: 6,
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
    algorithm: 'LC',
    spawnConfig: netRect,
    count: {
      col: 4,
      row: 8,
    },
  },
  {
    // 22
    class: EnemyMetaData.nuker,
    algorithm: 'LS',
    spawnConfig: netRect,
    count: {
      col: 4,
      row: 7,
    },
  },
  {
    // 23
    class: EnemyMetaData.kamekaze,
    algorithm: 'LB',
    spawnConfig: solidRect,
    count: {
      col: 4,
      row: 6,
    },
  },
  {
    // 24
    class: EnemyMetaData.fighter,
    algorithm: 'LS',
    spawnConfig: solidRect,
    count: {
      col: 3,
      row: 8,
    },
  },
  {
    // 25
    class: EnemyMetaData.chaser,
    algorithm: 'LC',
    spawnConfig: solidRect,
    count: {
      col: 3,
      row: 8,
    },
  },
  {
    // 26
    class: EnemyMetaData.nuker,
    algorithm: 'LB',
    spawnConfig: netRect,
    count: {
      col: 3,
      row: 6,
    },
  },
  {
    // 27
    class: EnemyMetaData.fighter,
    algorithm: 'HS',
    spawnConfig: netRect,
    count: {
      col: 4,
      row: 10,
    },
  },
  {
    // 28
    class: EnemyMetaData.nuker,
    algorithm: 'HC',
    spawnConfig: solidRect,
    count: {
      col: 3,
      row: 7,
    },
  },
  {
    //  29
    class: EnemyMetaData.chaser,
    algorithm: 'LB',
    spawnConfig: solidRect,
    count: {
      col: 3,
      row: 5,
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
