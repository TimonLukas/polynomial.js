const chai = require("chai");
const should = chai.should;

const Point = require("./../Point");
const Curve = require("./../Curve");

describe("Curve", () => {
    describe("#compute", () => {
        it("should return the same values as initially put in", (done) => {
            let sets = [
                [
                    new Point(0, 0),
                ],
                [
                    new Point(1, 0),
                    new Point(17, 23),
                ],
                [
                    new Point(1, 5),
                    new Point(-5, 3),
                    new Point(17, 29),
                    new Point(1142, 2198323),
                    new Point(11713, 18721),
                ],
            ];

            sets.forEach((points) => {
                let curve = new Curve(points);
                points.forEach((point) => {
                    point.y.should.be.equal(curve.compute(point.x));
                });
            });

            done();
        });

        it("should compute the correct polynomial coefficients for the standard linear function", (done) => {
            let points = [
                new Point(0, 0),
                new Point(1, 1),
            ];

            let curve = new Curve(points);

            curve.coefficients.should.be.deep.equal([0, 1]);

            done();
        });
    });
});