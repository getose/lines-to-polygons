"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var linesToPolygons = function linesToPolygons(lines) {
  var polygons = [];

  for (var i = 0; i < lines.length; i++) {
    var firstLine = lines.splice(i--, 1)[0];
    var polygon = [];
    var currentStartPoint = firstLine[0];
    var currentEndPoint = firstLine[1];
    polygon.push(currentStartPoint, currentEndPoint);
    var j = 0;
    var linesLength = lines.length;

    while (lines.length && (j < lines.length || linesLength != lines.length)) {
      if (j == lines.length) {
        j = 0;
        linesLength = lines.length;
      }

      var nextLine = lines[j++];

      if (polygon.length >= 3 && (currentEndPoint[0] === nextLine[0][0] && currentEndPoint[1] === nextLine[0][1] && currentStartPoint[0] === nextLine[1][0] && currentStartPoint[1] === nextLine[1][1] || currentStartPoint[0] === nextLine[0][0] && currentStartPoint[1] === nextLine[0][1] && currentEndPoint[0] === nextLine[1][0] && currentEndPoint[1] === nextLine[1][1])) {
        polygons.push(polygon);
        break;
      }

      if (currentEndPoint[0] === nextLine[0][0] && currentEndPoint[1] === nextLine[0][1]) {
        polygon.push(nextLine[1]);
        currentEndPoint = nextLine[1];
        lines.splice(--j, 1);
      } else if (currentStartPoint[0] === nextLine[0][0] && currentStartPoint[1] === nextLine[0][1]) {
        polygon.unshift(nextLine[1]);
        currentStartPoint = nextLine[1];
        lines.splice(--j, 1);
      } else if (currentEndPoint[0] === nextLine[1][0] && currentEndPoint[1] === nextLine[1][1]) {
        polygon.push(nextLine[0]);
        currentEndPoint = nextLine[0];
        lines.splice(--j, 1);
      } else if (currentStartPoint[0] == nextLine[1][0] && currentStartPoint[1] == nextLine[1][1]) {
        polygon.unshift(nextLine[0]);
        currentStartPoint = nextLine[0];
        lines.splice(--j, 1);
      }
    }
  }

  return polygons;
};

var _default = linesToPolygons;
exports["default"] = _default;
module.exports = exports.default;