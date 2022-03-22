export default class Bullet {
  
    constructor(player, gameState) {

        this.x = player.x;
        this.y = player.y;
        this.xDir = null;
        this.yDir = null;
        this.size = 10;
        this.speed = 10;

        this.fit(gameState);
        
    }

    fit(gameState) {

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const OPPOSITE = Math.abs(mouseX - this.y);
        const HYPOTENUSE = Math.sqrt((mouseX - this.x) ** 2 + (mouseY - this.y) ** 2);
        const SIN = OPPOSITE / HYPOTENUSE;
        const COS = Math.cos(Math.asin(SIN));
        
        if (this.x < mouseX) {
            this.xDir = 1 * this.speed * COS;
        }
        if (this.x > mouseX) {
            this.xDir = -1 * this.speed * COS;
        }
        if (this.y < mouseY) {
            this.yDir = 1 * this.speed * SIN;
        }
        if (this.y > mouseY) {
            this.yDir = -1 * this.speed * SIN;
        }
        
        gameState['existingBullets'].push(this);
        
    }

    update(gameState, i) {
        
        let gameStyle  = getComputedStyle(document.querySelector('#game'));
        let gameWidth  = parseInt(gameStyle.width.replace('px', ''));
        let gameHeight = parseInt(gameStyle.height.replace('px', ''));

        let XonScreen = -this.size < this.x && this.x < gameWidth + this.size;
        let YonScreen = -this.size < this.y && this.y < gameHeight + this.size;
        
        if (XonScreen && YonScreen) {
            
            let bulletHTML = document.createElement("div");
    
            bulletHTML.className = 'bullet';
            
            bulletHTML.style.position = 'absolute';
            bulletHTML.style.top    = `${this.y}px`;
            bulletHTML.style.left   = `${this.x}px`;
            bulletHTML.style.width  = `${this.size}px`;
            bulletHTML.style.height = `${this.size}px`;
            bulletHTML.style.backgroundColor = 'orange';
        
            document.getElementById("game").appendChild(bulletHTML);

            this.x += this.xDir;
            this.y += this.yDir;
            
        } else {
            gameState['existingBullets'].splice(i, 1);
        }
      
    }
    
    attack() {
      
        for (var zombie of existingZombies) {
            
            let XinZombieX = zombie.x - 15 < this.x && this.x < zombie.x + 15;
            let YinZombieY = zombie.y - 15 < this.y && this.y < zombie.y + 15;
            
            if (XinZombieX && YinZombieY) {
                zombie.health -= this.damage;
            }
            
        }
      
    }
    
  }