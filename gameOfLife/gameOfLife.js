let boardHTML;
let statusHTML;

const BOARD_WIDTH = 25;
const BOARD_HEIGHT = 25;
const STARTING_ODDS = 0.5;

let gameStarted = false;
let turn = 0;

document.addEventListener('click', () => gameStarted = true);

function startGame() {
    setInterval(updateUI, 100);
}

function updateUI() {

    boardHTML  = document.getElementById("board");
    statusHTML = document.getElementById("status");

    if (boardHTML.rows.length === 0) {
        createBoard();
    }

    updateBoard();
    updateStatus();

}

function createBoard() {

    for(let i = 0; i < BOARD_HEIGHT; i++) {
        let row = boardHTML.insertRow();
        for(let j = 0; j < BOARD_WIDTH; j++) {
            let cell = row.insertCell();
            
            if (Math.random() < STARTING_ODDS) cell.className = 'alive';
            else cell.className = 'black';
        
        }
    }

}

function updateBoard() {

    let changes = [];

    for(let i = 0; i < BOARD_HEIGHT; i++) {

        let rowChanges = [];

        for(let j = 0; j < BOARD_WIDTH; j++) {

            if (isAlive(i, j) && (numAliveCellsAround(i, j) === 2 || numAliveCellsAround(i, j) === 3)) {
                rowChanges.push('alive');
            } else if (!isAlive(i, j) && numAliveCellsAround(i, j) === 3) {
                rowChanges.push('alive');
            } else {
                rowChanges.push('dead');
            }
        
        }

        changes.push(rowChanges);

    }

    for(let i = 0; i < BOARD_HEIGHT; i++) {
        for(let j = 0; j < BOARD_WIDTH; j++) {
            boardHTML.rows[i].cells[j].className = changes[i][j];
        }
    }

}

function updateStatus() {

    let populationSize = 0;

    for(let i = 0; i < BOARD_HEIGHT; i++) {
        for(let j = 0; j < BOARD_WIDTH; j++) {
            if (isAlive(i, j)) populationSize++;
        }
    }

    turn++;
    statusHTML.innerHTML = `turn: ${turn}<br>population: ${populationSize}`;

}

function numAliveCellsAround(i, j) {
    return getSurroundingCoords(i, j).filter(e => isAlive(e[0], e[1])).length;
}

function getSurroundingCoords(i, j) {
    let allPossibleCoords = [[i-1, j-1], [i-1, j], [i-1, j+1], [i, j-1], [i, j+1], [i+1, j-1], [i+1, j], [i+1, j+1]];
    return allPossibleCoords.filter(e => 0 <= e[0] && e[0] <= BOARD_HEIGHT - 1 && 0 <= e[1] && e[1] <= BOARD_WIDTH - 1);
}

function isAlive(i, j) {
    return boardHTML.rows[i].cells[j].className === 'alive';
}