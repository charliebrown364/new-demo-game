import Player from "./zombiePlayer.js";
import Zombie from "./zombieZombie.js";
import Pistol from "./zombieWeapon.js";
import Bullet from "./zombieBullet.js";

let player = new Player();

let gameState = {
    'weaponsList': [],
    'bulletList': [],
    'zombieList': [
        new Zombie()
    ],
    'bulletCounter': 0
};

initialize();

window.onload = () => setInterval(updateUI, 1);

document.addEventListener("click", (e) => {
    new Bullet(player, gameState);
});

document.addEventListener("keydown", (e) => {
    let letter = keyToLetter(e);
    if (['A', 'D', 'S', 'W'].includes(letter)) { player.startMoving(letter); }
    if (letter == 'E') { player.pickUpItem(gameState); }
});

document.addEventListener("keyup", (e) => {
    player.stopMoving(keyToLetter(e));
});

function initialize() {
    spawnWeapon();
}

function updateUI() {

    player.update(gameState);

    for (let zombie of gameState['zombieList']) {
        zombie.update(player);
    }

    for (let i = 0; i < gameState['bulletList'].length; i++) {
        gameState['bulletList'][i].update(gameState, i);
    }

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