# Lines to polygons

A JavaScript library to build polygons from an unordered list of independant lines.

## Geting started

### Install

Install with NPM

```console
npm install lines-to-polygons
```

### How to use

```js
var linesToPolygons = require("lines-to-polygons");

var polygons = linesToPolygons(lines);
```

## Example

![lines-to-polygon example](/ressources/lines-to-polygon-example.png)

- AB = [(3, 1), (5, 1)]
- DC = [(4, 4), (6, 3)]
- DE = [(4, 4), (2, 3)]
- CB = [(6, 3), (5, 1)]
- EA = [(2, 3), (3, 1)]

```js
var lines = [
  {
    // AB
    start: { x: 3, y: 1 },
    end: { x: 5, y: 1 }
  },
  {
    // DC
    start: { x: 4, y: 4 },
    end: { x: 6, y: 3 }
  },
  {
    // DE
    start: { x: 4, y: 4 },
    end: { x: 2, y: 3 }
  },
  {
    // CB
    start: { x: 6, y: 3 },
    end: { x: 5, y: 1 }
  },
  {
    // EA
    start: { x: 2, y: 3 },
    end: { x: 3, y: 1 }
  }
];

var polygons = linesToPolygons(lines);
// result [EA, AB, BC, CD, DE]
```

## Licence

MIT. Copyright (c) Florent Muller
