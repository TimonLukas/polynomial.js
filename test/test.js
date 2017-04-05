const chai = require("chai");
const should = chai.should();

const library = require("./../index");
const Point = library.Point;
const Curve = library.Curve;

describe("Point", () => {
    describe("#constructor", () => {
        it("should store the supplied values", (done) => {
            const max = 10;

            for (let i = -10; i < max; i++) {
                let point = new Point(i, max - i);
                point.x.should.be.equal(i);
                point.y.should.be.equal(max - i);
            }

            done();
        });

        it("should throw an error if non-numerical parameters are supplied", (done) => {
            let fn = (param1, param2) => {
                return new Point(param1, param2);
            };

            let params = [
                null,
                undefined,
                [],
                {},
                "a",
            ];

            for(let i = 0; i < params.length; i++) {
                for(let j = 0; j < params.length; j++) {
                    (() => {
                        fn(params[i], params[j]);
                    }).should.throw(TypeError);
                }
            }

            done();
        });
    });
});

describe("Curve", () => {
    describe("#constructor", () => {
        it("should compute the correct polynomial coefficients for the standard linear function", (done) => {
            let points = [
                new Point(0, 0),
                new Point(1, 1),
            ];

            let curve = new Curve(points);

            curve.coefficients.should.be.deep.equal([0, 1]);

            done();
        });

        it("should compute the correct polynomial coefficients for the standard quadratic function", (done) => {
            let points = [
                new Point(0, 0),
                new Point(1, 1),
                new Point(2, 4),
            ];

            let curve = new Curve(points);

            curve.coefficients.should.be.deep.equal([0, 0, 1]);

            done();
        });

        it("should compute the correct polynomial coefficients for the standard cubic function", (done) => {
            let points = [
                new Point(0, 0),
                new Point(1, 1),
                new Point(2, 8),
                new Point(3, 27),
            ];

            let curve = new Curve(points);

            curve.coefficients.should.be.deep.equal([0, 0, 0, 1]);

            done();
        });
    });

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
    });
});