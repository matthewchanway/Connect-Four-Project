

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const width = 7;
const height = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(let i = 0; i < height ; i++){
    board.push([]);
    for(let j = 0; j < width ; j++){
        board[i].push(null)}}
return board;

}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const board = document.getElementById('board');
  

  // TODO: add comment for this code // Creates the top row by creating a table row element, giving it an ID of column-top
  // adds a click event listener. Upon click, we will call the handleClick function. The for loop is going to run proportionate
  // to the width variable, on each iteration creating a table cell, giving it a unique ID in relation to the loop iteration.
  // The cell is appended to the top variable, and the top variable is appended to the board.
  let top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < width; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  board.append(top);

  // TODO: add comment for this code // Runs a for loop proportionate to height variable, on each iteration creating a table row element, assigning
  // it to a variable called row. There is a nested for loop that runs proportionate to height variable, that on each iteration creates a table cell.
  // assigns it to a cell variable with an id of y-x, for example row 0 cell 0, or row 0 cell 1. The cell is appended to the row, and the row to the board.
  for (let y = 0; y < height; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < width; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for(let i = board.length -1 ; i >= 0 ; i--){
    if(board[i][x] === null){
      return i
    }
  }return null
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
let newDiv = document.createElement("div");
newDiv.classList.add('piece');
newDiv.classList.add(`p${currPlayer}`);
 let placement = document.getElementById(`${y}-${x}`);
 placement.append(newDiv);

}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;
  
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(board.every(function(val){
    return val.every(function(a){
     return a !== null;})
  })){return endGame('tie game!')}

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < height &&
        x >= 0 &&
        x < width &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
