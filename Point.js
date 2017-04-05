const isnumber = require("isnumber");

module.exports = class Point {

    /**
     * Create a new point
     * @param {Number} x
     * @param {Number} y
     * @throws TypeError If a non-numerical parameter is supplied
     */
    constructor(x, y) {
        if (!isnumber(x) || !isnumber(y)) {
            throw new TypeError("Wrong argument supplied!");
        }

        this.x = Number(x);
        this.y = Number(y);
    }
};