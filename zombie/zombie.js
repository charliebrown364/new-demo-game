import Player from "./zombiePlayer.js";
import Zombie from "./zombieZombie.js";

let player = new Player();
let zombie = new Zombie();

initialize();

window.onload = () => setInterval(updateUI, 1);
document.addEventListener("keydown", (e) => player.startMoving(e));
document.addEventListener("keyup", (e) => player.stopMoving(e));

function initialize() {
    player.initialize();
    zombie.initialize();
}

function updateUI() {
    player.movement();
    zombie.movement(player);
}