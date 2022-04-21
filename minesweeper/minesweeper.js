let boardHTML  = document.getElementById("board");
let statusHTML = document.getElementById("status");

let gameOver = false;
let clickedSquare = null;

const BOARD_SIZE = 10;
const NUM_MINES = 10;

function startGame() {
    setInterval(updateUI, 50);
}

function updateUI() {

    boardHTML  = document.getElementById("board");
    statusHTML = document.getElementById("status");

    if (boardHTML.rows.length === 0) {
        createBoard();
        createEventListeners();
        fillBoard();
    }

    if (gameOver) { return; }
    if (!clickedSquare) { return; }

    clickedSquare = false;

}

function createBoard() {

    for(let i = 0; i < BOARD_SIZE; i++) {
        let row = boardHTML.insertRow();
        for(let j = 0; j < BOARD_SIZE; j++) {
            let square = row.insertCell();
            square.className = 'square';
            square.innerHTML = '';
        }
    }

}

function createEventListeners() {

    boardHTML.addEventListener('click', e => {
        clickedSquare = [
            e.target.parentElement.rowIndex,
            e.target.cellIndex
        ];
    });

    boardHTML.addEventListener('contextmenu', e => {
        e.preventDefault();
        clickedSquare = [
            e.target.parentElement.rowIndex,
            e.target.cellIndex
        ];
    });

}

function fillBoard() {

    for (let i = 0; i < NUM_MINES; i++) {
        let mineX = randomInteger(0, 9);
        let mineY = randomInteger(0, 9);
        let square = boardHTML.rows[mineY].cells[mineX];
        square.className = 'mine';
    }

    for(let i = 0; i < BOARD_SIZE; i++) {
        for(let j = 0; j < BOARD_SIZE; j++) {

            if (boardHTML.rows[i].cells[j].className != 'mine') {
                boardHTML.rows[i].cells[j].innerHTML = numMinesAround(i, j);
            }

        }
    }

}

function numMinesAround(i, j) {

    let isASquare = (a, b) => boardHTML.rows[a].cells[b].className == 'mine';

    let bools = [
        i != 0              && j != 0              && isASquare(i-1, j-1),
        i != 0                                     && isASquare(i-1, j),
        i != 0              && j != BOARD_SIZE - 1 && isASquare(i-1, j+1),
                               j != 0              && isASquare(i, j-1),
                               j != BOARD_SIZE - 1 && isASquare(i, j+1),
        i != BOARD_SIZE - 1 && j != 0              && isASquare(i+1, j-1),
        i != BOARD_SIZE - 1                        && isASquare(i+1, j),
        i != BOARD_SIZE - 1 && j != BOARD_SIZE - 1 && isASquare(i+1, j+1)
    ]

    return bools.filter((elem) => elem).length;

}

function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}