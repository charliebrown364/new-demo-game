import Thing from "./spelunkyThing.js";

export default class Block extends Thing {

    constructor(x, y) {
        super("block", 50 * x, 50 * y, x, y, 50, 50, 'red');
    }

}