const socket = io();

socket.on('update game', () => {
    updateUI();
});

let turn = 'X';
let clickedCell = null;
let winner = null;

document.addEventListener('click', (e) => {
    clickedCell = [
        e.target.parentElement.rowIndex,
        e.target.cellIndex
    ];
});

function updateUI() {

    const boardHTML  = document.getElementById("board");
    const turnHTML   = document.getElementById("turn");
    const statusHTML = document.getElementById("status");

    // make board

    if (boardHTML.rows.length === 0) {

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

    // game

    if (clickedCell !== null && winner === null) {

        // board

        tile = boardHTML.rows[clickedCell[0]].cells[clickedCell[1]];

        if (tile.innerHTML === '') {
            tile.innerHTML = turn;
            statusHTML.innerHTML = '';
        } else {
            statusHTML.innerHTML = 'cannot go there!';
            changeTurn();
        }

        clickedCell = null;

        // winner

        checkForWinner(boardHTML);

        if (winner === null) {
            changeTurn();
            turnHTML.innerHTML = `turn: ${turn}`;
        } else {
            statusHTML.innerHTML = `${turn} wins!`;
        }

    }

}

function changeTurn() {
    if (turn === 'X') {
        turn = 'O';
    } else {
        turn = 'X';
    }
}

function checkForWinner(boardHTML) {

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
        if (arr[0] === arr[1] && arr[1] === arr[2] && arr[0] && arr[2]) {
            winner = arr[0];
            return;
        }
    }

}