function randomChoice(choices) {
    //This function receives the multiple choices that are left for each specific position and returns randomly one of the choices
    return choices[Math.floor(Math.random() * choices.length)];
}



// TODO use immutable when this is all working
function MakePuzzle() {
    let returnedPuzzle=false;

    while (returnedPuzzle===false) {
        try {
            //gives an iterable array of 9 elements
        const Arr = Array.from(Array(9).keys());
            //gives a matrix i.e an iterable array of 9 arrays with 9 elements
        const puzzle = Arr.map(() => Array.from(Array(9).keys()));
            
            //sets the values for each position of an array* to be an array of values from 1 to 9
            //the array* are rows, columns and squares as all of them have numbers from 1 to 9
        const rows = Arr.map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
        const columns = Arr.map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
        const squares = Arr.map(() => new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]));
        
        
        Arr.forEach((i) => {
            Arr.forEach((j) => {
                    //we run the rows position with i
                const row = rows[i];
                    //and the columns with j
                const column = columns[j];
                    //then each one of the 9 squares position is found depending both in i and j
                let position = 0;
                //0
                if(i<3 && j<3) {
                    position = 0;
                }
                //1
                else if(i<3 && j>=3 && j<6){
                    position = 1;
                }
                //2
                else if(i<3 && j>=6 && j<9){
                    position = 2;
                }
                //3
                else if(i>=3 && i<6 && j<3){
                    position = 3;
                }
                //4
                else if(i>=3 && i<6 && j>=3 && j<6){
                    position = 4;
                }
                //5
                else if(i>=3 && i<6 && j>=6 && j<9){
                    position = 5;
                }
                //6
                else if(i>=6 && i<9 && j<3){
                    position = 6;
                }
                //7
                else if(i>=6 && i<9 && j>=3 && j<6){
                    position = 7;
                }
                //8
                else{
                    position = 8;
                }
                //console.log(`square ${i},${j} ${position}`);
                const square = squares[position];
                    

                const choices = [...row].filter(x => column.has(x)).filter(x => square.has(x));
                
                const choice = randomChoice(choices);
                
                if (!choice) {
                    // eslint-disable-next-line no-throw-literal
                    throw 'dead end';
                }
                
                puzzle[i][j] = choice;
                column.delete(choice);
                row.delete(choice);
                square.delete(choice);
            });
            
        });

        const uncompletedPuzzle = pluck(puzzle,81)

        //console.log(puzzle[0][0]);
        console.log(puzzle);
        return {uncompletedPuzzle: uncompletedPuzzle, completedPuzzle: puzzle};
        } 
        catch (e) {
        //console.count(e);

        // eslint-disable-next-line no-continue
        continue;
        }

        returnedPuzzle=true;
    }
}

function range(n) {
    return Array.from(Array(n).keys());
  }

  /**
 * Answers the question: can the cell (i,j) in the puzzle contain the number
 in cell "c"
 * @param puzzle
 * @param i
 * @param j
 * @param c
 */
function canBeA(puzzle, i, j, c) {
    const x = Math.floor(c / 9);
    const y = c % 9;
    const value = puzzle[x][y];
    if (puzzle[i][j] === value) return true;
    if (puzzle[i][j] > 0) return false;
    // if not the cell itself, and the mth cell of the group contains the value v, then "no"
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const m in Array.from(Array(9).keys())) {
      const rowPeer = { x: m, y: j };
      const columnPeer = { x: i, y: m };
      const SquarePeer = {
        x: (Math.floor(i / 3) * 3) + Math.floor(m / 3),
        y: (Math.floor(j / 3) * 3) + (m % 3),
      };
      if (!(rowPeer.x === x && rowPeer.y === y) && puzzle[rowPeer.x, rowPeer.y] === value) return false;
      if (!(columnPeer.x === x && columnPeer.y === y) && puzzle[columnPeer.x, columnPeer.y] === value) return false;
      if (!(SquarePeer.x === x && SquarePeer.y === y) && puzzle[SquarePeer.x, SquarePeer.y] === value) return false;
    }
    return true;
  }

function pluck(allCells, n = 0) {
    const puzzle = JSON.parse(JSON.stringify(allCells));
    /**
       * starts with a set of all 81 cells, and tries to remove one (randomly) at a time,
       * but not before checking that the cell can still be deduced from the remaining cells.
       * @type {Set}
       */
    const cells = new Set(Array.from(Array(81).keys()));
    const cellsLeft = new Set(cells);
    while (cellsLeft.size && cells.size > n) {
      const cell = randomChoice([...cells]);
      const x = Math.floor(cell / 9);
      const y = cell % 9;
      cellsLeft.delete(cell);
      /**
           * row, column and square record whether another cell in those groups could also take
           * on the value we are trying to pluck. (If another cell can, then we can't use the
           * group to deduce this value.) If all three groups are True, then we cannot pluck
           * this cell and must try another one.
           */
      let row = false;
      let column = false;
      let square = false;
      range(9).forEach((i) => {
        const rowPeer = { x: i, y };
        const columnPeer = { x, y: i };
        const squarePeer = {
          x: (Math.floor(Math.floor(cell / 9) / 3) * 3) + Math.floor(i / 3),
          y: ((Math.floor(cell / 9) % 3) * 3) + (i % 3),
        };
        if (rowPeer.x !== x) {
          row = canBeA(puzzle, rowPeer.x, rowPeer.y, cell);
        }
        if (columnPeer.y !== y) {
          column = canBeA(puzzle, columnPeer.x, columnPeer.y, cell);
        }
        if (squarePeer.x !== x && squarePeer.y !== y) {
          square = canBeA(puzzle, squarePeer.x, squarePeer.y, cell);
        }
      });
      if (row && column && square) {
        // eslint-disable-next-line no-continue
        continue;
      } else {
        // this is a pluckable cell!
        // eslint-disable-next-line no-param-reassign
        puzzle[x][y] = ""; // 0 denotes a blank cell
        /**
               * remove from the set of visible cells (pluck it)
               * we don't need to reset "cellsleft" because if a cell was not pluckable
               * earlier, then it will still not be pluckable now (with less information
               * on the board).
               */
        cells.delete(cell);
      }
    }
    return puzzle;
  }

export default MakePuzzle;