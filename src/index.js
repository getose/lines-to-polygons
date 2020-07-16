/**
 *
 * @param [[[x, y], [x, y]], ...] lines
 */
const linesToPolygons = (lines) => {
  const polygons = [];
  for (var i = 0; i < lines.length; i++) {
    // Récupération et suppression du tableau du premier élément
    const firstLine = lines.splice(i--, 1)[0];
    // create a new polygon array
    const polygon = [];
    // init current start point and current end point
    let currentStartPoint = firstLine[0];
    let currentEndPoint = firstLine[1];
    // put the 2 points of the first line on the polygon array
    polygon.push(currentStartPoint, currentEndPoint);
   
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
        ((currentEndPoint[0] === nextLine[0][0] &&
          currentEndPoint[1] === nextLine[0][1] &&
          currentStartPoint[0] === nextLine[1][0] &&
          currentStartPoint[1] === nextLine[1][1]) ||
          (currentStartPoint[0] === nextLine[0][0] &&
            currentStartPoint[1] === nextLine[0][1] &&
            currentEndPoint[0] === nextLine[1][0] &&
            currentEndPoint[1] === nextLine[1][1]))
      ) {
        polygons.push(polygon);
        break;
      }
      if (
        currentEndPoint[0] === nextLine[0][0] &&
        currentEndPoint[1] === nextLine[0][1]
      ) {
        // end point of the current line equals to start point of the next line
        polygon.push(nextLine[1]);
        // update current end point
        currentEndPoint = nextLine[1];
        // Suppression de la ligne dans le tableau
        lines.splice(--j, 1);
      } else if (
        currentStartPoint[0] === nextLine[0][0] &&
        currentStartPoint[1] === nextLine[0][1]
      ) {
        // start point of the current line equals to start point of the next line
        polygon.unshift(nextLine[1]);
        // update current start point
        currentStartPoint = nextLine[1];
        lines.splice(--j, 1);
      } else if (
        currentEndPoint[0] === nextLine[1][0] &&
        currentEndPoint[1] === nextLine[1][1]
      ) {
        // end point of the current line equals to end point of the next line
        polygon.push(nextLine[0]);
        // update current end point
        currentEndPoint = nextLine[0];
        lines.splice(--j, 1);
      } else if (
        currentStartPoint[0] == nextLine[1][0] &&
        currentStartPoint[1] == nextLine[1][1]
      ) {
        // start point of the current line equals to end point of the next line
        polygon.unshift(nextLine[0]);
        // update current start point
        currentStartPoint = nextLine[0];
        lines.splice(--j, 1);
      }
    }
  }
  return polygons;
};

export default linesToPolygons;
