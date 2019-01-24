var chai = require("chai");
var expect = chai.expect;
var linesToPolygons = require("../src/lines-to-polygons");

describe("linesToPolygons", function() {
  var point00 = { x: 0, y: 0 };
  var point10 = { x: 1, y: 0 };
  var point11 = { x: 1, y: 1 };
  var point01 = { x: 0, y: 1 };
  var point30 = { x: 3, y: 0 };
  var point40 = { x: 4, y: 0 };
  var point41 = { x: 4, y: 1 };
  var point31 = { x: 3, y: 1 };
  var line1 = { start: point00, end: point10 };
  var line2 = { start: point10, end: point11 };
  var line3 = { start: point11, end: point01 };
  var line4 = { start: point01, end: point00 };
  var line4i = { start: point00, end: point01 };
  var line5 = { start: point30, end: point40 };
  var line6 = { start: point40, end: point41 };
  var line7 = { start: point41, end: point31 };
  var line8 = { start: point31, end: point30 };

  it("linesToPolygons should return an empty array if an empty array is passed in", function() {
    expect(linesToPolygons([])).to.be.an("array").that.is.empty;
  });
  it("linesToPolygons should return an empty array if an array with 3 lines not closed is passed in", function() {
    expect(linesToPolygons([line1, line2, line3])).to.be.an("array").that.is
      .empty;
  });
  it("linesToPolygons should return 1 array if an array with 4 contiguous lines closed is passed in", function() {
    expect(linesToPolygons([line1, line2, line3, line4]))
      .to.be.an("array")
      .to.deep.equal([
        [{ line: line1 }, { line: line2 }, { line: line3 }, { line: line4 }]
      ]);
  });
  it("linesToPolygons should return 1 array if an array with 4 not contiguous lines closed is passed in", function() {
    expect(linesToPolygons([line1, line3, line2, line4]))
      .to.be.an("array")
      .to.deep.equal([
        [{ line: line4 }, { line: line1 }, { line: line2 }, { line: line3 }]
      ]);
  });
  it("linesToPolygons should return 1 array if an array with 4 not contiguous and not the same direction lines closed is passed in", function() {
    expect(linesToPolygons([line1, line4i, line2, line3]))
      .to.be.an("array")
      .to.deep.equal([
        [{ line: line4 }, { line: line1 }, { line: line2 }, { line: line3 }]
      ]);
  });
  it("linesToPolygons should return 2 arrays if an array with 8 not contiguous lines closed is passed in", function() {
    expect(
      linesToPolygons([line1, line5, line2, line3, line6, line7, line8, line4])
    )
      .to.be.an("array")
      .to.deep.equal([
        [{ line: line1 }, { line: line2 }, { line: line3 }, { line: line4 }],
        [{ line: line5 }, { line: line6 }, { line: line7 }, { line: line8 }]
      ]);
  });
});
