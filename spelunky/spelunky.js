let gameInitialized = false;
let player = new Player();

document.addEventListener("keydown", (e) => { player.moving = e.code.replace('Key', ''); });
document.addEventListener("keyup", () => { player.moving = false; });

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

function numToPx(n) {
    return `${n}px`;
}

function PxToNum(px) {
    return parseInt(px.replace('px', ''));
}