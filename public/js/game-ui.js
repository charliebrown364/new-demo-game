const socket = io();

let turn = 'X';
let clicked = false;
let mouseX = null;
let mouseY = null;
let winner = null;

socket.on('gameState', (data) => {
    updateUI(data.gameState);
});

function updateUI(gameState) {
    let board = gameState.board;
    updateBoard(board);            
}

document.addEventListener('click', (e) => {
    mouseX = e.x
    mouseY = e.y;
    clicked = true;
});

function updateBoard(board) {

    const boardTable  = document.getElementById("board");
    const turnCounter = document.getElementById("turn");
    const statusHTML  = document.getElementById("status");

    // make board

    if (boardTable.rows.length === 0) {

        for(let i = 0; i < board.numRows; i++) {
            let row = boardTable.insertRow();

            for(let j = 0; j < board.numCols; j++) {

                let cell = row.insertCell();
                cell.className = 'tile';
                cell.innerHTML = '';
                cell.style.backgroundColor = 'gray';

            }
        }

    }

    // game

    if (clicked && winner !== null) {

        clicked = false;

        // board

        tileCoords = getTile(boardTable);
        tile = boardTable.rows[tileCoords[1]].cells[tileCoords[0]];
        
        if (tile.innerHTML === '') {
            tile.innerHTML = turn;
            statusHTML.innerHTML = '';
        } else {
            statusHTML.innerHTML = 'cannot go there!';
            changeTurn();
        }

        // winner

        checkForWinner(boardTable);

        if (winner === null) {
            changeTurn();
            turnCounter.innerHTML = `turn: ${turn}`;
        } else {
            statusHTML.innerHTML = `winner! ${turn}`;
        }

    }

}

function getTile(boardTable) {
    
    let boardTablePos = boardTable.getBoundingClientRect();
    let cellPos = boardTable.rows[0].cells[0].getBoundingClientRect();

    let boardX = boardTablePos.x;
    let boardY = boardTablePos.y;

    let cellWidth = cellPos.width;
    let cellHeight = cellPos.height;

    let i = null;
    let j = null;

    if (boardX <= mouseX && mouseX < boardX + cellWidth) {
        i = 0;
    } else if (boardX + cellWidth <= mouseX && mouseX < boardX + 2 * cellWidth) {
        i = 1;
    } else if (boardX + 2 * cellWidth <= mouseX && mouseX < boardX + 3 * cellHeight) {
        i = 2;
    }

    if (boardY <= mouseY && mouseY < boardY + cellHeight) {
        j = 0;
    } else if (boardY + cellHeight <= mouseY && mouseY < boardY + 2 * cellHeight) {
        j = 1;
    } else if (boardY + 2 * cellHeight <= mouseY && mouseY < boardY + 3 * cellHeight) {
        j = 2;
    }

    return [i, j];

}

function changeTurn() {
    if (turn === 'X') {
        turn = 'O';
    } else {
        turn = 'X';
    }
}

function checkForWinner(boardTable) {

    let tiles = [];

    for(let row of boardTable.rows) {
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
        if (arr[0] === arr[1] && arr[1] === arr[2] && arr[0] && arr[2]) {
            winner = arr[0];
            return;
        }
    }

}