"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var linesToPolygons = function linesToPolygons(lines) {
  var polygons = [];

  for (var i = 0; i < lines.length; i++) {
    var currentLine = lines.splice(i--, 1)[0];
    var polygon = [];
    polygon.push(currentLine.start, currentLine.end);
    var currentstart = currentLine.start;
    var currentend = currentLine.end;
    var j = 0;
    var linesLength = lines.length;

    while (lines.length && (j < lines.length || linesLength != lines.length)) {
      if (j == lines.length) {
        j = 0;
        linesLength = lines.length;
      }

      var nextLine = lines[j++];

      if (polygon.length >= 3 && (currentend.x === nextLine.start.x && currentend.y === nextLine.start.y && currentstart.x === nextLine.end.x && currentstart.y === nextLine.end.y || currentstart.x === nextLine.start.x && currentstart.y === nextLine.start.y && currentend.x === nextLine.end.x && currentend.y === nextLine.end.y)) {
        polygons.push(polygon);
        break;
      }

      if (currentend.x === nextLine.start.x && currentend.y === nextLine.start.y) {
        polygon.push(nextLine.end);
        currentend = nextLine.end;
        lines.splice(--j, 1);
      } else if (currentstart.x === nextLine.start.x && currentstart.y === nextLine.start.y) {
        polygon.unshift(nextLine.end);
        currentstart = nextLine.end;
        lines.splice(--j, 1);
      } else if (currentend.x === nextLine.end.x && currentend.y === nextLine.end.y) {
        polygon.push(nextLine.start);
        currentend = nextLine.start;
        lines.splice(--j, 1);
      } else if (currentstart.x == nextLine.end.x && currentstart.y == nextLine.end.y) {
        polygon.unshift(nextLine.start);
        currentstart = nextLine.start;
        lines.splice(--j, 1);
      }
    }
  }

  return polygons;
};

var _default = linesToPolygons;
exports["default"] = _default;