<template>
  <remove-message
    v-on:reboot-game="rebootGame()"
    v-on:continue-game="this.hasRemoveMessage = false"
    v-if="hasRemoveMessage"
  />

  <win-message
    v-if="hasWinMessage"
    v-on:reboot-game="rebootGame()"
    v-on:continue-game="continueGame()"
  />

  <div class="wrapper">
    <h1 class="title">2048</h1>
    <div class="management">
      <button v-on:click="stepBack" class="managment__back button"></button>
      <button
        v-on:click="this.hasRemoveMessage = true"
        class="managment__reboot button"
      ></button>
    </div>
    <div class="score">
      <div class="score__item">Score: {{ score }}</div>
    </div>
    <div class="game">
      <div class="game__table">
        <div
          v-bind:class="{
            value2: cell === 2,
            value4: cell === 4,
            value8: cell === 8,
            value16: cell === 16,
            value32: cell === 32,
            value64: cell === 64,
            value128: cell === 128,
            value256: cell === 256,
            value512: cell === 512,
            value1024: cell === 1024,
            value2048: cell === 2048,
          }"
          v-for="(cell, idx) in table"
          :key="idx"
          class="game__cell"
        >
          {{ cell }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { randomCellValue } from "./randomizer.js";
import { randomCellNumber } from "./randomizer.js";

import RemoveMessage from "/src/components/RemoveMessage.vue";
import WinMessage from "/src/components/WinMessage.vue";

export default {
  components: {
    RemoveMessage,
    WinMessage,
  },

  data() {
    return {
      table: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      prevTable: [],

      score: 0,
      prevScore: null,

      hasRemoveMessage: false,

      hasWinMessage: false,
      wasPressedContinue: false,
    };
  },

  methods: {
    /*Заполняет пустую клетку 2 или 4*/
    fillCell() {
      const nullIndexes = [];
      this.table.forEach((value, idx) => {
        if (value === null) {
          nullIndexes.push(idx);
        }
      });
      if (nullIndexes.length === []) return;

      this.table[
        nullIndexes[randomCellNumber(nullIndexes.length) - 1]
      ] = randomCellValue();
    },

    stepBack() {
      if (this.prevTable.length > 0) {
        this.table = this.prevTable;
        this.score = this.prevScore
      }
    },

    raiseScore(value) {
      this.prevScore = this.score;
      this.score += value;
    },

    showWinMessage() {
      if (this.table.includes(2048) && !this.wasPressedContinue) {
        this.hasWinMessage = true;
      }
    },

    continueGame() {
      this.wasPressedContinue = true;
      this.hasWinMessage = false;
    },

    rebootGame() {
      this.table = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      this.fillCell();
      this.score = 0;
      this.hasRemoveMessage = false;
      this.hasWinMessage = false;
    },

    /*Изменяет каждое значение в ряду по индексу на необходимое*/
    changeRow(idxA, idxB, idxC, idxD, newValA, newValB, newValC, newValD) {
      this.table.splice(idxA, 1, newValA);
      this.table.splice(idxB, 1, newValB);
      this.table.splice(idxC, 1, newValC);
      this.table.splice(idxD, 1, newValD);
    },

    moveCells(idxA, idxB, idxC, idxD) {
      const valueA = this.table[idxA];
      const valueB = this.table[idxB];
      const valueC = this.table[idxC];
      const valueD = this.table[idxD];

      const fullCells = [valueA, valueB, valueC, valueD].filter(
        (val) => val !== null
      );

      switch (fullCells.length) {
        case 0:
          return;

        case 1:
          this.changeRow(
            idxA,
            idxB,
            idxC,
            idxD,
            null,
            null,
            null,
            fullCells[0]
          );
          break;

        case 2:
          if (fullCells[0] === fullCells[1]) {
            this.changeRow(
              idxA,
              idxB,
              idxC,
              idxD,
              null,
              null,
              null,
              fullCells[0] * 2
            );
            this.raiseScore(fullCells[0] * 2);
          } else {
            this.changeRow(
              idxA,
              idxB,
              idxC,
              idxD,
              null,
              null,
              fullCells[0],
              fullCells[1]
            );
          }
          break;

        case 3:
          if (fullCells[1] === fullCells[2]) {
            this.changeRow(
              idxA,
              idxB,
              idxC,
              idxD,
              null,
              null,
              fullCells[0],
              fullCells[2] * 2
            );
            this.raiseScore(fullCells[2] * 2);
            return;
          }
          if (fullCells[0] === fullCells[1]) {
            this.changeRow(
              idxA,
              idxB,
              idxC,
              idxD,
              null,
              null,
              fullCells[0] * 2,
              fullCells[2]
            );
            this.raiseScore(fullCells[0] * 2);
          }
          if (fullCells[0] !== fullCells[1] && fullCells[1] !== fullCells[2]) {
            this.changeRow(
              idxA,
              idxB,
              idxC,
              idxD,
              null,
              fullCells[0],
              fullCells[1],
              fullCells[2]
            );
          }
          break;

        case 4:
          if (valueA !== valueB && valueB !== valueC && valueC !== valueD)
            return;

          if (valueD === valueC && valueA !== valueB) {
            this.changeRow(
              idxA,
              idxB,
              idxC,
              idxD,
              null,
              valueA,
              valueB,
              valueD * 2
            );
            this.raiseScore(valueD * 2);
          }
          if (valueD === valueC && valueA === valueB) {
            this.changeRow(
              idxA,
              idxB,
              idxC,
              idxD,
              null,
              null,
              valueB * 2,
              valueD * 2
            );
            this.raiseScore(valueB * 2);
            this.raiseScore(valueD * 2);
          }
          if (valueD !== valueC && valueA === valueB && valueB !== valueC) {
            this.changeRow(
              idxA,
              idxB,
              idxC,
              idxD,
              null,
              valueB * 2,
              valueC,
              valueD
            );
            this.raiseScore(valueB * 2);
          }
          if (valueD !== valueC && valueA === valueB && valueB === valueC) {
            this.changeRow(
              idxA,
              idxB,
              idxC,
              idxD,
              null,
              valueA,
              valueC * 2,
              valueD
            );
            this.raiseScore(valueC * 2);
          }
          if (valueA !== valueB && valueC !== valueD && valueB === valueC) {
            this.changeRow(
              idxA,
              idxB,
              idxC,
              idxD,
              null,
              valueA,
              valueB * 2,
              valueD
            );
            this.raiseScore(valueB * 2);
          }
          break;
        default:
          return;
      }
    },
  },

  watch: {},
  created() {},

  mounted() {
    this.fillCell(16);
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowDown":
          this.prevTable = this.table.concat();
          this.moveCells(0, 4, 8, 12);
          this.moveCells(1, 5, 9, 13);
          this.moveCells(2, 6, 10, 14);
          this.moveCells(3, 7, 11, 15);
          this.showWinMessage();

          if (
            !(JSON.stringify(this.prevTable) === JSON.stringify(this.table))
          ) {
            this.fillCell();
          }
          break;
        case "ArrowLeft":
          this.prevTable = this.table.concat();
          this.moveCells(3, 2, 1, 0);
          this.moveCells(7, 6, 5, 4);
          this.moveCells(11, 10, 9, 8);
          this.moveCells(15, 14, 13, 12);
          this.showWinMessage();
          if (
            !(JSON.stringify(this.prevTable) === JSON.stringify(this.table))
          ) {
            this.fillCell();
          }
          break;
        case "ArrowUp":
          this.prevTable = this.table.concat();
          this.moveCells(12, 8, 4, 0);
          this.moveCells(13, 9, 5, 1);
          this.moveCells(14, 10, 6, 2);
          this.moveCells(15, 11, 7, 3);
          this.showWinMessage();
          if (
            !(JSON.stringify(this.prevTable) === JSON.stringify(this.table))
          ) {
            this.fillCell();
          }
          break;
        case "ArrowRight":
          this.prevTable = this.table.concat();
          this.moveCells(0, 1, 2, 3);
          this.moveCells(4, 5, 6, 7);
          this.moveCells(8, 9, 10, 11);
          this.moveCells(12, 13, 14, 15);
          this.showWinMessage();
          if (
            !(JSON.stringify(this.prevTable) === JSON.stringify(this.table))
          ) {
            this.fillCell();
          }
          break;
        default:
          return;
      }
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&display=swap");
/* Указываем box sizing */
*, *: : before,
  *: : after {
  box-sizing: border-box;
}

/* Убираем внутренние отступы */
ul[class],
ol[class] {
  padding: 0;
}

/* Убираем внешние отступы */
body,
h1,
h2,
h3,
h4,
p,
ul[class],
ol[class],
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

/* Выставляем основные настройки по-умолчанию для body */
body {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

/* Удаляем стандартную стилизацию для всех ul и il, у которых есть атрибут class*/
ul[class],
ol[class] {
  list-style: none;
}

/* Элементы a, у которых нет класса, сбрасываем до дефолтных стилей */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Упрощаем работу с изображениями */
img {
  max-width: 100%;
  display: block;
}

/* Указываем понятную периодичность в потоке данных у article*/
article > * + * {
  margin-top: 1em;
}

/* Наследуем шрифты для инпутов и кнопок */
input,
button,
textarea,
select {
  font: inherit;
}

/* Удаляем все анимации и переходы для людей, которые предпочитай их не использовать */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

.wrapper {
  margin: 0 auto;
  max-width: 1080px;
  padding: 0px 15px;
  overflow: hidden;
  min-height: 100%;
  font-family: "DM Sans", sans-serif;
}

.title {
  font-size: 4em;
  text-align: center;
}

.management {
  display: flex;
  justify-content: center;
  margin: 0 0 15px 0;
}

.score {
  display: flex;
  justify-content: center;
}

.score__item {
  width: 653px;
  margin: 0 0 15px 0;
  font-size: 20px;
}

.managment__back {
  background: url("../public/img/icons/back.png") 50% 50% no-repeat;
  margin: 0 20px 0 0;
}

.managment__back:hover {
  background-color: #9e9d9d;
  border-radius: 0.5em;
  transition-duration: 0.5s;
}

.managment__reboot {
  background: url("../public/img/icons/reboot.png") 50% 50% no-repeat;
}

.managment__reboot:hover {
  background-color: #9e9d9d;
  border-radius: 0.5em;
  transition-duration: 0.5s;
}

.button {
  background-size: contain;
  width: 50px;
  height: 50px;
  border: 0px;
  cursor: pointer;
}

.game {
  display: flex;
  justify-content: center;
}

.game__table {
  display: grid;
  grid-template-columns: repeat(4, 150px);
  grid-template-rows: repeat(4, 150px);
  grid-gap: 10px;
  border: 1px solid black;
  padding: 10px;
  background-color: #4a4444;
  border-radius: 1rem;
}

.game__cell {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  border: 1px solid black;
  background-color: #9e9d9d;
  border-radius: 1rem;
}

/*Значения*/

.value2 {
  background-color: #fffafa;
}
.value4 {
  background-color: #fcf9d7;
}
.value8 {
  background-color: #e1b55d;
}
.value16 {
  background-color: #db9442;
}
.value32 {
  background-color: #f24713;
}
.value64 {
  background-color: #eb2121;
}
.value128 {
  background-color: #f2ff66;
}
.value256 {
  background-color: #e5f53b;
}
.value512 {
  background-color: #8e9914;
}
.value1024 {
  background-color: #636b09;
}
.value2048 {
  background-color: #690404;
}

.message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
}
</style>