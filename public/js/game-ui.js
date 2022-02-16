const socket = io();

let turn = 0;
let clicked = false;
let coords = [];

socket.on('gameState', (data) => {
    updateUI(data.gameState);
});

function updateUI(gameState) {
    let board = gameState.board;
    updateBoard(board);            
}

document.addEventListener('mousemove', boardIsClicked);

function boardIsClicked(event) {
    coords = [event.clientX, event.clientY];
    clicked = true;
}

function updateBoard(board) {

    const clickedHTML = document.getElementById("clicked");
    clickedHTML.innerHTML = `clicked = ${clicked}`;

    if (clicked) {

        // turn counter

        const turnCounter = document.getElementById("turn");
        turnCounter.innerHTML = `turn: player ${(turn % 2) + 1}`;
        turn++;

        // coords

        const coordsHTML = document.getElementById("coords");
        coordsHTML.innerHTML = `coords: ${coords}`;

        clicked = false;

        // board

        // let boardTable = document.getElementById('board');

        // if (boardTable.rows.length == 0) {

        //     for(let i = 0; i < board.numRows; i++) {
        //         let row = boardTable.insertRow();

        //         for(let j = 0; j < board.numCols; j++) {

        //             let cell = row.insertCell();
        //             cell.className = 'boardSpace';
        //             cell.innerHTML = '';
        //             cell.style.backgroundColor = 'gray';

        //         }
        //     }

        // } // else {

        //     // mouse stuff
        //     boardTable.rows[0].cells[0].innerHTML = `x: ${x}, y: ${y}`;

        // }
    
    }

}