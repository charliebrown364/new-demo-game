import Player from "./zombiePlayer.js";
import Zombie from "./zombieZombie.js";
import Pistol from "./zombieWeapon.js";

let player = new Player();
let zombie = new Zombie();

let gameState = {
    'weaponsList': []
}

initialize();

window.onload = () => setInterval(updateUI, 1);

document.addEventListener("keydown", (e) => {
    let letter = keyToLetter(e);
    if (['A', 'D', 'S', 'W'].includes(letter)) { player.startMoving(letter); }
    if (letter == 'E') { player.pickUpItem(gameState); }
});

document.addEventListener("keyup", (e) => {
    player.stopMoving(keyToLetter(e));
});

function initialize() {
    player.initialize();
    zombie.initialize();
    spawnWeapon();
}

function updateUI() {
    player.update(gameState);
    zombie.update(player);
}

function spawnWeapon() {

    const NUM_PISTOLS = 2;

    for (let i = 0; i < NUM_PISTOLS; i++) {
        let weapon = new Pistol();
        weapon.initialize(i);
        gameState['weaponsList'].push(weapon);
    }
    
}

function keyToLetter(e) {
    return e.code.replace('Key', '');
}