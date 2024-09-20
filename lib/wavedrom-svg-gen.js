console.log('This is a test JS application')

//const { JSDOM } = require("jsdom");
//var dom = new JSDOM(`<html><body></body></html>`);
//const parser = new dom.window.DOMParser();

//console.log('dom.window: ' + dom.window);
//var window = dom.window;

const WaveSkin = require('./wave-skin.js');
require('./wave-drom.js');
//require('./render-signal.js');
//require('./skins/default.js');

console.log(WaveSkin)
//var WaveSkin = WaveSkin || {};
//var WaveDrom;


const stringify = require('onml/stringify.js');
const w3 = require('./w3.js');

function createElementString (arr) {
    arr[1].xmlns = w3.svg;
    arr[1]['xmlns:xlink'] = w3.xlink;
    const s1 = stringify(arr);
    return s1;
    // const s2 = s1.replace(/&/g, '&amp;');
    //const parser = new DOMParser();
    //const doc = parser.parseFromString(s1, 'image/svg+xml');
    //return doc.firstChild;
}



 //WaveDrom.RenderWaveForm();
 const obj = eval('(' + '{ signal : [ \
  { name: "clk",  wave: "p......" }, \
  { name: "bus",  wave: "x.34.5x",   data: "head body tailasdfs" }, \
  { name: "wire", wave: "0.1..0." }, \
]}' + ')');
  console.log(obj);
  var notFirstSignal = 0;
  //renderWaveForm(0, obj, "WaveDrom_Display_", notFirstSignal);
  console.log(global.WaveDrom.version);
  //var val = global.WaveDrom.RenderSignal(0, obj, global.WaveSkin, notFirstSignal);
  var val = global.WaveDrom.RenderSignal(0, obj, WaveSkin, notFirstSignal);
  var svg = createElementString(val);
  console.log('val: ' + val);
  console.log('svg' + svg);
//  write_document(svg);

//console.log(WaveSkin);

/*
function myFunction() {
    //WaveDrom.ProcessAll();
   // renderWaveElement();
    //doGet();
    //WaveDrom.RenderWaveForm();
    const obj = eval('(' + '{ signal : [ \
    { name: "clk",  wave: "p......" }, \
    { name: "bus",  wave: "x.34.5x",   data: "head body tailasdfs" }, \
    { name: "wire", wave: "0.1..0." }, \
  ]}' + ')');
    console.log(obj);
    var notFirstSignal = 0;
    //renderWaveForm(0, obj, "WaveDrom_Display_", notFirstSignal);
    console.log(WaveDrom.version);
    var val = WaveDrom.RenderAssign(0, obj, WaveSkin, notFirstSignal);
    var svg = WaveDrom.CreateElement(val);
    console.log('val: ' + val);
    console.log('svg' + svg);
    write_document(svg);
    //console.log(val[1].version);
  }

 */