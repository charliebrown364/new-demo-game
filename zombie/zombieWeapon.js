class Weapon {

    constructor(id, damage) {

        this.id = id;
        this.damage = damage;

        this.x = undefined;
        this.y = undefined;
        this.location = undefined;

    }
    
    initialize(i) {
        
        // JS

        let gameStyle  = getComputedStyle(document.querySelector('#game'));
        let gameWidth  = parseInt(gameStyle.width.replace('px', ''));
        let gameHeight = parseInt(gameStyle.height.replace('px', ''));

        this.id = `${this.id}${i}`;
        this.x = (gameHeight - 50) * Math.random();
        this.y = (gameWidth  - 50) * Math.random();
        this.location = 'ground';

        // HTML & CSS

        let thingHTML = document.createElement("div");
        
        thingHTML.className = 'ground-weapon';
        thingHTML.classList.add(this.id);
        thingHTML.id = this.id;

        thingHTML.style.position = 'absolute';
        thingHTML.style.top    = `${this.y}px`;
        thingHTML.style.left   = `${this.x}px`;
        thingHTML.style.width  = '50px';
        thingHTML.style.height = '50px';
        thingHTML.style.backgroundColor = 'green';
        
        document.getElementById("game").appendChild(thingHTML);

    }

}

export default class Pistol extends Weapon {

    constructor() {
        super("pistol", 10);
    }

}