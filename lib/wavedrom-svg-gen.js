console.log('This is a test JS application')

const waveSkin = require('./wave-skin.js');
const renderSignal = require('./render-signal.js');
const stringify = require('onml/stringify.js');
const w3 = require('./w3.js');

// print process.argv
let json_fn = 'wavedrom_example.json';
let svg_fn = 'wavedrom.svg';

console.log(process.argv.length)
process.argv.forEach(function (val, index, array) {
  if ((val == '--json') || (val == '-j')) {
    json_fn = process.argv[index+1];
  }
  if ((val == '--svg') || (val == '-s')) {
    svg_fn = process.argv[index+1];
  }
  console.log(index + ': ' + val);
});
console.log('Reading JSON from ' + json_fn);
console.log('Saving SVG into ' + svg_fn);


var fs = require("fs");
var text = fs.readFileSync(json_fn, "utf-8");
console.log(text);
//console.log(config.firstName + ' ' + config.lastName);
const obj = eval('(' + text + ')');
//const obj2 = text;

// const obj = eval('(' + '{ signal : [ \
//  { name: "clk",  wave: "p......" }, \
//  { name: "bus",  wave: "x.34.5x",   data: "head body tailasdfs" }, \
//  { name: "wire", wave: "0.1..0." }, \
//]}' + ')');

  console.log(obj);
  var arr = renderSignal(0, obj, waveSkin, 0);
  arr[1].xmlns = w3.svg;
  arr[1]['xmlns:xlink'] = w3.xlink;
  const svg = stringify(arr);
  //console.log('svg' + svg);

  fs.writeFile(svg_fn, svg, (err) => {
    if (err) throw err;
  })
