let boardHTML  = document.getElementById("board");
let statusHTML = document.getElementById("status");
let scoreHTML  = document.getElementById("score");

const BOARD_SIZE = 15;

let gameStarted = false;
let gameOver = false;

let score = 0;
let currentDirection = 'right';

let snakeCoords = [[2, 1], [2, 2], [2, 3]];
let appleCoord = [6, 7];
let keepSnakeTail = false;

document.addEventListener("click", (e) => gameStarted = true);

document.addEventListener("keydown", (e) => {
    let letter = e.code.replace('Key', '');
    if (letter === 'W' || letter === 'A' || letter === 'S' || letter === 'D') changeDirection(letter);
    if (['W', 'A', 'S', 'D', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowRight'].includes(letter)) changeDirection(letter);
});

let startGame = () => setInterval(updateUI, 100);

function updateUI() {

    boardHTML  = document.getElementById("board");
    statusHTML = document.getElementById("status");
    scoreHTML  = document.getElementById("score");

    if (boardHTML.rows.length === 0) {
        createBoard();
        updateSnakeHTML();
        updateAppleHTML();
    }

    if (!gameStarted) return;
    if (gameOver) return;
    
    updateSnakeCoords();
    if (gameOver) return;

    updateSnakeHTML();

    checkIfEaten();
    updateAppleHTML();

    scoreHTML.innerHTML = `score: ${score}`;

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

function changeDirection(letter) {
    if ((letter === 'W' || letter === 'ArrowUp')    && currentDirection !== 'down')  currentDirection = 'up';
    if ((letter === 'A' || letter === 'ArrowLeft')  && currentDirection !== 'right') currentDirection = 'left';
    if ((letter === 'S' || letter === 'ArrowDown')  && currentDirection !== 'up')    currentDirection = 'down';
    if ((letter === 'D' || letter === 'ArrowRight') && currentDirection !== 'left')  currentDirection = 'right';
}

function updateSnakeCoords() {

    let y = snakeCoords.at(-1)[0];
    let x = snakeCoords.at(-1)[1];

    if (!keepSnakeTail) snakeCoords.splice(0, 1);
    keepSnakeTail = false;

    let directionMap = {
        'up':    [y - 1, x],
        'down':  [y + 1, x],
        'left':  [y, x - 1],
        'right': [y, x + 1]
    }

    for (let [direction, newCoords] of Object.entries(directionMap)) {
        if (currentDirection === direction) {
            if (listIncludes(snakeCoords, newCoords)) gameIsOver();
            else if (newCoords[0] < 0 || newCoords[0] >= BOARD_SIZE || newCoords[1] < 0 || newCoords[1] >= BOARD_SIZE) gameIsOver();
            else snakeCoords.push(newCoords);
        }
    }

}

function gameIsOver() {
    statusHTML.innerHTML = 'You Lose!';
    gameOver = true;
}

function updateSnakeHTML() {

    for(let i = 0; i < BOARD_SIZE; i++) {
        for(let j = 0; j < BOARD_SIZE; j++) {

            let square = boardHTML.rows[i].cells[j];

            if (listsAreEqual([i, j], snakeCoords.at(-1))) {
                square.classList.remove('snake');
                square.classList.add('snakeHead');
            } else if (listIncludes(snakeCoords, [i, j])) {
                square.classList.add('snake');
                square.classList.remove('snakeHead');
            } else {
                square.classList.remove('snake');
                square.classList.remove('snakeHead');
            }

        }
    }

}

function checkIfEaten() {

    for(let i = 0; i < BOARD_SIZE; i++) {
        for(let j = 0; j < BOARD_SIZE; j++) {

            if (isAClass(i, j, 'snakeHead') && isAClass(i, j, 'apple')) {
                boardHTML.rows[i].cells[j].classList.remove('apple');
                appleCoord = newAppleCoord();
                keepSnakeTail = true;
                score++;
            }

        }
    }

}

function updateAppleHTML() {
    boardHTML.rows[appleCoord[0]].cells[appleCoord[1]].classList.add('apple');
}

function newAppleCoord() {

    let coord = [randomInteger(0, BOARD_SIZE - 1), randomInteger(0, BOARD_SIZE - 1)];

    while (listIncludes(snakeCoords, coord)) {
        coord = [randomInteger(0, BOARD_SIZE - 1), randomInteger(0, BOARD_SIZE - 1)];
    }

    return coord;

}

function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function isAClass(i, j, classToTest) {
    return boardHTML.rows[i].cells[j].classList.contains(classToTest);
}

function listsAreEqual(list1, list2) {
    if (list1.length !== list2.length) return false;
    for (let i = 0; i < list1.length; i++) {
        if (list1[i] !== list2[i]) return false;
    }
    return true;
}

function listIncludes(parentList, sublist) {
    for (let parentElem of parentList) {
        if (listsAreEqual(parentElem, sublist)) {
            return true;
        }
    }
}