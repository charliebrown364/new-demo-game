import Player from "./zombiePlayer.js";

let player = new Player();
player.initialize();

window.onload = () => setInterval(updateUI, 1);
document.addEventListener("keydown", (e) => player.startMoving(e));
document.addEventListener("keyup", (e) => player.stopMoving(e));

function updateUI() {
    player.movement();
}