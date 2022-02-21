const socket = io();

socket.on('update game', () => {
    updateUI();
});

let boardHTML;
let turnHTML;
let statusHTML;

let turn = 'red';
let clickedCellIndex = false;
let winner = false;

document.addEventListener('click', (e) => clickedCellIndex = e.target.cellIndex);

function updateUI() {

    boardHTML  = document.getElementById("board");
    turnHTML   = document.getElementById("turn");
    statusHTML = document.getElementById("status");

    if (boardHTML.rows.length === 0) { createBoard(); }
    if (winner) { return; }

    if (clickedCellIndex !== false) {
        updateBoard();
        changeTurn();
        checkForWinner();
        clickedCellIndex = false;
    }

}

function createBoard() {

    for(let i = 0; i < 6; i++) {
        let row = boardHTML.insertRow();

        for(let j = 0; j < 7; j++) {

            let cell = row.insertCell();
            cell.className = 'cell';
            cell.style.backgroundColor = 'gray';

        }
    }

}

function updateBoard() {
    
    for (let j = 5; j >= 0; j--) {
        
        cell = boardHTML.rows[j].cells[clickedCellIndex];
        
        if (cell.style.backgroundColor == 'gray') {
            statusHTML.innerHTML = '';
            cell.style.backgroundColor = turn;
            break;
        }

        if (j == 0) { statusHTML.innerHTML = 'cannot go there!'; }

    }

}

function checkForWinner() {

    let cellCombosOf4 = [];

    // horizontal

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            combo = [getCell(i, j), getCell(i, j+1), getCell(i, j+2), getCell(i, j+3)];
            cellCombosOf4.push(combo);
        }
    }

    // vertical
    
    for (let j = 0; j < 7; j++) {
        for (let i = 0; i < 3; i++) {
            combo = [getCell(i, j), getCell(i+1, j), getCell(i+2, j), getCell(i+3, j)];
            cellCombosOf4.push(combo);
        }
    }

    // diagonal left to right

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 4; j++) {
            combo = [getCell(i, j), getCell(i+1, j+1), getCell(i+2, j+2), getCell(i+3, j+3)];
            cellCombosOf4.push(combo);
        }
    }

    // diagonal right to left

    for (let i = 0; i < 3; i++) {
        for (let j = 3; j < 7; j++) {
            combo = [getCell(i, j), getCell(i+1, j-1), getCell(i+2, j-2), getCell(i+3, j-3)];
            cellCombosOf4.push(combo);
        }
    }

    for (let combo of cellCombosOf4) {

        const c0 = combo[0].style.backgroundColor;
        const c1 = combo[1].style.backgroundColor;
        const c2 = combo[2].style.backgroundColor;
        const c3 = combo[3].style.backgroundColor;

        if (c0 != 'gray' && c0 === c1 && c0 === c2 && c0 === c3 && c1 === c2 && c1 === c3 && c2 === c3) {
            winner = c0;
            break;
        }
    }

    if (winner) {
        statusHTML.innerHTML = `${winner} wins!`;
    }

}

function changeTurn() {

    if (turn == 'red') {
        turn = 'yellow';
    } else {
        turn = 'red';
    }
    
    turnHTML.innerHTML = `turn: ${turn}`;

}

function getCell(rowIndex, cellIndex) {
    return boardHTML.rows[rowIndex].cells[cellIndex];
}