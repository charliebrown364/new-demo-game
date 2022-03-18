export default class Thing {

    constructor(id, x, y, xSize, ySize, color, speed, health) {

        this.id = id;
        this.x = x;
        this.y = y;
        this.xSize = xSize;
        this.ySize = ySize;
        this.color = color;

        this.speed = speed;
        this.health = health;

    }

    initialize() {

        let gameHTML = document.getElementById("game");
        let thingHTML = document.createElement("div");
    
        thingHTML.id = this.id;
        
        thingHTML.style.position = 'relative';
        thingHTML.style.top    = `${this.y}px`;
        thingHTML.style.left   = `${this.x}px`;
        thingHTML.style.width  = `${this.xSize}px`;
        thingHTML.style.height = `${this.ySize}px`;
        thingHTML.style.backgroundColor = this.color;
    
        gameHTML.appendChild(thingHTML);

    }

}