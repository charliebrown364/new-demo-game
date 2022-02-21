const socket = io();

socket.on('update game', () => {
    updateUI();
});

let guessCounterHTML;
let guessedLettersHTML;
let boardHTML;
let statusHTML;

let gameOver = false;
let keyPressed = false;
let guessedLetters = [];

let word = 'SUPERCAL';

document.addEventListener("keydown", (e) => keyPressed = e.code.replace('Key', ''));

function updateUI() {

    guessCounterHTML   = document.getElementById("guess counter");
    guessedLettersHTML = document.getElementById("guessed letters");
    boardHTML          = document.getElementById("board");
    statusHTML         = document.getElementById("status");

    if (boardHTML.rows.length === 0) { createBoard(); }
    if (gameOver) { return; }

    if (keyPressed) {
        updateBoard();
        updateGuesses();
        checkForWinner();
        keyPressed = false;
    }

}

function createBoard() {
    
    let row = boardHTML.insertRow();
    
    for(let i = 0; i < word.length; i++) {
        let cell = row.insertCell();
        cell.className = 'letter';
        cell.style.backgroundColor = 'gray';
    }

}

function updateBoard() {
    for (let i = 0; i < word.length; i++) {
        if (word[i] === keyPressed) {
            boardHTML.rows[0].cells[i].innerHTML = keyPressed;
        }
    }
}

function updateGuesses() {

    let keyPressedNotInWord = !word.includes(keyPressed);
    let keyPressedIsALetter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(keyPressed);
    let keyPressedIsNew = !guessedLetters.includes(keyPressed);

    if (keyPressedNotInWord && keyPressedIsALetter && keyPressedIsNew) {
        guessedLetters.push(keyPressed);
    }

    guessCounterHTML.innerHTML = `number of wrong guesses: ${guessedLetters.length}`;
    guessedLettersHTML.innerHTML = `guessed letters: ${guessedLetters}`;

}

function checkForWinner() {

    if (!'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(keyPressed)) { return; }

    if (word === rowHTML()) {
        gameOver = true;
        statusHTML.innerHTML = 'you win!';
    }

}

function rowHTML() {
    let guessedWord = '';
    for (const cell of boardHTML.rows[0].cells) {
        guessedWord += cell.innerHTML;
    }
    return guessedWord;
}