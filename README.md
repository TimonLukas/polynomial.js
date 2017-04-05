# Polynomial.js
Polynomial.js is a very simple and small library that helps with creating a polynomial function from points and afterwards to calculate points on it.

It is based on this StackOverflow answer: http://stackoverflow.com/a/9861559


All points supplied to the library must be objects with an x- and a y-property. To help you with this, I included a small class, "Point.js". Its' constructor will create such an object for you.
## Class
To make this easier I've included a class which gives a nice, clean API:

```javascript
const Curve = require("./Polynomial").Curve;

let points = [
    new Point(0, 5),
    new Point(9, 10),
    new Point(20, -3),
    new Point(50, 23123),
];

let curve = new Curve(points);

let y = curve.compute(5); // 130.03044
```

Calculating all values from 0 to 100 with the above curve would yield these points: http://pastebin.hursley.ibm.com/9117

## Manual API
If you want to do things manually, here is how:

To create the coefficients array, pass an array with all your points into the method `calculatePolynomialCoefficients`, like this:

```javascript
const Polynomial = require("./Polynomial");
const Point = require("./Point");

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
// assuming the coefficients were already calculated

let y = Polynomial.calculateValueForPolynomial(5, coefficients);
```

To confirm that this actually works you can just input your original x values, and should receive your original y values:

```javascript
points.forEach((point) => {
    let y = Polynomial.calculateValueForPolynomial(point.x, coefficients);
    console.log(point.y == y);
});
```