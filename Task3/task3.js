// Компьютер загадывает число из нескольких различающихся цифр (от 3 до 6).
// Игроку дается несколько попыток на то, чтобы угадать это число.
// После каждой попытки компьютер сообщает количество совпавших цифр стоящих не на своих местах,
// а также количество правильных цифр на своих местах.
// Например загаданное число: 56478 предположение игрока: 52976
// ответ: совпавших цифр не на своих местах - 1 (6), цифр на своих местах - 2 (5 и 7)
// игра ведется до окончания количества ходов либо до отгадывания

const readlineSync = require("readline-sync");

const numberOfComp = readlineSync.question(
  "Число из скольки цифр должен загадать Вам компьютер? Он может загадать число от 3 до 6 цифр."
);

const numberComp = (num) => {
  const compNambers = [];
  for (; compNambers.length < num; ) {
    let randomElement = Math.floor(Math.random() * 10);
    if (!compNambers.includes(randomElement)) {
      compNambers.push(randomElement);
    }
  }
  return compNambers.join("");
};
const comp = numberComp(+numberOfComp);
console.log(comp);

const compareNumbers = (num1) => {
  let numberOfAttempts = 15;
  let numbersInPlace = 0;
  let numbersOutPlace = 0;
  while (numberOfAttempts) {
    const numberPlayer = readlineSync.question("Введите Ваше число: ");
    for (let i = 0; i < numberPlayer.length; i++) {
      if (num1.indexOf(numberPlayer[i]) === i) {
        numbersInPlace += 1;
      } else if (num1.indexOf(numberPlayer[i]) !== -1) {
        numbersOutPlace += 1;
      }
    }
    numberOfAttempts -= 1;

    if (num1 === numberPlayer) {
      return (result = `Вы угадали!`);
    } else if (numberOfAttempts === 0) {
      return (result = `Вы проиграли!`);
    } else {
      console.log(`Cовпавших цифр не на своих местах - ${numbersOutPlace}, 
цифр на своих местах - ${numbersInPlace}. 
У Вас осталось ${numberOfAttempts} попыток.`);
      console.log("Следующая попытка:");
    }
  }
};

console.log(compareNumbers(comp));
