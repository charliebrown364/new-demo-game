import Thing from "./spelunkyThing.js";

export default class Dirt extends Thing {

    constructor(x, y) {

        super(
            "block", // id
            50 * x, // x
            50 * y, // y
            x, // xBlock
            y, // yBlock
            50, // xSize
            50, // ySize
            '#543700' // color
        );

    }

}