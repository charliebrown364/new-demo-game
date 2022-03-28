import Thing from "./spelunkyThing.js";

const GRAVITY = 2.5;

export default class Player extends Thing {

    constructor() {

        super(
            "player", // id
            0, // x
            0, // y
            0, // xBlock
            0, // yBlock
            50, // xSize
            50, // ySize
            'blue' // color
        );

        this.speed = 1;
        this.moving = [];

        this.goingUp = false;
        this.goingDown = false;
        this.goingUpTimer = false;
        this.goingDownTimer = false;

    }

    startMoving(letter) {
        if (!this.moving.includes(letter)) {
            this.moving.push(letter);
        }
    }

    stopMoving(letter) {
        this.moving = this.moving.filter(elem => elem != letter);
    }

    updateMovement(gameState) {

        this.changePosition(gameState);

        this.xBlock = Math.floor(this.x / 50);
        this.yBlock = Math.floor(this.y / 50);

        let playerHTML = document.getElementById(this.id);
        playerHTML.style.left = `${this.x}px`;
        playerHTML.style.top  = `${this.y}px`;
        
    }

    changePosition(gameState) {
        
        // horizontal movement
        
        const CAN_MOVE_LEFT  = this.moving.includes('ArrowLeft')  && !this.moving.includes('ArrowRight') && this.x != 0;
        const CAN_MOVE_RIGHT = this.moving.includes('ArrowRight') && !this.moving.includes('ArrowLeft')  && this.x != 450;

        if (CAN_MOVE_LEFT && this.canMoveLeft(gameState)) {
            this.x -= this.speed;
        } else if (CAN_MOVE_RIGHT && this.canMoveRight(gameState)) {
            this.x += this.speed;
        }

        // jumping

        const CAN_MOVE_UP   = this.canMoveUp(gameState);
        const CAN_MOVE_DOWN = this.canMoveDown(gameState);

        if (this.moving.includes('ArrowUp') && !this.goingUp && !this.goingDown) {
            this.goingUp = true;
        }

        if (this.goingUp) {
            
            this.y -= 2 * GRAVITY;
            
            if (!this.goingUpTimer) {
                this.goingUpTimer = true;
                setTimeout(() => {
                    this.goingUp = false;
                    this.goingUpTimer = false;
                    this.goingDown = true;
                }, 200);
            }
        
        }

        if (this.goingDown && CAN_MOVE_DOWN) {

            if (!this.goingDownTimer) {
                this.goingDownTimer = true;
                setTimeout(() => {
                    this.goingDown = false;
                    this.goingDownTimer = false;
                }, 200);
            }

        }

        // gravity

        if (CAN_MOVE_DOWN) {
            this.y += GRAVITY;
        }

    }

    canMoveUp(gameState) {
        return gameState['blockArray'][Math.max(0, this.yBlock - 1)][this.xBlock] == '';
    }

    canMoveDown(gameState) {
        return gameState['blockArray'][this.yBlock + 1][this.xBlock] == '';
    }

    canMoveLeft(gameState) {
        return gameState['blockArray'][this.yBlock][this.xBlock] == '';
    }

    canMoveRight(gameState) {
        return gameState['blockArray'][this.yBlock][this.xBlock + 1] == '';
    }

}