import Thing from "./spelunkyThing.js";

const GRAVITY = 1;

export default class Player extends Thing {

    constructor() {

        super(
            "player", // id
            0, // x
            0, // y
            0, // xBlock
            0, // yBlock
            40, // xSize
            40, // ySize
            'blue' // color
        );

        this.speed = 1;
        this.moving = [];
        this.coordsIn = [];

        this.jumping = false;
        this.jumpTarget = 0;
        this.jumpFalling = false;
        this.fallingVelocity = 0;

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
        const JUMP_HEIGHT = 3 * this.ySize;

        if (this.moving.includes('ArrowUp') && !this.jumping && !this.jumpFalling && !CAN_MOVE_DOWN) {
            this.jumping = true;
            this.jumpTarget = this.y - JUMP_HEIGHT;
        }

        if (this.jumping) {
            
            if (CAN_MOVE_UP && this.y > 0 && this.y > this.jumpTarget) {
                this.y -= GRAVITY; // add acceleration
            } else {
                this.jumping = false;
                this.jumpFalling = true;
            }
        
        } else { // gravity
            if (CAN_MOVE_DOWN) this.y += GRAVITY; // add acceleration
            else this.jumpFalling = false;
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