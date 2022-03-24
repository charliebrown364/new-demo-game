import Thing from "./spelunkyThing.js";

export default class Player extends Thing {

    constructor() {
        super("player", 0, 0, 0, 0, 50, 50, 'blue');
        this.speed = 1;
        this.moving = [];
        this.gameState = null;
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

        gameState['onGround'] = this.onGround(gameState);

        this.changePosition(gameState);

        this.xBlock = Math.floor(this.x / 50);
        this.yBlock = Math.floor(this.y / 50);

        let playerHTML = document.getElementById(this.id);
        playerHTML.style.left = `${this.x}px`;
        playerHTML.style.top = `${this.y}px`;
        
    }

    changePosition(gameState) {
        
        if (gameState['onGround']) {
            
            const CAN_MOVE_LEFT  = this.moving.includes('ArrowLeft') && !this.moving.includes('ArrowRight');
            const CAN_MOVE_RIGHT = this.moving.includes('ArrowRight') && !this.moving.includes('ArrowLeft');
        
            if (CAN_MOVE_LEFT) {
                this.x -= this.speed;
            } else if (CAN_MOVE_RIGHT) {
                this.x += this.speed;
            }

        } else {
            this.y += 1;
        }

    }

    onGround(gameState) {

        for (let i = 0; i < 16; i++) {
            for (let j = 0; j < 16; j++) {

                let block = gameState['blockArray'][i][j];
                if (!block) continue;

                if (this.yBlock + 1 == block.yBlock) {
                    return true;
                }

            }
        }

        return false;

    }

}