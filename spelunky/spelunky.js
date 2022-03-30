import Player from "./spelunkyPlayer.js";
import Dirt from "./spelunkyBlock.js";

let player = new Player();

let blockArray = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', 'b', ' '],
    ['b', 'b', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['b', 'b', ' ', 'b', 'b', ' ', ' ', 'b', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', 'b', 'b', ' ', ' '],
    ['b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b', 'b']
]

let gameState = {
    'blockArray': []
};

initialize();

window.onload = () => setInterval(updateUI, 1);

document.addEventListener("keydown", (e) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp'].includes(e.code)) player.startMoving(e.code);
});

document.addEventListener("keyup", (e) => {
    player.stopMoving(keyToLetter(e));
});

function initialize() {
    
    for (let i = 0; i < 8; i++) {
        gameState['blockArray'].push([]);
        for (let j = 0; j < 10; j++) {
            let obj = newObj(i, j);
            gameState['blockArray'][i].push(obj);
        }
    }

}

function newObj(i, j) {
    switch (blockArray[i][j]) {
        case 'b':
            return new Dirt(j, i);
        default:
            return '';
    }
}

function updateUI() {
    player.updateMovement(gameState);
}

function keyToLetter(e) {
    return e.code.replace('Key', '');
}