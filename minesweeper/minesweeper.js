let boardHTML  = document.getElementById("board");
let statusHTML = document.getElementById("status");

const BOARD_SIZE = 10;
const NUM_MINES = 10;

let gameOver = false;

let clickedSquare = {
    type: null,
    x: null,
    y: null
};

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

    switch (clickedSquare.type) {
        case null: return;
        case 'left': revealSquare();
        case 'right': flagMine();
    }

    checkForWinner();

    clickedSquare.type = null;

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
        clickedSquare.type = 'left';
        clickedSquare.x = e.target.parentElement.rowIndex;
        clickedSquare.y = e.target.cellIndex;
    });

    boardHTML.addEventListener('contextmenu', e => {
        e.preventDefault();
        clickedSquare.type = 'right';
        clickedSquare.x = e.target.parentElement.rowIndex;
        clickedSquare.y = e.target.cellIndex;
    });

}

function fillBoard() {

    for(let i = 0; i < BOARD_SIZE; i++) {
        for(let j = 0; j < BOARD_SIZE; j++) {
            boardHTML.rows[i].cells[j].classList.add('hidden');
        }
    }

    let numMinesPlaced = 0;

    while (numMinesPlaced < NUM_MINES) {

        let mineX = randomInteger(0, 9);
        let mineY = randomInteger(0, 9);
        let square = boardHTML.rows[mineY].cells[mineX];

        if (!square.classList.contains('mine')) {
            square.classList.add('mine');
            numMinesPlaced++;
        }

    }

}

function revealSquare() {

    let square = boardHTML.rows[clickedSquare.x].cells[clickedSquare.y];
    square.classList.remove('hidden');

    if (square.classList.contains('mine')) {
        statusHTML.innerHTML = 'You Lose!';
        gameOver = true;
        return;
    } else {
        let numMinesAroundSquare = numMinesAround(clickedSquare.x, clickedSquare.y);
        square.innerHTML = numMinesAroundSquare != 0 ? numMinesAroundSquare : '';
        square.classList.add('clickedSquare');
    }
    
}

function flagMine() {
    let square = boardHTML.rows[clickedSquare.x].cells[clickedSquare.y];
    square.classList.add('flag');
}

function checkForWinner() {
    
    let numClickedSquares = 0;

    for(let i = 0; i < BOARD_SIZE; i++) {
        for(let j = 0; j < BOARD_SIZE; j++) {
            if (boardHTML.rows[i].cells[j].classList.contains('clickedSquare')) {
                numClickedSquares++;
            }
        }
    }

    if (numClickedSquares === BOARD_SIZE * BOARD_SIZE - NUM_MINES) {
        statusHTML.innerHTML = 'You Win!';
        gameOver = true;
    }

}

function numMinesAround(i, j) {

    let isASquare = (a, b) => boardHTML.rows[a].cells[b].classList.contains('mine');

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