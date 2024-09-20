console.log('This is a test JS application')

const waveSkin = require('./wave-skin.js');
const renderSignal = require('./render-signal.js');
const stringify = require('onml/stringify.js');
const w3 = require('./w3.js');

// print process.argv
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});

 const obj = eval('(' + '{ signal : [ \
  { name: "clk",  wave: "p......" }, \
  { name: "bus",  wave: "x.34.5x",   data: "head body tailasdfs" }, \
  { name: "wire", wave: "0.1..0." }, \
]}' + ')');
  console.log(obj);
  var arr = renderSignal(0, obj, waveSkin, 0);
  arr[1].xmlns = w3.svg;
  arr[1]['xmlns:xlink'] = w3.xlink;
  const svg = stringify(arr);
  //var svg = createElementString(val);
  //console.log('val: ' + val);
  //console.log('svg' + svg);
