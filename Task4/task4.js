// Боевой маг Евстафий сражается с лютым монстром.

// Бой идет по ходам. Каждый ход компьютер (Лютый) случайно выбирает одно из доступных действий
// и сообщает, что он собирается делать.
// В ответ на это игрок (Евстафий) должен выбрать свое действие.

// После происходит взаимное нанесение урона. Магическая броня блокирует магический урон,
// физическая броня блокирует физический урон.

// После совершения действия, оно не может быть повторно выбрано в течение cooldown ходов

// Бой идет до победы одного из противников.

// Перед началом боя игрок выбирает сложность (начальное здоровье Евстафия)

// ЛЮТЫЙ МОНСТР (Монстр описывается таким объектом):

const readlineSync = require("readline-sync");

const monster = {
  maxHealth: 10,
  name: "Лютый",
  moves: [
    {
      name: "Удар когтистой лапой",
      physicalDmg: 3, // физический урон
      magicDmg: 0, // магический урон
      physicArmorPercents: 20, // физическая броня
      magicArmorPercents: 20, // магическая броня
      cooldown: 0, // ходов на восстановление
      reloading: 0,
    },
    {
      name: "Огненное дыхание",
      physicalDmg: 0,
      magicDmg: 4,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
      reloading: 0,
    },
    {
      name: "Удар хвостом",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 50,
      magicArmorPercents: 0,
      cooldown: 2,
      reloading: 0,
    },
  ],
};

// БОЕВОЙ МАГ ЕВСТАФИЙ (Боевой маг Евстафий способен на следующее):
const battleMage = {
  maxHealth: null,
  name: "Евстафий",
  moves: [
    {
      name: "Удар боевым кадилом",
      physicalDmg: 2,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 50,
      cooldown: 0,
      reloading: 0,
    },
    {
      name: "Вертушка левой пяткой",
      physicalDmg: 4,
      magicDmg: 0,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 4,
      reloading: 0,
    },
    {
      name: "Каноничный фаербол",
      physicalDmg: 0,
      magicDmg: 5,
      physicArmorPercents: 0,
      magicArmorPercents: 0,
      cooldown: 3,
      reloading: 0,
    },
    {
      name: "Магический блок",
      physicalDmg: 0,
      magicDmg: 0,
      physicArmorPercents: 100,
      magicArmorPercents: 100,
      cooldown: 4,
      reloading: 0,
    },
  ],
};

while (true) {
  const startingHealthBattleMage = readlineSync.question(
    "Выберите сложность - начальное здоровье боевого мага Евстафия. Сложность может быть: 5, 10 или 15 "
  );
  if (+startingHealthBattleMage === 5) {
    battleMage.maxHealth = 5;
    break;
  } else if (+startingHealthBattleMage === 10) {
    battleMage.maxHealth = 10;
    break;
  } else if (+startingHealthBattleMage === 15) {
    battleMage.maxHealth = 15;
    break;
  } else {
    console.log(
      "Вы выбрали неверное значение! Введите значение равное 5, 10 или 15!"
    );
  }
}
while (battleMage.maxHealth > 0 && monster.maxHealth) {
  monster.moves.forEach((moves) => {
    if (moves.reloading > 0) {
      moves.reloading -= 1;
    }
  });

  const filterMonsterMoves = monster.moves.filter((moves) => {
    return moves.reloading === 0;
  });

  const monsterMoves =
    filterMonsterMoves[Math.floor(Math.random() * filterMonsterMoves.length)];

  monsterMoves.reloading = monsterMoves.cooldown;

  console.log(`Монстр Лютый - "Сейчас я применю ${monsterMoves.name}".`);

  battleMage.moves.forEach((moves) => {
    if (moves.reloading > 0) {
      moves.reloading -= 1;
    }
  });
  const filterBattleMageMoves = battleMage.moves.filter(
    (moves) => moves.reloading === 0
  );

  console.log(`Боевые навыки мага Евстафия:`);
  filterBattleMageMoves.forEach((moves, i) => {
    console.log(`${i + 1}. ${moves.name} `);
  });

  let battleMageMoves = null;
  while (true) {
    const battleMageChoiceMoves = readlineSync.question(
      "Выберите действие Евстафия: "
    );
    if (
      +battleMageChoiceMoves <= filterBattleMageMoves.length &&
      +battleMageChoiceMoves > 0
    ) {
      if (battleMageChoiceMoves === "1") {
        battleMageMoves = filterBattleMageMoves[0];
        break;
      } else if (battleMageChoiceMoves === "2") {
        battleMageMoves = filterBattleMageMoves[1];
        break;
      } else if (battleMageChoiceMoves === "3") {
        battleMageMoves = filterBattleMageMoves[2];
        break;
      } else if (battleMageChoiceMoves === "4") {
        battleMageMoves = filterBattleMageMoves[3];
        break;
      }
    }
    {
      console.log("Вы выбрали неверное значение!");
    }
  }

  battleMageMoves.reloading = battleMageMoves.cooldown;

  monster.maxHealth =
    monster.maxHealth -
    battleMageMoves.physicalDmg +
    (monsterMoves.physicArmorPercents * battleMageMoves.physicalDmg) / 100 -
    battleMageMoves.magicDmg +
    (monsterMoves.magicArmorPercents * battleMageMoves.magicDmg) / 100;

  battleMage.maxHealth =
    battleMage.maxHealth -
    monsterMoves.physicalDmg +
    (battleMageMoves.physicArmorPercents * monsterMoves.physicalDmg) / 100 -
    monsterMoves.magicDmg +
    (battleMageMoves.magicArmorPercents * monsterMoves.magicDmg) / 100;

  if (monster.maxHealth > 0 && battleMage.maxHealth > 0) {
    console.log(
      `Оставшееся здоровье Евстафия: ${battleMage.maxHealth}. Оставшееся здоровье Лютого: ${monster.maxHealth}.`
    );
  } else if (monster.maxHealth <= 0 && battleMage.maxHealth <= 0) {
    console.log("Результат боя: Ничья.");
  } else if (monster.maxHealth > 0 && battleMage.maxHealth <= 0) {
    console.log("Результат боя: Победу одержал монстр Лютый.");
  } else {
    console.log("Результат боя: Победу одержал боевой маг Евстафий.");
  }
}
