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
    /*Заполняет клетку 2 или 4*/
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

    moveOneCell(a, b, c, d) {},

    moveTwoCell(cell1, cell2, cell3, cell4) {},

    moveThreeCell(cell1, cell2, cell3, cell4) {},

    moveFourCell(cell1, cell2, cell3, cell4) {},

    moveCells(a, b, c, d) {
      const valueA = this.table[a];
      const valueB = this.table[b];
      const valueC = this.table[c];
      const valueD = this.table[d];
      const idxArray = [a, b, c, d];
      if ([valueA, valueB, valueC, valueD].length === 0) {
        return;
      }
      /*Если 1 значение в строке*/
      if (
        [valueA, valueB, valueC, valueD].filter((val) => val !== null)
          .length === 1
      ) {
        if (this.table[d] !== null) return;

        const cellValue = [valueA, valueB, valueC, valueD].filter(
          (val) => val !== null
        );

        const deleteIndex = [valueA, valueB, valueC, valueD].findIndex(
          (val) => val !== null
        );

        this.table.splice(d, 1, Number(cellValue));

        this.table.splice(idxArray[deleteIndex], 1, null);
      }

      /*Если 2 значения в строке*/
      if (
        [valueA, valueB, valueC, valueD].filter((val) => val !== null)
          .length === 2
      ) {
        const fullCells = [valueA, valueB, valueC, valueD].filter(
          (val) => val !== null
        );
        if (fullCells[0] === fullCells[1]) {
          this.table.splice(d, 1, fullCells[0] * 2);
          this.table.splice(a, 1, null);
          this.table.splice(b, 1, null);
          this.table.splice(c, 1, null);
        } else {
          this.table.splice(d, 1, fullCells[1]);
          this.table.splice(c, 1, fullCells[0]);
          this.table.splice(a, 1, null);
          this.table.splice(b, 1, null);
        }
      }

      /*Если 3 значения в строке*/
      if (
        [this.table[a], this.table[b], this.table[c], this.table[d]].filter(
          (val) => val !== null
        ).length === 3
      ) {
        const fullCells = [valueA, valueB, valueC, valueD].filter(
          (val) => val !== null
        );
        if (fullCells[1] === fullCells[2]) {
          this.table.splice(d, 1, fullCells[2] * 2);
          this.table.splice(c, 1, fullCells[0]);
          this.table.splice(a, 1, null);
          this.table.splice(b, 1, null);
          return;
        }
        if (fullCells[0] === fullCells[1]) {
          this.table.splice(d, 1, fullCells[2]);
          this.table.splice(c, 1, fullCells[0] * 2);
          this.table.splice(a, 1, null);
          this.table.splice(b, 1, null);
        }
        if (fullCells[0] !== fullCells[1] && fullCells[1] !== fullCells[2]) {
          this.table.splice(d, 1, fullCells[2]);
          this.table.splice(c, 1, fullCells[1]);
          this.table.splice(b, 1, fullCells[0]);
          this.table.splice(a, 1, null);
        }
      }

      /*Если 4 значения в строке*/
      if (
        [this.table[a], this.table[b], this.table[c], this.table[d]].filter(
          (val) => val !== null
        ).length === 4
      ) {
        if (valueA !== valueB && valueB !== valueC && valueC !== valueD) return;

        if (valueD === valueC && valueA !== valueB) {
          this.table.splice(d, 1, valueD * 2);
          this.table.splice(c, 1, valueB);
          this.table.splice(b, 1, valueA);
          this.table.splice(a, 1, null);
        }
        if (valueD === valueC && valueA === valueB) {
          this.table.splice(d, 1, valueD * 2);
          this.table.splice(c, 1, valueB * 2);
          this.table.splice(b, 1, null);
          this.table.splice(a, 1, null);
        }
        if (valueD !== valueC && valueA === valueB && valueB !== valueC) {
          this.table.splice(b, 1, valueB * 2);
          this.table.splice(a, 1, null);
        }
        if (valueD !== valueC && valueA === valueB && valueB === valueC) {
          this.table.splice(c, 1, valueC * 2);
          this.table.splice(b, 1, valueA);
          this.table.splice(a, 1, null);
        }
        if (valueA !== valueB && valueC !== valueD && valueB === valueC) {
          this.table.splice(c, 1, valueB * 2);
          this.table.splice(b, 1, valueA);
          this.table.splice(a, 1, null);
        }
      }
    },

    putLeft() {
      this.fillCell(16);
    },

    putUp() {},

    putRigth() {}
  },

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
