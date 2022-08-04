import { randomCellValue } from "./randomizer.js";
import { randomCellNumber } from "./randomizer.js";

const App = {
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
        null
      ],
      prevTable: []
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
      }
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
        null
      ];
      this.fillCell();
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
          break;
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
          }
          break;
        default:
          return;
      }
    }
  },

  watch: {},

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
  }
};

Vue.createApp(App).mount(".wrapper");
