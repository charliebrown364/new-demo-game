const socket = io();

socket.on('update game', () => {
    updateGame();
});

let turn = 'red';
let clicked = false;
let clickedCell = null;
let winner = null;

const NUM_ROWS = 6;
const NUM_COLS = 7;

document.addEventListener('click', (e) => {
    clickedCell = [
        e.target.parentElement.rowIndex,
        e.target.cellIndex
    ];
});

function updateGame() {

    let boardHTML  = document.getElementById("board");
    let turnHTML   = document.getElementById("turn");
    let statusHTML = document.getElementById("status");

    // make board

    if (boardHTML.rows.length === 0) {

        for(let i = 0; i < NUM_ROWS; i++) {
            let row = boardHTML.insertRow();
    
            for(let j = 0; j < NUM_COLS; j++) {
    
                let cell = row.insertCell();
                cell.className = 'cell';
                cell.style.backgroundColor = 'gray';
    
            }
        }

    }

    // game

    if (clickedCell !== null && winner === null) {

        // board

        for (let j = NUM_ROWS-1; j >= 0; j--) {
            
            cell = boardHTML.rows[j].cells[clickedCell[1]];
            
            if (cell.style.backgroundColor == 'gray') {
                statusHTML.innerHTML = '';
                cell.style.backgroundColor = turn;
                break;
            }

            if (j == 0) {
                statusHTML.innerHTML = 'cannot go there!';
            }

        }

        clickedCell = null;

        // turn

        changeTurn();
        turnHTML.innerHTML = `turn: ${turn}`;

        // winner

        checkForWinner(boardHTML);

        if (winner != null) {
            statusHTML.innerHTML = `${winner} wins!`;
        }

    }

}

function checkForWinner(boardHTML) {

    let cellCombosOf4 = [];

    // horizontal

    for (let i = 0; i < NUM_ROWS; i++) {
        for (let j = 0; j < NUM_COLS - 3; j++) {
            combo = [getCell(boardHTML, i, j), getCell(boardHTML, i, j+1), getCell(boardHTML, i, j+2), getCell(boardHTML, i, j+3)];
            cellCombosOf4.push(combo);
        }
    }

    // vertical
    
    for (let j = 0; j < NUM_COLS; j++) {
        for (let i = 0; i < NUM_ROWS - 3; i++) {
            combo = [getCell(boardHTML, i, j), getCell(boardHTML, i+1, j), getCell(boardHTML, i+2, j), getCell(boardHTML, i+3, j)];
            cellCombosOf4.push(combo);
        }
    }

    // diagonal left to right

    for (let i = 0; i < NUM_ROWS - 3; i++) {
        for (let j = 0; j < NUM_COLS - 3; j++) {
            combo = [getCell(boardHTML, i, j), getCell(boardHTML, i+1, j+1), getCell(boardHTML, i+2, j+2), getCell(boardHTML, i+3, j+3)];
            cellCombosOf4.push(combo);
        }
    }

    // diagonal right to left

    for (let i = 0; i < NUM_ROWS - 3; i++) {
        for (let j = 3; j < NUM_COLS; j++) {
            combo = [getCell(boardHTML, i, j), getCell(boardHTML, i+1, j-1), getCell(boardHTML, i+2, j-2), getCell(boardHTML, i+3, j-3)];
            cellCombosOf4.push(combo);
        }
    }

    for (let combo of cellCombosOf4) {
        if (combo[0].style.backgroundColor != 'gray' &&
            combo[0].style.backgroundColor == combo[1].style.backgroundColor &&
            combo[0].style.backgroundColor == combo[2].style.backgroundColor &&
            combo[0].style.backgroundColor == combo[3].style.backgroundColor &&
            combo[1].style.backgroundColor == combo[2].style.backgroundColor &&
            combo[1].style.backgroundColor == combo[3].style.backgroundColor &&
            combo[2].style.backgroundColor == combo[3].style.backgroundColor) {
                winner = combo[0].style.backgroundColor;
                return;
            }
    }

}

function changeTurn() {
    if (turn == 'red') {
        turn = 'yellow';
    } else {
        turn = 'red';
    }
}

function getCell(boardHTML, rowIndex, cellIndex) {
    return boardHTML.rows[rowIndex].cells[cellIndex];
}