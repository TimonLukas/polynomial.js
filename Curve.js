const calculatePolynomialCoefficients = require("./Polynomial").calculatePolynomialCoefficients;
const calculateValueForPolynomial = require("./Polynomial").calculateValueForPolynomial;

module.exports = class Curve {

    /**
     * Construct the curve
     * @param {Array} points
     */
    constructor(points) {
        this.coefficients = calculatePolynomialCoefficients(points);
    }

    /**
     * Compute the function value at x
     * @param {number} x
     * @returns y
     */
    compute(x) {
        return calculateValueForPolynomial(x, this.coefficients);
    }
};