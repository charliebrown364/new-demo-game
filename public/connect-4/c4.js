const socket = io();

socket.on('update game', () => {
    updateUI();
});

let turn = 'red';
let clicked = false;
let mouseX = null;
let mouseY = null;
let winner = 'none';

const NUM_ROWS = 6;
const NUM_COLS = 7;

document.addEventListener('click', (e) => {
    mouseX = e.x
    mouseY = e.y;
    clicked = true;
});

function updateUI() {

    const boardHTML  = document.getElementById("board");
    const turnHTML   = document.getElementById("turn");
    const statusHTML = document.getElementById("status");

    // make board

    if (boardHTML.rows.length === 0) {

        for(let i = 0; i < NUM_ROWS; i++) {
            let row = boardHTML.insertRow();

            for(let j = 0; j < NUM_COLS; j++) {

                let cell = row.insertCell();
                cell.className = 'tile';
                cell.style.backgroundColor = 'gray';

            }
        }

    }

    // game

    if (clicked && (winner === 'none')) {

        clicked = false;

        // board

        selectedColumn = getColumn(boardHTML);

        for (let j = NUM_ROWS-1; j >= 0; j--) {
            
            cell = boardHTML.rows[j].cells[selectedColumn];
            
            if (cell.style.backgroundColor == 'gray') {
                statusHTML.innerHTML = '';
                cell.style.backgroundColor = turn;
                break;
            }

            if (j == 0) {
                statusHTML.innerHTML = 'cannot go there!';
            }

        }

        // turn

        changeTurn();
        turnHTML.innerHTML = `turn: ${turn}`;

        // winner

        checkForWinner(boardHTML);

        if (winner != 'none') {
            statusHTML.innerHTML = `winner! ${winner}`;
        }

    }

}

function getColumn(boardHTML) {
    
    let boardHTMLPos = boardHTML.getBoundingClientRect();
    let cellPos = boardHTML.rows[0].cells[0].getBoundingClientRect();

    for (let i = 0; i < NUM_COLS; i++) {
        let cellLeftX = boardHTMLPos.x + i * cellPos.width;
        if (cellLeftX <= mouseX && mouseX < cellLeftX + cellPos.width + 2*i + 4) {
            return i;
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

function sameColorCells(cell1, cell2) {
    return cell1.style.backgroundColor == cell2.style.backgroundColor;
}

function getCell(boardHTML, rowIndex, cellIndex) {
    return boardHTML.rows[rowIndex].cells[cellIndex];
}