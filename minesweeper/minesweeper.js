const BOARD_SIZE = 10;
const NUM_MINES = 15;

let gameStarted = false;
let gameOver = false;

let clickType = null;
let clickX = null;
let clickY = null;

let startGame = () => setInterval(updateUI, 50);

function updateUI() {

    boardHTML  = document.getElementById("board");
    statusHTML = document.getElementById("status");

    if (boardHTML.rows.length === 0) {
        createBoard();
        createEventListeners();
    }

    if (gameOver) { return; }

    if (clickType === 'left' && !gameStarted) fillBoard();
    if (clickType === 'left' && gameStarted) clickSquare(clickX, clickY);
    if (clickType === 'right') flagMine(clickX, clickY);

    checkForWinner();

    clickType = null;

}

function createBoard() {

    for(let i = 0; i < BOARD_SIZE; i++) {
        let row = boardHTML.insertRow();
        for(let j = 0; j < BOARD_SIZE; j++) {
            let square = row.insertCell();
            square.className = 'square';
        }
    }

}

function createEventListeners() {

    boardHTML.addEventListener('click', e => {
        clickType = 'left';
        clickX = e.target.parentElement.rowIndex;
        clickY = e.target.cellIndex;
    });

    boardHTML.addEventListener('contextmenu', e => {
        e.preventDefault();
        clickType = 'right';
        clickX = e.target.parentElement.rowIndex;
        clickY = e.target.cellIndex;
    });

}

function fillBoard() {

    for(let i = 0; i < BOARD_SIZE; i++) {
        for(let j = 0; j < BOARD_SIZE; j++) {
            boardHTML.rows[i].cells[j].classList.add('hidden');
        }
    }

    placeMinesAndInitialSquares();
    revealSurroundingSquares(clickX, clickY);

}

function placeMinesAndInitialSquares() {

    let numMinesPlaced = 0;

    while (numMinesPlaced < NUM_MINES) {

        let mineX = randomInteger(0, 9);
        let mineY = randomInteger(0, 9);
        let square = boardHTML.rows[mineX].cells[mineY];

        if (isAClickedSquare(mineX, mineY)) { continue; }
        if (isAMine(mineX, mineY)) { continue; }

        if (!gameStarted) {

            gameStarted = true;

            for (let [i, j] of getSurroundingCoords(clickX, clickY)) {
                revealSquare(i, j);
            }

        } else {
            square.classList.add('mine');
            numMinesPlaced++;
        }
        
    }

}

function revealSurroundingSquares(x, y) {

    let squareCoordsToReveal = getSurroundingCoords(x, y);

    while (squareCoordsToReveal.length != 0) {
        let newSquareCoordsToReveal = [];
        for (let [i, j] of squareCoordsToReveal) {
            
            revealSquare(i, j);
            addNumMinesAround(i, j);

            if (numMinesAround(i, j) === 0 && !isAMine(i, j)) {

                for (let [si, sj] of getSurroundingCoords(i, j)) {

                    if ((si != i || sj != j) && !isAClickedSquare(si, sj) && !isAMine(si, sj)) {                   
                        revealSquare(i, j);
                        addNumMinesAround(i, j);
                        newSquareCoordsToReveal.push([si, sj]);
                    }

                }

            }

        }
        squareCoordsToReveal = [...newSquareCoordsToReveal];
    }

}

function clickSquare(i, j) {

    if (isAFlag(i, j)) return;

    revealSquare(i, j);

    if (isAMine(i, j)) {
        statusHTML.innerHTML = 'You Lose!';
        gameOver = true;
    } else {
        addNumMinesAround(i, j);
        if (boardHTML.rows[i].cells[j].innerHTML === '') { revealSurroundingSquares(i, j); }
    }
    
}

function checkForWinner() {
    
    let numClickedSquares = 0;

    for(let i = 0; i < BOARD_SIZE; i++) {
        for(let j = 0; j < BOARD_SIZE; j++) {
            if (isAClickedSquare(i, j)) numClickedSquares++;
        }
    }

    if (numClickedSquares === BOARD_SIZE * BOARD_SIZE - NUM_MINES) {
        statusHTML.innerHTML = 'You Win!';
        gameOver = true;
    }

}


function revealSquare(i, j) {
    let square = boardHTML.rows[i].cells[j];
    square.classList.remove('hidden');
    square.classList.add('clickedSquare');
}

function addNumMinesAround(i, j) {
    let numMinesAroundSquare = numMinesAround(i, j);
    boardHTML.rows[i].cells[j].innerHTML = numMinesAroundSquare === 0 ? '' : numMinesAroundSquare;
}

function numMinesAround(i, j) {
    return getSurroundingCoords(i, j).filter(e => isAMine(e[0], e[1])).length;
}

function flagMine(i, j) {
    let square = boardHTML.rows[i].cells[j];
    if (isAFlag(i, j)) square.classList.remove('flag');
    else square.classList.add('flag');
}

function getSurroundingCoords(i, j) {
    let allPossibleCoords = [[i-1, j-1], [i-1, j], [i-1, j+1], [i, j-1], [i, j], [i, j+1], [i+1, j-1], [i+1, j], [i+1, j+1]];
    return allPossibleCoords.filter(e => 0 <= e[0] && e[0] <= BOARD_SIZE - 1 && 0 <= e[1] && e[1] <= BOARD_SIZE - 1);
}

function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function isAClickedSquare(i, j) {
    return boardHTML.rows[i].cells[j].classList.contains('clickedSquare');
}

function isAFlag(i, j) {
    return boardHTML.rows[i].cells[j].classList.contains('flag');
}

function isAMine(i, j) {
    return boardHTML.rows[i].cells[j].classList.contains('mine');
}