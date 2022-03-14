class Thing {

    constructor(id, x, y, xSize, ySize, color) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.xSize = xSize;
        this.ySize = ySize;
        this.color = color;
    }

    initialize() {

        let gameHTML = document.getElementById("game");
        let thingHTML = document.createElement("div");
    
        thingHTML.id = this.id;
        
        thingHTML.style.position = 'relative';
        thingHTML.style.top    = numToPx(this.y);
        thingHTML.style.left   = numToPx(this.x);
        thingHTML.style.width  = numToPx(this.xSize);
        thingHTML.style.height = numToPx(this.ySize);
        thingHTML.style.backgroundColor = this.color;
    
        gameHTML.appendChild(thingHTML);

    }

}