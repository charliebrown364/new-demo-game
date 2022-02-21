let boardHTML;
let statusHTML;

let gameOver = false;
let keyPressed = false;
let currentRowIndex = 0;
let currentCellIndex = 0;

let word = 'FJORD';

document.addEventListener("keydown", (e) => keyPressed = e.code);

function startGame() {
    setInterval(updateUI, 50);
}

function updateUI() {

    boardHTML  = document.getElementById("board");
    statusHTML = document.getElementById("status");

    if (boardHTML.rows.length === 0) { createBoard(); }
    if (gameOver) { return; }
    
    if (keyPressed) {
        updateBoard();
        checkForWinner();
        keyPressed = false;
    }
    
}

function createBoard() {
    
    for(let i = 0; i < 6; i++) {
        let row = boardHTML.insertRow();

        for(let j = 0; j < 5; j++) {

            let cell = row.insertCell();
            cell.className = 'letter';
            cell.style.backgroundColor = 'white';

        }
    }

}

function updateBoard() {

    let cells = boardHTML.rows[currentRowIndex].cells;
    let key = keyPressed.replace('Key', '');

    if ('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(key)) {
        cells[currentCellIndex].innerHTML = key;
        currentCellIndex++;
    }

    if (keyPressed === 'Backspace') {
        currentCellIndex = Math.max(currentCellIndex-1, 0);
        cells[currentCellIndex].innerHTML = ' ';
    }

}

function checkForWinner() {

    let cells = boardHTML.rows[currentRowIndex].cells;
    let currentWord = rowHTML();

    if (currentWord.length !== 5) { return; }

    for (let i = 0; i < 5; i++) {

        let letter = cells[i].innerHTML;
        
        if (word[i] === letter) {
            cells[i].style.backgroundColor = 'green';
        } else if (word.includes(letter)) {
            cells[i].style.backgroundColor = 'yellow';
        } else {
            cells[i].style.backgroundColor = 'gray';
        }

    }

    if (word === currentWord) {
        gameOver = true;
        statusHTML.innerHTML = 'you win!';
    }

    currentRowIndex++;
    currentCellIndex = 0;

}

function rowHTML() {
    let currentWord = '';
    for (const cell of boardHTML.rows[currentRowIndex].cells) {
        currentWord += cell.innerHTML;
    }
    return currentWord;
}