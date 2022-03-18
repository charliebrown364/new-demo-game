import Thing from "./zombieObject.js";

export default class Player extends Thing {

    constructor() {
        super("player", 0, 0, 50, 50, 'blue', 1, 100);
        this.moving = [];
    }

    startMoving(e) {
        let letter = e.code.replace('Key', '');
        if (!this.moving.includes(letter)) {
            this.moving.push(letter);
        }
    }

    stopMoving(e) {
        this.moving = this.moving.filter(elem => elem !== e.code.replace('Key', ''));
    }

    movement() {
    
        if (this.moving.length != 0) {
            this.changePosition();
        }

        let playerHTML = document.getElementById(this.id);
        playerHTML.style.top  = `${this.y}px`;
        playerHTML.style.left = `${this.x}px`;

    }

    changePosition() {

        let gameStyle  = getComputedStyle(document.querySelector('#game'));
        let gameWidth  = parseInt(gameStyle.width.replace('px', ''));
        let gameHeight = parseInt(gameStyle.height.replace('px', ''));

        let canMoveLeft  = (0 < this.x);
        let canMoveUp    = (0 < this.y);
        let canMoveRight = (this.x + this.xSize < gameWidth);
        let canMoveDown  = (this.y + this.ySize < gameHeight);

        const DIAG_MULT = Math.sqrt(2) / 2;

        if (this.moving.includes('A') && this.moving.length == 1 && canMoveLeft) {
            this.x -= this.speed;
        }
        
        if (this.moving.includes('A') && this.moving.includes('W')) {
            if (canMoveLeft) { this.x -= this.speed * DIAG_MULT; }
            if (canMoveUp)   { this.y -= this.speed * DIAG_MULT; }
        }
        
        if (this.moving.includes('W') && this.moving.length == 1 && canMoveUp) {
            this.y -= this.speed;
        }
        
        if (this.moving.includes('W') && this.moving.includes('D')) {
            if (canMoveUp)    { this.y -= this.speed * DIAG_MULT; }
            if (canMoveRight) { this.x += this.speed * DIAG_MULT; }
        }

        if (this.moving.includes('D') && this.moving.length == 1 && canMoveRight) {
            this.x += this.speed;
        }
        
        if (this.moving.includes('D') && this.moving.includes('S')) {
            if (canMoveRight) { this.x += this.speed * DIAG_MULT; }
            if (canMoveDown)  { this.y += this.speed * DIAG_MULT; }
        }
        
        if (this.moving.includes('S') && this.moving.length == 1 && canMoveDown) {
            this.y += this.speed;
        }
        
        if (this.moving.includes('S') && this.moving.includes('A')) {
            if (canMoveDown) { this.y += this.speed * DIAG_MULT; }
            if (canMoveLeft) { this.x -= this.speed * DIAG_MULT; }
        }
        
    }

}