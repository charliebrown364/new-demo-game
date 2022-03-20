import Thing from "./zombieObject.js";

export default class Zombie extends Thing {

    constructor() {
        super("zombie", 300, 300, 50, 50, 'red', 0.5, 100);
        this.player = null;
    }

    update(player) {
        this.updateMovement(player);
    }

    updateMovement(player) {
    
        this.player = player;
        this.changePosition();

        let zombieHTML = document.getElementById(this.id);
        zombieHTML.style.top  = `${this.y}px`;
        zombieHTML.style.left = `${this.x}px`;

    }

    changePosition() {

        const OPPOSITE = Math.abs(this.player.y - this.y);
        const HYPOTENUSE = Math.sqrt((this.player.x - this.x) ** 2 + (this.player.y - this.y) ** 2)
        const SIN = OPPOSITE / HYPOTENUSE;
        const COS = Math.cos(Math.asin(SIN));

        if (this.x < this.player.x) {
            this.x += this.speed * COS;
        }
        
        if (this.x > this.player.x) {
            this.x -= this.speed * COS;
        }

        if (this.y < this.player.y) {
            this.y += this.speed * SIN;
        }
        
        if (this.y >= this.player.y) {
            this.y -= this.speed * SIN;
        }
        
    }

}