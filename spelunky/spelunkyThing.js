export default class Thing {

    constructor(id, x, y, xBlock, yBlock, xSize, ySize, color) {

        this.id = id;
        this.x = x;
        this.y = y;
        this.xBlock = xBlock;
        this.yBlock = yBlock;
        this.xSize = xSize;
        this.ySize = ySize;
        this.color = color;

        this.initialize();

    }

    initialize() {

        let thingHTML = document.createElement("div");
    
        thingHTML.id = this.id;
        
        thingHTML.style.position = 'absolute';
        thingHTML.style.top    = `${this.y}px`;
        thingHTML.style.left   = `${this.x}px`;
        thingHTML.style.width  = `${this.xSize}px`;
        thingHTML.style.height = `${this.ySize}px`;
        thingHTML.style.backgroundColor = this.color;
    
        document.getElementById("game").appendChild(thingHTML);

    }

}