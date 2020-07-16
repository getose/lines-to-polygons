var chai = require("chai");
var expect = chai.expect;
var linesToPolygons = require("../lib/lines-to-polygons").default;

describe("linesToPolygons", function () {
  var point00 = [0, 0];
  var point10 = [1, 0];
  var point11 = [1, 1];
  var point01 = [0, 1];
  var point30 = [3, 0];
  var point40 = [4, 0];
  var point41 = [4, 1];
  var point31 = [3, 1];
  var point62 = [6, 1];
  var point64 = [6, 4];
  var line1 = [point00, point10];
  var line2 = [point10, point11];
  var line3 = [point11, point01];
  var line4 = [point01, point00];
  var line4i = [point00, point01];
  var line5 = [point30, point40];
  var line6 = [point40, point41];
  var line7 = [point41, point31];
  var line8 = [point31, point30];
  var line9 = [point62, point64];

  it("linesToPolygons should return an empty array if an empty array is passed in", function () {
    expect(linesToPolygons([])).to.be.an("array").that.is.empty;
  });
  it("linesToPolygons should return an empty array if an array with 3 lines not closed is passed in", function () {
    expect(linesToPolygons([line1, line2, line3])).to.be.an("array").that.is
      .empty;
  });
  it("linesToPolygons should return 1 array if an array with 4 contiguous lines closed is passed in", function () {
    expect(linesToPolygons([line1, line2, line3, line4]))
      .to.be.an("array")
      .to.deep.equal([[point00, point10, point11, point01]]);
  });
  it("linesToPolygons should return 1 array if an array with 4 not contiguous lines closed is passed in", function () {
    expect(linesToPolygons([line1, line3, line2, line4]))
      .to.be.an("array")
      .to.deep.equal([[point01, point00, point10, point11]]);
  });
  it("linesToPolygons should return 1 array if an array with 4 not contiguous and not the same direction lines closed is passed in", function () {
    expect(linesToPolygons([line1, line4i, line2, line3]))
      .to.be.an("array")
      .to.deep.equal([[point01, point00, point10, point11]]);
  });
  it("linesToPolygons should return 2 arrays if an array with 8 not contiguous lines closed is passed in", function () {
    expect(
      linesToPolygons([line1, line5, line2, line3, line6, line7, line8, line4])
    )
      .to.be.an("array")
      .to.deep.equal([
        [point00, point10, point11, point01],
        [point30, point40, point41, point31],
      ]);
  });
  it("linesToPolygons should return 2 arrays if an array with 8 not contiguous lines closed and 1 line not in a polygon is passed in", function () {
    expect(
      linesToPolygons([
        line1,
        line5,
        line2,
        line3,
        line6,
        line9,
        line7,
        line8,
        line4,
      ])
    )
      .to.be.an("array")
      .to.deep.equal([
        [point00, point10, point11, point01],
        [point30, point40, point41, point31],
      ]);
  });
});
