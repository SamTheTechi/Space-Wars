import { solidRect, hollowRect, netRect } from "../algorithms/spawn.Config";
import { EnemyMetaData } from "../meta/enemy";

export const LevelConfiguration = [
  {
    // 1
    class: EnemyMetaData.kamekaze,
    algorithm: "",
    spawnConfig: solidRect,
    count: {
      col: 3,
      row: 6,
    },
  },
  {
    // 2
    class: EnemyMetaData.fighter,
    algorithm: "LC",
    spawnConfig: netRect,
    count: {
      col: 2,
      row: 8,
    },
  },
  {
    // 3
    class: EnemyMetaData.nuker,
    algorithm: "LS",
    spawnConfig: hollowRect,
    count: {
      col: 3,
      row: 6,
    },
  },
  {
    // 4
    class: EnemyMetaData.chaser,
    algorithm: "LC",
    spawnConfig: netRect,
    count: {
      col: 3,
      row: 7,
    },
  },
  {
    // 5
    class: EnemyMetaData.kamekaze,
    algorithm: "LB",
    spawnConfig: solidRect,
    count: {
      col: 4,
      row: 4,
    },
  },
  {
    // 6
    class: EnemyMetaData.fighter,
    algorithm: "LC",
    spawnConfig: solidRect,
    count: {
      col: 2,
      row: 5,
    },
  },
  {
    // 7 fighterboss
    class: EnemyMetaData.fighterBoss,
    algorithm: "HS",
    spawnConfig: netRect,
    count: {
      col: 1,
      row: 6,
    },
  },
  {
    // 8
    class: EnemyMetaData.nuker,
    algorithm: "LS",
    spawnConfig: netRect,
    count: {
      col: 4,
      row: 8,
    },
  },
  {
    // 9
    class: EnemyMetaData.kamekaze,
    algorithm: "LB",
    spawnConfig: hollowRect,
    count: {
      col: 5,
      row: 7,
    },
  },
  {
    // 10
    class: EnemyMetaData.chaser,
    algorithm: "",
    spawnConfig: netRect,
    count: {
      col: 4,
      row: 8,
    },
  },
  {
    // 11
    class: EnemyMetaData.fighter,
    algorithm: "LB",
    spawnConfig: netRect,
    count: {
      col: 5,
      row: 6,
    },
  },
  {
    // 12
    class: EnemyMetaData.chaser,
    algorithm: "LS",
    spawnConfig: solidRect,
    count: {
      col: 2,
      row: 8,
    },
  },
  {
    // 13 crabBoss
    class: EnemyMetaData.crabBoss,
    algorithm: "HB",
    spawnConfig: solidRect,
    count: {
      col: 1,
      row: 2,
    },
  },
  {
    // 14
    class: EnemyMetaData.chaser,
    algorithm: "LC",
    spawnConfig: netRect,
    count: {
      col: 4,
      row: 8,
    },
  },
  {
    // 15
    class: EnemyMetaData.nuker,
    algorithm: "LS",
    spawnConfig: netRect,
    count: {
      col: 4,
      row: 7,
    },
  },
  {
    // 16
    class: EnemyMetaData.kamekaze,
    algorithm: "LB",
    spawnConfig: solidRect,
    count: {
      col: 4,
      row: 6,
    },
  },
  {
    // 17
    class: EnemyMetaData.fighter,
    algorithm: "LS",
    spawnConfig: solidRect,
    count: {
      col: 3,
      row: 8,
    },
  },
  {
    // 18
    class: EnemyMetaData.nuker,
    algorithm: "LB",
    spawnConfig: netRect,
    count: {
      col: 3,
      row: 5,
    },
  },
  {
    //  19
    class: EnemyMetaData.chaser,
    algorithm: "LB",
    spawnConfig: solidRect,
    count: {
      col: 3,
      row: 5,
    },
  },
  {
    // 20
    class: EnemyMetaData.gunShip,
    algorithm: "HC",
    spawnConfig: solidRect,
    count: {
      col: 1,
      row: 1,
    },
  },
  {
    class: "",
    algorithm: "",
    spawnConfig: "",
    count: {
      col: 1,
      row: 6,
    },
  },
];
