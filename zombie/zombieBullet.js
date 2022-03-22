export default class Bullet {
  
    constructor(player, gameState) {

        this.id = null;
        this.size = 10;
        this.x = player.x + (player.xSize - this.size) / 2;
        this.y = player.y + (player.ySize - this.size) / 2;
        this.xDir = null;
        this.yDir = null;
        this.speed = 5;

        this.create(gameState);
        
    }

    create(gameState) {

        gameState['bulletCounter']++;
        this.id = `bullet ${gameState['bulletCounter']}`

        // JS

        let bounds = document.getElementById("game").getBoundingClientRect();
        const mouseX = event.clientX - bounds.left;
        const mouseY = event.clientY - bounds.top;

        const OPPOSITE = Math.abs(mouseY - this.y);
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
        
        gameState['bulletList'].push(this);

        // HTML & CSS

        let bulletHTML = document.createElement("div");
        
        bulletHTML.className = 'bullet';
        bulletHTML.id = this.id;

        bulletHTML.style.position = 'absolute';
        bulletHTML.style.top    = `${this.y}px`;
        bulletHTML.style.left   = `${this.x}px`;
        bulletHTML.style.width  = `${this.size}px`;
        bulletHTML.style.height = `${this.size}px`;
        bulletHTML.style.backgroundColor = 'orange';

        document.getElementById("game").appendChild(bulletHTML);
        
    }

    update(gameState, i) {
        
        let gameStyle  = getComputedStyle(document.querySelector('#game'));
        let gameWidth  = parseInt(gameStyle.width.replace('px', ''));
        let gameHeight = parseInt(gameStyle.height.replace('px', ''));

        let XonScreen = -this.size < this.x && this.x < gameWidth + this.size;
        let YonScreen = -this.size < this.y && this.y < gameHeight + this.size;
        
        if (XonScreen && YonScreen) {
            
            this.x += this.xDir;
            this.y += this.yDir;

            let bulletHTML = document.getElementById(this.id);
            bulletHTML.style.top  = `${this.y}px`;
            bulletHTML.style.left = `${this.x}px`;
            
        } else {
            gameState['bulletList'].splice(i, 1);
            document.getElementById(this.id).remove();
        }
      
    }
    
    // attack(gameState) {
      
    //     for (let zombie of gameState['zombieList']) {
            
    //         let XinZombieX = zombie.x - 15 < this.x && this.x < zombie.x + 15;
    //         let YinZombieY = zombie.y - 15 < this.y && this.y < zombie.y + 15;
            
    //         if (XinZombieX && YinZombieY) {
    //             zombie.health -= this.damage;
    //         }
            
    //     }
      
    // }
    
  }