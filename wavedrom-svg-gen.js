'use strict';
const waveSkin = require('./lib/wave-skin.js');
const renderSignal = require('./lib/render-signal.js');
const stringify = require('onml/stringify.js');
const w3 = require('./lib/w3.js');
const fs = require("fs");

// print process.argv
let json_fn = 'json_example.json';
let svg_fn = 'wavedrom.svg';

// Read command line
process.argv.forEach(function (val, index, array) {
  if ((val == '--json') || (val == '-j')) {
    json_fn = process.argv[index+1];
  }
  if ((val == '--svg') || (val == '-s')) {
    svg_fn = process.argv[index+1];
  }
});
console.log('node wavedrom-svg-gen.js [-j/--json json_file.json] [-s/--svg svg_output.svg]')
console.log('\nReading JSON ' + json_fn);
console.log('Writing to ' + svg_fn);

// Read the JSON file and convert to an object
var text = fs.readFileSync(json_fn, "utf-8");
const obj = eval('(' + text + ')');
//console.log(obj);

// Render into SVG and release it
var arr = renderSignal(0, obj, waveSkin, 0);
arr[1].xmlns = w3.svg;
arr[1]['xmlns:xlink'] = w3.xlink;
//console.log('svg' + svg);

// Render final SVG graphics
const svg = stringify(arr);
fs.writeFile(svg_fn, svg, (err) => {
  if (err) throw err;
})
