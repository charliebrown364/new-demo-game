import Player from "./spelunkyPlayer.js";
import Block from "./spelunkyBlock.js";

let player = new Player();

let blocks = [new Block(0, 15),  new Block(1, 15),  new Block(2, 15),  new Block(3, 15),  new Block(4, 15),
              new Block(5, 15),  new Block(6, 15),  new Block(7, 15),  new Block(8, 15),  new Block(9, 15),
              new Block(10, 15), new Block(11, 15), new Block(12, 15), new Block(13, 15), new Block(14, 15),
              new Block(15, 15)];

let gameState = {
    'blockArray': [],
    'onGround': false
};

initialize();

window.onload = () => setInterval(updateUI, 1);

document.addEventListener("keydown", (e) => {
    if (e.code == 'ArrowLeft' || e.code == 'ArrowRight') player.startMoving(e.code);
});

document.addEventListener("keyup", (e) => {
    player.stopMoving(keyToLetter(e));
});

function initialize() {
    
    for (let i = 0; i < 16; i++) {
        gameState['blockArray'].push([]);
        for (let j = 0; j < 16; j++) {
            gameState['blockArray'][i].push(null);
        }
    }
    
    for (let block of blocks) {
        gameState['blockArray'][block.xBlock][block.yBlock] = block;
    }

}

function updateUI() {
    player.updateMovement(gameState);
}

function keyToLetter(e) {
    return e.code.replace('Key', '');
}