/*Возвращает случайное число от 1 до sum*/
function randomCellNumber(sum) {
  let rand = 1 + Math.random() * sum;
  return Math.floor(rand);
}

/*Возвращает число 2 с вероятностью 90% или число 4 с вероятностью 10%*/
function randomCellValue() {
  const random = Math.random();
  if (random < 0.1) return 4;
  else return 2;
}

export { randomCellNumber, randomCellValue };
