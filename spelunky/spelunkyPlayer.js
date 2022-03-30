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
            30, // xSize
            30, // ySize
            'blue' // color
        );

        this.speed = 1;
        this.moving = [];
        this.coordsIn = [];

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

        this.coordsIn = this.getCoordsIn();

        let playerHTML = document.getElementById(this.id);
        playerHTML.style.left = `${this.x}px`;
        playerHTML.style.top  = `${this.y}px`;
        
    }

    getCoordsIn() {

        let coordsIn = [[this.xBlock, this.yBlock]];
        let inNextX = this.x % 50 > 50 - this.xSize;
        let inNextY = this.y % 50 > 50 - this.ySize;

        if (inNextX)            coordsIn.push([this.xBlock + 1, this.yBlock    ]);
        if (inNextY)            coordsIn.push([this.xBlock    , this.yBlock + 1]);
        if (inNextX && inNextY) coordsIn.push([this.xBlock + 1, this.yBlock + 1]);

        return coordsIn;

    }

    changePosition(gameState) {
        
        // horizontal movement
        
        const CAN_MOVE_LEFT  = this.moving.includes('ArrowLeft')  && !this.moving.includes('ArrowRight') && this.x != 0 && this.canMoveLeft(gameState);
        const CAN_MOVE_RIGHT = this.moving.includes('ArrowRight') && !this.moving.includes('ArrowLeft')  && this.x != 500 - this.xSize && this.canMoveRight(gameState);

        if (CAN_MOVE_LEFT) {
            this.x -= this.speed;
        } else if (CAN_MOVE_RIGHT) {
            this.x += this.speed;
        }

        // jumping

        const CAN_MOVE_UP   = this.canMoveUp(gameState);
        const CAN_MOVE_DOWN = this.canMoveDown(gameState);

        if (this.moving.includes('ArrowUp') && !this.goingUp && !this.goingDown && !CAN_MOVE_DOWN) {
            this.goingUp = true;
        }

        if (this.goingUp && CAN_MOVE_UP) {
            
            if (this.y > 0) this.y -= 2 * GRAVITY;
            
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

    canMoveLeft(gameState) {
        for (let coords of this.coordsIn) {
            if (gameState['blockArray'][coords[1]][Math.floor((this.x - 1) / 50)] != '') return false;
        }
        return true;
    }

    canMoveRight(gameState) {
        for (let coords of this.coordsIn) {
            if (gameState['blockArray'][coords[1]][Math.floor((this.x + this.xSize + 1) / 50)] != '') return false;
        }
        return true;
    }

    canMoveUp(gameState) {
        for (let coords of this.coordsIn) {
            if (gameState['blockArray'][Math.max(0, Math.floor((this.y - 1) / 50))][coords[0]] != '') return false;
        }
        return true;
    }

    canMoveDown(gameState) {
        for (let coords of this.coordsIn) {
            if (gameState['blockArray'][Math.floor((this.y + this.ySize + 1) / 50)][coords[0]] != '') return false;
        }
        return true;
    }

}