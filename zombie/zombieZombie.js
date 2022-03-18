import Thing from "./zombieObject.js";

export default class Zombie extends Thing {

    constructor() {
        super("zombie", 500, 500, 50, 50, 'red', 0.5, 100);
        this.player = null;
    }

    movement(player) {
    
        this.player = player;
        this.changePosition();

        let zombieHTML = document.getElementById(this.id);
        zombieHTML.style.top  = `${this.y}px`;
        zombieHTML.style.left = `${this.x}px`;

    }

    changePosition() {

        let opposite = Math.abs(this.player.y - this.y - this.ySize);
        let hypotenuse = Math.sqrt((this.player.x - this.x) ** 2 + (this.player.y - this.y - this.ySize) ** 2)
        let angle = Math.asin(opposite / hypotenuse);

        if (this.x < this.player.x) {
            this.x += this.speed * Math.cos(angle);
        }
        
        if (this.x > this.player.x) {
            this.x -= this.speed * Math.cos(angle);
        }

        if (this.y < this.player.y - this.ySize) {
            this.y += this.speed * Math.sin(angle);
        }
        
        if (this.y >= this.player.y - this.ySize) {
            this.y -= this.speed * Math.sin(angle);
        }
        
    }

}