let boardHTML;
let turnHTML;
let statusHTML;

let clickedBoard = null;
let clickedCell = null;

let gameStarted = false;
let boardUpdated = false;
let gameOver = false;

let turn = 'X';
let correctBoard = null;

document.addEventListener('click', (e) => {
    
    clickedBoard = [
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.rowIndex,
        e.target.parentElement.parentElement.parentElement.parentElement.cellIndex
    ];

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
    if (gameOver) return;
    if (!clickedCell) return;

    updateBoard();

    if (boardUpdated) {
        checkForWinner();
        changeTurn();
    }

    clickedBoard = null;
    clickedCell = null;
    boardUpdated = false;

}

function createBoard() {

    for(let i = 0; i < 3; i++) {
        let row = boardHTML.insertRow();

        for(let j = 0; j < 3; j++) {
            
            let smallBoardCell = row.insertCell();
            smallBoardCell.classList.add('smallBoard');

            let smallBoard = document.createElement("table");
            
            for(let k = 0; k < 3; k++) {
                let row = smallBoard.insertRow();
                for(let l = 0; l < 3; l++) {

                    let cell = row.insertCell();
                    cell.classList.add('tile');
                    cell.innerHTML = '';

                }
            }

            smallBoardCell.appendChild(smallBoard);

        }
    }

}

function updateBoard() {

    let board = boardHTML.rows[clickedBoard[0]].cells[clickedBoard[1]];
    let tile  = board.children[0].rows[clickedCell[0]].cells[clickedCell[1]];

    gameStarted = (!gameStarted && !gameOver);

    if ((!correctBoard || listsAreEqual(clickedBoard, correctBoard)) && tile.innerHTML === '') {      
        
        tile.innerHTML = turn;
        boardUpdated = true;

        correctBoard = [...clickedCell];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {

                if (i === correctBoard[0] && j === correctBoard[1]) {
                    boardHTML.rows[i].cells[j].classList.add('chosenSmallBoard');
                } else {
                    boardHTML.rows[i].cells[j].classList.remove('chosenSmallBoard');
                }

            }
        }

    }

}

function changeTurn() {
    let turnMap = {'X': 'O', 'O': 'X'};
    turn = turnMap[turn];
    turnHTML.innerHTML = `turn: ${turn}`;
}

function checkForWinner() {

    let board = boardHTML.rows[clickedBoard[0]].cells[clickedBoard[1]].children[0];
    let tiles = [];

    for(let row of board.rows) {
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
            boardHTML.rows[correctBoard[0]].cells[correctBoard[1]].classList.remove('chosenSmallBoard');
            return;
        }
    }

}

function listsAreEqual(list1, list2) {
    if (list1.length !== list2.length) return false;
    for (let i = 0; i < list1.length; i++) {
        if (list1[i] !== list2[i]) return false;
    }
    return true;
}