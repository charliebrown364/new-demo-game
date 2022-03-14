class Player extends Thing {

    constructor() {

        super("player", 0, 0, 50, 50, 'red');

        this.speed = 1;
        this.moving = false;
        this.hasStartedMoving = false;

    }

    move() {
    
        if (this.moving) {
            this.changePosition();
            this.hasStartedMoving = true;
        }

        let playerHTML = document.getElementById("player");
        playerHTML.style.top  = numToPx(this.y);
        playerHTML.style.left = numToPx(this.x);

    }

    changePosition() {

        let gameStyle  = getComputedStyle(document.querySelector('#game'));
        let gameWidth  = PxToNum(gameStyle.width);
        let gameHeight = PxToNum(gameStyle.height);

        let canMoveLeft  = (0 < this.x);
        let canMoveUp    = (0 < this.y);
        let canMoveRight = (this.x + this.xSize < gameWidth);
        let canMoveDown  = (this.y + this.ySize < gameHeight);
        
        if (this.moving == 'A' && canMoveLeft) {
            this.x -= this.speed;
        } else if (this.moving == 'W' && canMoveUp) {
            this.y -= this.speed;
        } else if (this.moving == 'D' && canMoveRight) {
            this.x += this.speed;
        } else if (this.moving == 'S' && canMoveDown) {
            this.y += this.speed;
        }

    }

}