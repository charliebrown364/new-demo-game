const socket = io();

socket.on('update game', () => {
    updateUI();
});

let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let gameOver = false;

let currentRowIndex = 0;
let currentCellIndex = 0;
let currentWord = [' ', ' ', ' ', ' ', ' '];
let currentLetter = '';

let word = 'FJORD';

document.addEventListener("keydown", function(e) {
    
    currentLetter = e.code.replace('Key', '');

    if (letters.includes(currentLetter)) {
        currentWord[currentCellIndex] = currentLetter;    
        currentCellIndex++;
    }

    if (e.code === 'Backspace' && currentCellIndex !== 0) {
        currentCellIndex--;
        currentWord[currentCellIndex] = ' ';
        currentLetter = '';
    } 

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

    if (!gameOver) {

        // board

        for (let i = 0; i < 5; i++) {
            currentCell = boardHTML.rows[currentRowIndex].cells[i];
            currentCell.innerHTML = currentWord[i];
        }

        // winner

        if (!currentWord.includes(' ')) {
            checkForWinner(boardHTML);
        }

        if (gameOver) {
            statusHTML.innerHTML = `you win!`;
        }

    }

}

function checkForWinner(boardHTML) {

    gameOver = true;

    for (let i = 0; i < 5; i++) {

        let cells = boardHTML.rows[currentRowIndex].cells;
        let letter = currentWord[i];
        
        if (word[i] === letter) {
            cells[i].style.backgroundColor = 'green';
        } else if (word.includes(letter)) {
            gameOver = false;
            cells[i].style.backgroundColor = 'yellow';
        } else {
            gameOver = false;
        }

    }

    currentRowIndex++;
    currentCellIndex = 0;
    currentWord = [' ', ' ', ' ', ' ', ' '];

}