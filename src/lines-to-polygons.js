/**
 *
 * @param {[{start : {x, y}, end : {x, y}}] lines
 */
function linesToPolygons(lines) {
  var polygons = [];
  for (var i = 0; i < lines.length; i++) {
    // Récupération et suppression du tableau du premier élément
    var currentLine = lines.splice(i--, 1)[0];
    // create a new polygon array
    var polygon = [];
    // put the first line on the polygon array
    polygon.push({ line: currentLine });
    // initi current start point and current end point
    var currentstart = currentLine.start;
    var currentend = currentLine.end;
    var j = 0;
    // init the linesLength
    var linesLength = lines.length;
    while (lines.length && (j < lines.length || linesLength != lines.length)) {
      // if j == lines.length, we have to return to the first index and redefine linesLength to the new lines.length
      if (j == lines.length) {
        j = 0;
        linesLength = lines.length;
      }
      // The nextLine in the array
      var nextLine = lines[j++];
      var nextstart = nextLine.start;
      var nextend = nextLine.end;
      if (
        currentend.x === nextLine.start.x &&
        currentend.y === nextLine.start.y
      ) {
        // the end point of the current line equals to the start point of the next line
        polygon.push({ line: nextLine });
        // update to the new end point
        currentend = nextLine.end;
        // Suppression de la ligne dans le tableau
        lines.splice(--j, 1);
      } else if (
        currentstart.x === nextLine.start.x &&
        currentstart.y === nextLine.start.y
      ) {
        // the start point of the current line equals to the start point of the next line
        // switch the start point and the end point for the next line
        nextLine.start = nextend;
        nextLine.end = nextstart;
        polygon.unshift({ line: nextLine });
        currentstart = nextLine.start;
        lines.splice(--j, 1);
      } else if (
        currentend.x === nextLine.end.x &&
        currentend.y === nextLine.end.y
      ) {
        // the end point of the current line equals to the end point of the next line
        // console.log("end -> endPint");
        nextLine.start = nextend;
        nextLine.end = nextstart;
        polygon.push({ line: nextLine });
        lines.splice(--j, 1);
      } else if (
        currentstart.x == nextLine.end.x &&
        currentstart.y == nextLine.end.y
      ) {
        // the start point of the current line equals to the end point of the next line
        // console.log("start -> end");
        polygon.unshift({ line: nextLine });
        // Mise à jour du nouveau point de départ courant
        currentstart = nextLine.start;
        lines.splice(--j, 1);
      }
      // min 3 lines to have a closed polygon
      // check if the polygon is closed (the first line start point equals to the last line end point)
      if (
        polygon.length >= 3 &&
        polygon[0].line.start.x == polygon[polygon.length - 1].line.end.x &&
        polygon[0].line.start.y == polygon[polygon.length - 1].line.end.y
      ) {
        polygons.push(polygon);
        break;
      }
    }
  }
  return polygons;
}

module.exports = linesToPolygons;
