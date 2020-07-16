# Lines to polygons

A JavaScript library to build polygons from an unordered list of independant lines.

## Getting started

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
  [
    // AB
    [3, 1],
    [5, 1],
  ],
  [
    // DC
    [4, 4],
    [6, 3],
  ],
  [
    // DE
    [4, 4],
    [2, 3],
  ],
  [
    // CB
    [6, 3],
    [5, 1],
  ],
  [
    // EA
    [2, 3],
    [3, 1],
  ],
];

var polygons = linesToPolygons(lines);
// result [E, A, B, C, D]
```

## Licence

MIT. Copyright (c) Florent Muller
