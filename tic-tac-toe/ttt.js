let boardHTML;
let turnHTML;
let statusHTML;

let turn = 'X';
let clickedCell = false;
let boardUpdated = false;
let gameOver = false;

document.addEventListener('click', (e) => {
    clickedCell = [
        e.target.parentElement.rowIndex,
        e.target.cellIndex
    ];
});

function startGame() {
    setInterval(updateUI, 50);
}

function updateUI() {

    boardHTML  = document.getElementById("board");
    turnHTML   = document.getElementById("turn");
    statusHTML = document.getElementById("status");

    if (boardHTML.rows.length === 0) { createBoard(); }
    if (gameOver) { return; }

    if (clickedCell) {

        updateBoard();

        if (boardUpdated) {
            checkForWinner();
            changeTurn();
        }

        clickedCell = false;

    }

}

function createBoard() {

    for(let i = 0; i < 3; i++) {
        let row = boardHTML.insertRow();

        for(let j = 0; j < 3; j++) {

            let cell = row.insertCell();
            cell.className = 'tile';
            cell.innerHTML = '';
            cell.style.backgroundColor = 'gray';

        }
    }

}

function updateBoard() {

    tile = boardHTML.rows[clickedCell[0]].cells[clickedCell[1]];
    boardUpdated = (tile.innerHTML === '');

    if (tile.innerHTML === '') {
        tile.innerHTML = turn;
        statusHTML.innerHTML = '';
    } else {
        statusHTML.innerHTML = 'cannot go there!';
    }

}

function changeTurn() {
    
    if (turn === 'X') {
        turn = 'O';
    } else {
        turn = 'X';
    }

    turnHTML.innerHTML = `turn: ${turn}`;

}

function checkForWinner() {

    let tiles = [];

    for(let row of boardHTML.rows) {
        for(let cell of row.cells) {
            tiles.push(cell.innerHTML);
        }
    }

    let winningOptions = [
        [tiles[0], tiles[1], tiles[2]],
        [tiles[3], tiles[4], tiles[5]],
        [tiles[6], tiles[7], tiles[8]],
        [tiles[0], tiles[3], tiles[6]],
        [tiles[1], tiles[4], tiles[7]],
        [tiles[2], tiles[5], tiles[8]],
        [tiles[0], tiles[4], tiles[8]],
        [tiles[2], tiles[4], tiles[6]],
    ];

    for (let arr of winningOptions) {
        if (arr[0] && arr[0] === arr[1] && arr[1] === arr[2] && arr[0] == arr[2]) {
            gameOver = true;
            statusHTML.innerHTML = `${turn} wins!`;
            break;
        }
    }

}