const socket = io();

socket.on('update game', () => {
    updateUI();
});

let gameOver = false;
let current_row_index = 0;
let current_cell_index = 0;
let current_word = '     ';
let current_letter = '';

let word = 'fjord';

document.getElementById("board").addEventListener("keyup", function(e) {
    current_letter = e;
    // current_word += current_letter;
});

function updateUI() {

    const boardHTML  = document.getElementById("board");
    const statusHTML = document.getElementById("status");

    // make board

    if (boardHTML.rows.length === 0) {

        for(let i = 0; i < 6; i++) {
            let row = boardHTML.insertRow();

            for(let j = 0; j < 5; j++) {

                let cell = row.insertCell();
                cell.className = 'letter';
                cell.innerHTML = '';
                cell.style.backgroundColor = 'gray';

            }
        }

    }

    // game

    if (current_letter !== '' && !gameOver) {

        // board

        current_cell = getCell(boardHTML);
        current_cell.innerHTML = current_letter;
        current_letter = '';

        if (current_word.length === 5) {
            checkForWinner(boardHTML);
        }

        if (gameOver) {
            statusHTML.innerHTML = `you win!`;
        }

    }

}

function getCell(boardHTML) {
    
    for(let i = 0; i < 5; i++) {
        cell = boardHTML.rows[current_row_index].cells[i];
        if (cell.innerHTML === ' ') {
            return cell;
        }

    }
}

function checkForWinner(boardHTML) {

}