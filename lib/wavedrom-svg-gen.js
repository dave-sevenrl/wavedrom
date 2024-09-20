console.log('This is a test JS application')

require('./wave-skin.js');
//require('./skins/default.js');

var WaveSkin;
var WaveDrom;


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
//  var val = WaveDrom.RenderAssign(0, obj, WaveSkin, notFirstSignal);
//  var svg = WaveDrom.CreateElement(val);
//  console.log('val: ' + val);
//  console.log('svg' + svg);
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