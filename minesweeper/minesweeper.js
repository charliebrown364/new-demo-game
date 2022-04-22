let boardHTML  = document.getElementById("board");
let statusHTML = document.getElementById("status");

const BOARD_SIZE = 10;
const NUM_MINES = 10;

let gameStarted = false;
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
    }

    if (gameOver) { return; }

    switch (clickedSquare.type) {
        case null: return;
        case 'left':
            if (!gameStarted) {
                fillBoard();
            } else {
                revealSquare(clickedSquare.x, clickedSquare.y);
            }
        case 'right': flagMine();
    }

    checkForWinner();

    clickedSquare = {
        type: null,
        x: null,
        y: null
    };

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
            if (i !== clickedSquare.x || j !== clickedSquare.y) {
                boardHTML.rows[i].cells[j].classList.add('hidden');
            }
        }
    }

    let numMinesPlaced = 0;

    while (numMinesPlaced < NUM_MINES) {

        let mineX = randomInteger(0, 9);
        let mineY = randomInteger(0, 9);
        let square = boardHTML.rows[mineX].cells[mineY];

        if (square.classList.contains('clickedSquare')) { continue; }
        if (square.classList.contains('mine')) { continue; }

        if (!gameStarted) {

            gameStarted = true;

            for (let coord of getSurroundingCoords(clickedSquare.x, clickedSquare.y)) {
                let square = boardHTML.rows[coord[0]].cells[coord[1]];
                square.classList.remove('hidden');
                square.classList.add('clickedSquare');
            }

        } else {
            square.classList.add('mine');
            numMinesPlaced++;
        }
        
    }

    statusHTML.innerHTML += 'before surroundingCoords <br>';

    for (let coord of getSurroundingCoords(clickedSquare.x, clickedSquare.y)) {
        statusHTML.innerHTML += `${coord}<br>`;
        let square = boardHTML.rows[coord[0]].cells[coord[1]];
        statusHTML.innerHTML += 'before numMinesAround <br>';
        let numMinesAroundSquare = numMinesAround(coord[0], coord[1]);
        statusHTML.innerHTML += 'after numMinesAround <br>';
        square.innerHTML = numMinesAroundSquare != 0 ? numMinesAroundSquare : '';
        square.classList.add('clickedSquare');
    }

    // while there are .clickedSquare:not(.hidden) that have both
    // 0 mines around them AND hidden squares around them, reveal that square

    statusHTML.innerHTML += 'before squareCoordsToReveal <br>';

    let squareCoordsToReveal = [];

    for(let i = 0; i < BOARD_SIZE; i++) {
        for(let j = 0; j < BOARD_SIZE; j++) {
            let square = boardHTML.rows[i].cells[j];
            if (square.classList.contains('clickedSquare') &&
                square.innerHTML === '') {
                squareCoordsToReveal.push([i, j]);
                statusHTML.innerHTML += 'hello ';
            }
        }
    }

    statusHTML.innerHTML += '<br>before squareCoordsToReveal while loop <br>';

    let goAgain = true;

    while (goAgain) {

        goAgain = false;

        for (let coords of squareCoordsToReveal) {
                
            for (let [i, j] of getSurroundingCoords(coords[0], coords[1])) {
                
                let surroundingSquare = boardHTML.rows[i].cells[j];

                if (!surroundingSquare.classList.contains('mine') && numMinesAround(i, j) === 0) {
                    squareCoordsToReveal.push([i, j]);
                    goAgain = true;
                }

            }

        }
    
    }

    statusHTML.innerHTML += 'statusHTML.innerHTML: <br>';
    for (let elem of squareCoordsToReveal) {
        statusHTML.innerHTML += `${elem}<br>`;
    }

    for (let [i, j] of squareCoordsToReveal) {
        revealSquare(i, j);
    }

    // while (squareCoordsToReveal.length !== 0) {

    //     for (let elem of squareCoordsToReveal) {
    //         statusHTML.innerHTML += `${elem}, `;
    //     }
    //     statusHTML.innerHTML += `hello<br>`;

    //     let newCoordsToReveal = [];

    //     for (let squareCoordToReveal of squareCoordsToReveal) {

    //         let i = squareCoordToReveal[0];
    //         let j = squareCoordToReveal[1];
    //         let square = boardHTML.rows[i].cells[j];

    //         let numSurroundingHiddenSquares = [];
    //         for (let coord of getSurroundingCoords(i, j)) {
    //             let surroundingSquare = boardHTML.rows[coord[0]].cells[coord[1]]
    //             if ((coord[0] !== i || coord[1] !== j) && surroundingSquare.classList.contains('hidden')) {
    //                 numSurroundingHiddenSquares ++;
    //                 if (!squareCoordsToReveal.includes(coord) && !newCoordsToReveal.includes(coord)) {
    //                     newCoordsToReveal.push(coord);
    //                 }
    //             }

    //         }

    //         if (!square.classList.contains('hidden')) { continue; }

    //         if (square.innerHTML === '' && numSurroundingHiddenSquares > 0) {

    //             revealSquare(i, j);

    //             for (let k = 0; k < newCoordsToReveal.length; k++) {
    //                 if (listsAreEqual([i, j], newCoordsToReveal[k])) {
    //                     newCoordsToReveal.splice(k, 1);
    //                 }
    //             }

    //         }

    //         // let numSurroundingHiddenSquares = [];

    //         // for (let coord of getSurroundingCoords(i, j)) {

    //         //     if (coord[0] !== i && coord[1] !== j && boardHTML.rows[coord[0]].cells[coord[1]].classList.contains('hidden')) {
                    
    //         //         numSurroundingHiddenSquares ++;

    //         //         if (!squareCoordsToReveal.includes(coord)) {
    //         //             squareCoordsToReveal.push(coord);
    //         //         }

    //         //     }

    //         // }

    //         // if (square.classList.contains('clickedSquare') &&
    //         //     !square.classList.contains('mine') &&
    //         //     !square.classList.contains('hidden') && 
    //         //     square.innerHTML === '' &&
    //         //     numSurroundingHiddenSquares > 0) {
    //         //         revealSquare(i, j);
    //         // }

    //     }

    //     squareCoordsToReveal = [...newCoordsToReveal];
        
    // }

}

function revealSquare(i, j) {

    let square = boardHTML.rows[i].cells[j];
    square.classList.remove('hidden');

    if (square.classList.contains('mine')) {
        statusHTML.innerHTML = 'You Lose!';
        gameOver = true;
        return;
    } else {
        let numMinesAroundSquare = numMinesAround(i, j);
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
    
    statusHTML.innerHTML += 'getSurroundingCoords(i, j): <br>';
    for (let elem of getSurroundingCoords(i, j)) {
        statusHTML.innerHTML += `${elem}<br>`;
    }

    return getSurroundingCoords(i, j).filter((a, b) => isASquare(a, b)).length;

    // let bools = [
    //     i != 0              && j != 0              && isASquare(i-1, j-1),
    //     i != 0                                     && isASquare(i-1, j),
    //     i != 0              && j != BOARD_SIZE - 1 && isASquare(i-1, j+1),
    //                            j != 0              && isASquare(i, j-1),
    //                            j != BOARD_SIZE - 1 && isASquare(i, j+1),
    //     i != BOARD_SIZE - 1 && j != 0              && isASquare(i+1, j-1),
    //     i != BOARD_SIZE - 1                        && isASquare(i+1, j),
    //     i != BOARD_SIZE - 1 && j != BOARD_SIZE - 1 && isASquare(i+1, j+1)
    // ]

    // let bools = [];
    // for (let coord of getSurroundingCoords(i, j)) {
    //     bools.push(isASquare(coord[0], coord[1]));
    // }

}

function getSurroundingCoords(i, j) {

    let allPossibleCoords = [
        [i - 1, j - 1],
        [i - 1, j    ],
        [i - 1, j + 1],
        [i    , j - 1],
        [i    , j    ],
        [i    , j + 1],
        [i + 1, j - 1],
        [i + 1, j    ],
        [i + 1, j + 1]
    ];

    let surroundingCoords = [];

    for (let [a, b] of allPossibleCoords) {
        if (0 <= a && a <= BOARD_SIZE - 1 && 0 <= b && b <= BOARD_SIZE - 1) {
            surroundingCoords.push([a, b]);
        }
    }

    return surroundingCoords;

}

function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function listsAreEqual(list1, list2) {
    for (let i = 0; i < list1.length; i++) {
        if (list1[i] !== list2[i]) return false;
    }
    return true;
}