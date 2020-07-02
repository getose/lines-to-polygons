/**
 *
 * @param [{{start : {x, y}, end : {x, y}}] lines
 */
const linesToPolygons = (lines) => {
  const polygons = [];
  for (var i = 0; i < lines.length; i++) {
    // Récupération et suppression du tableau du premier élément
    const currentLine = lines.splice(i--, 1)[0];
    // create a new polygon array
    const polygon = [];
    // put the 2 points of the first line on the polygon array
    polygon.push(currentLine.start, currentLine.end);
    // initi current start point and current end point
    let currentstart = currentLine.start;
    let currentend = currentLine.end;
    let j = 0;
    // init the linesLength
    let linesLength = lines.length;
    while (lines.length && (j < lines.length || linesLength != lines.length)) {
      // if j == lines.length, we have to return to the first index and redefine linesLength to the new lines.length
      if (j == lines.length) {
        j = 0;
        linesLength = lines.length;
      }
      // The nextLine in the array
      const nextLine = lines[j++];
      // min 3 lines to have a closed polygon
      // check if the polygon is closed (the nextLine start point is one of the current start or end point and the nextLine end point is one of the current start or end point)
      if (
        polygon.length >= 3 &&
        ((currentend.x === nextLine.start.x &&
          currentend.y === nextLine.start.y &&
          currentstart.x === nextLine.end.x &&
          currentstart.y === nextLine.end.y) ||
          (currentstart.x === nextLine.start.x &&
            currentstart.y === nextLine.start.y &&
            currentend.x === nextLine.end.x &&
            currentend.y === nextLine.end.y))
      ) {
        polygons.push(polygon);
        break;
      }
      if (
        currentend.x === nextLine.start.x &&
        currentend.y === nextLine.start.y
      ) {
        // end point of the current line equals to start point of the next line
        polygon.push(nextLine.end);
        // update current end point
        currentend = nextLine.end;
        // Suppression de la ligne dans le tableau
        lines.splice(--j, 1);
      } else if (
        currentstart.x === nextLine.start.x &&
        currentstart.y === nextLine.start.y
      ) {
        // start point of the current line equals to start point of the next line
        polygon.unshift(nextLine.end);
        // update current start point
        currentstart = nextLine.end;
        lines.splice(--j, 1);
      } else if (
        currentend.x === nextLine.end.x &&
        currentend.y === nextLine.end.y
      ) {
        // end point of the current line equals to end point of the next line
        polygon.push(nextLine.start);
        // update current end point
        currentend = nextLine.start;
        lines.splice(--j, 1);
      } else if (
        currentstart.x == nextLine.end.x &&
        currentstart.y == nextLine.end.y
      ) {
        // start point of the current line equals to end point of the next line
        polygon.unshift(nextLine.start);
        // update current start point
        currentstart = nextLine.start;
        lines.splice(--j, 1);
      }
    }
  }
  return polygons;
};

export default linesToPolygons;
