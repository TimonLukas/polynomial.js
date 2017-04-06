# polynomial.js
Polynomial.js is a very simple and small library that helps you calculate polynomial coefficients from points and calculating points based on the curve they represent.

It is based on this StackOverflow answer: http://stackoverflow.com/a/9861559

## Installation
Simply use `npm` or `yarn` to install the package:
```bash
npm install polynomial.js
```
```bash
yarn install polynomial.js
```

## Notes
* All points supplied to the library must be objects with an x- and a y-property.
* To help you with this, you can use the exported class `Point` (`require("polynomial.js").Point`). Its' constructor will create such an object for you. It will throw a TypeError if a non-numerical value is supplied.  
* Calculating all values from 0 to 100 with the above curve would yield these points: https://pastebin.com/Ucz92TTe

## Example
```javascript
const Curve = require("polynomial.js").Curve;

let points = [
    new Point(0, 5),
    new Point(9, 10),
    new Point(20, -3),
    new Point(50, 23123),
];

let curve = new Curve(points);

let y = curve.compute(5); // 130.03044
```

## Manual API
To create the coefficients array, pass an array with all your points into the method `calculatePolynomialCoefficients`, like this:

```javascript
const Polynomial = require("polynomial.js");
const Point = Polynomial.Point;

let points = [
    new Point(0, 5),
    new Point(9, 10),
    new Point(20, -3),
    new Point(50, 23123),
];

let coefficients = Polynomial.calculatePolynomialCoefficients(points);
```

To calculate a point using those coefficients you can use the method `calculateValueForPolynomial`:

```javascript
let y = Polynomial.calculateValueForPolynomial(5, coefficients);
```

To confirm that this actually works you can just input your original x values, and should receive your original y values:

```javascript
points.forEach((point) => {
    let y = Polynomial.calculateValueForPolynomial(point.x, coefficients);
    console.log(point.y === y);
});
```

## Tests
To run the tests, simply type `npm run test`. For coverage run `npm run cover`. `istanbul`, `mocha` and `chai` are included as dev dependencies.

## Credits
Many thanks to:
* [Daniel Fischer](http://stackoverflow.com/users/1011995/daniel-fischer) on StackOverflow. He wrote all the code that makes this library work, I just gave it a nice API and published it. All credit goes to him!
* [Tobias Rahloff](https://github.com/trahloff) helped me out with tests and all that. Without him I most likely would have never published this!