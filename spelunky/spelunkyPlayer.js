class Player {

    constructor() {

        this.x = 0;
        this.y = 0;
        this.xSize = 50;
        this.ySize = 50;
        this.color = 'red';
        this.speed = 1;

        this.hasStartedMoving = false;
        this.moving = false;

    }

    initialize() {

        let gameHTML = document.getElementById("game");
        let playerHTML = document.createElement("div");
    
        playerHTML.id = "player";
        
        playerHTML.style.position = 'relative';
        playerHTML.style.top    = numToPx(this.y);
        playerHTML.style.left   = numToPx(this.x);
        playerHTML.style.width  = numToPx(this.xSize);
        playerHTML.style.height = numToPx(this.ySize);
        playerHTML.style.backgroundColor = this.color;
    
        gameHTML.appendChild(playerHTML);

    }

    move() {
    
        if (this.moving) {

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
        
            let playerHTML = document.getElementById("player");
            playerHTML.style.top  = numToPx(this.y);
            playerHTML.style.left = numToPx(this.x);
            
            this.hasStartedMoving = true;

        }

    }

}