// Source: http://stackoverflow.com/a/9861559

const round = function(number, precision) {
    let factor = Math.pow(10, precision);
    let tempNumber = number * factor;
    let roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
};

const zeros = (n) => {
    let array = new Array(n);
    for (let i = n; i--;) {
        array[i] = 0;
    }
    return array;
};

const denominator = (i, points) => {
    let result = 1;
    let x_i = points[i].x;
    for (let j = points.length; j--;) {
        if (i != j) {
            result *= x_i - points[j].x;
        }
    }
    return result;
};

const interpolationPolynomial = (i, points) => {
    let coefficients = zeros(points.length);
    coefficients[0] = 1 / denominator(i, points);
    let newCoefficients;

    for (let k = 0; k < points.length; k++) {
        if (k == i) {
            continue;
        }
        newCoefficients = zeros(points.length);
        for (let j = (k < i) ? k + 1 : k; j--;) {
            newCoefficients[j + 1] += coefficients[j];
            newCoefficients[j] -= points[k].x * coefficients[j];
        }
        coefficients = newCoefficients;
    }
    return coefficients;
};

const calculatePolynomialCoefficients = (points) => {
    let polynomial = zeros(points.length);
    let coefficients;
    for (let i = 0; i < points.length; i++) {
        coefficients = interpolationPolynomial(i, points);
        for (let k = 0; k < points.length; k++) {
            polynomial[k] += points[i].y * coefficients[k];
        }
    }
    return polynomial;
};

const calculateValueForPolynomial = (x, coefficients) => {
    let value = 0;
    coefficients.forEach((coefficient, index) => {
        if(index === 0) {
            value += coefficient;
        } else {
            value += coefficient * Math.pow(x, index);
        }
    });
    return round(value, 5);
};

module.exports = {
    calculatePolynomialCoefficients,
    calculateValueForPolynomial,
    Curve: require("./Curve"),
    Point: require("./Point"),
};