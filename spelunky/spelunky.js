let gameInitialized = false;
let player = new Player();

document.addEventListener("keydown", (e) => player.moving = e.code.replace('Key', ''));
document.addEventListener("keyup", () => player.moving = false);

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
let PxToNum = (px) => parseInt(px.replace('px', ''));