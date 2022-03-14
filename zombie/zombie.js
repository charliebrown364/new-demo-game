let gameInitialized = false;
let player = new Player();

document.addEventListener("keydown", (e) => {
    player.moving.push(keyToLetter(e));
});

document.addEventListener("keyup", (e) => {
    player.moving = player.moving.filter(elem => elem !== keyToLetter(e));
});

function startGame() {
    setInterval(updateUI, 1);
}

function updateUI() {

    if (!gameInitialized) {
        player.initialize();
        gameInitialized = true;
    }

    player.move();
    
}

let numToPx = (n)  => `${n}px`;
let pxToNum = (px) => parseInt(px.replace('px', ''));
let keyToLetter = (e) => e.code.replace('Key', '');