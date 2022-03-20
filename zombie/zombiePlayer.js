import Thing from "./zombieObject.js";

export default class Player extends Thing {

    constructor() {
        super("player", 0, 0, 50, 50, 'blue', 1, 100);
        this.moving = [];
        this.inventory = [];
        this.currentWeapon = null;
    }

    update(gameState) {
        this.updateMovement();
        this.updateWeapon(gameState);
    }

    startMoving(letter) {
        if (!this.moving.includes(letter)) {
            this.moving.push(letter);
        }
    }

    stopMoving(letter) {
        this.moving = this.moving.filter(elem => elem != letter);
    }

    updateMovement() {

        if (this.moving.length != 0) {

            this.changePosition();

            let playerHTML = document.getElementById(this.id);
            playerHTML.style.top  = `${this.y}px`;
            playerHTML.style.left = `${this.x}px`;

        }

    }

    changePosition() {

        let gameStyle  = getComputedStyle(document.querySelector('#game'));
        let gameWidth  = parseInt(gameStyle.width.replace('px', ''));
        let gameHeight = parseInt(gameStyle.height.replace('px', ''));
        
        const CAN_MOVE_LEFT  = this.moving.includes('A') && !this.moving.includes('D') && (0 < this.x);
        const CAN_MOVE_UP    = this.moving.includes('W') && !this.moving.includes('S') && (0 < this.y);
        const CAN_MOVE_RIGHT = this.moving.includes('D') && !this.moving.includes('A') && (this.x + this.xSize < gameWidth);
        const CAN_MOVE_DOWN  = this.moving.includes('S') && !this.moving.includes('W') && (this.y + this.ySize < gameHeight);

        const DIAG_SPEED = this.speed * Math.sqrt(2) / 2;

        if (CAN_MOVE_UP && CAN_MOVE_LEFT) {
            this.x -= DIAG_SPEED;
            this.y -= DIAG_SPEED;
        }
        
        else if (CAN_MOVE_UP && CAN_MOVE_RIGHT) {
            this.x += DIAG_SPEED;
            this.y -= DIAG_SPEED;
        }
        
        else if (CAN_MOVE_DOWN && CAN_MOVE_LEFT) {
            this.x -= DIAG_SPEED;
            this.y += DIAG_SPEED;
        }
        
        else if (CAN_MOVE_DOWN && CAN_MOVE_RIGHT) {
            this.x += DIAG_SPEED;
            this.y += DIAG_SPEED;
        }
        
        else if (CAN_MOVE_UP) {
            this.y -= this.speed;
        }
        
        else if (CAN_MOVE_DOWN) {
            this.y += this.speed;
        }
        
        else if (CAN_MOVE_LEFT) {
            this.x -= this.speed;
        }
        
        else if (CAN_MOVE_RIGHT) {
            this.x += this.speed;
        
        }

    }

    pickUpItem(gameState) {
    
        for (let weapon of gameState['weaponsList']) {
            
            const DIST = Math.sqrt((this.x - weapon.x) ** 2 + (this.y - weapon.y) ** 2);
            
            if (weapon.location == 'ground' && DIST <= 50) {

                if (this.inventory.length == 0) {
                    this.currentWeapon = weapon;
                }

                this.inventory.push(weapon);
                weapon.location = 'inventory';

                let weaponHTML = document.getElementById(weapon.id);
                weaponHTML.classList.remove("ground-weapon");
                weaponHTML.classList.add("inventory-weapon");

            }
        
        }
      
    }

    updateWeapon(gameState) {
        
        for (let weapon of gameState['weaponsList']) {
            if (weapon.location == 'inventory') {

                let weaponHTML = document.getElementById(weapon.id);

                if (weapon === this.currentWeapon) {
                    weaponHTML.style.top  = `${this.y}px`;
                    weaponHTML.style.left = `${this.x}px`;
                } else {
                    weaponHTML.style.visibility = 'hidden';
                }

            }
        }

    }

}