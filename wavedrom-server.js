'use strict';
//const waveSkin = require('./lib/wave-skin.js');
//const renderSignal = require('./lib/render-signal.js');
//const stringify = require('onml/stringify.js');
//const w3 = require('./lib/w3.js');
//const fs = require("fs");
const express = require('express');
/*
const fs = require('fs');
const https = require('https');
*/

// print process.argv
//let json_fn = 'json_example.json';
//let svg_fn = 'wavedrom.svg';

const app = express ();
app.use(express.json());
app.use(express.urlencoded());

// Read command line
//process.argv.forEach(function (val, index, array) {
//  if ((val == '--json') || (val == '-j')) {
//    json_fn = process.argv[index+1];
//  }
//  if ((val == '--svg') || (val == '-s')) {
//    svg_fn = process.argv[index+1];
//  }
//});
//console.log('node wavedrom-svg-gen.js [-j/--json json_file.json] [-s/--svg svg_output.svg]')
//console.log('\nReading JSON ' + json_fn);
//console.log('Writing to ' + svg_fn);

// Read the JSON file and convert to an object
//var text = fs.readFileSync(json_fn, "utf-8");
//const obj = eval('(' + text + ')');
//console.log(obj);

// Render into SVG and release it
//var arr = renderSignal(0, obj, waveSkin, 0);
//arr[1].xmlns = w3.svg;
//arr[1]['xmlns:xlink'] = w3.xlink;
//console.log('svg' + svg);

// Render final SVG graphics
//const svg = stringify(arr);
//fs.writeFile(svg_fn, svg, (err) => {
//  if (err) throw err;
//})
const PORT = process.env.PORT || 3000;

/*
// Adds HTTPS server
const httpsOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
https.createServer(httpsOptions, app).listen(3000, () => {
  console.log('HTTPS server listening on port 3000');
});
// redirects http request to https
app.use((req, res, next) => {
  if (!req.secure) {
      return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});
*/
/*
https://realpython.com/api-integration-in-python/

POST /diagrams - Create a new diagram
GET /diagrams/<diagram_id>
PUT /diagrams/<diagram_id>
DELETE /diagrams/<diagram_id>





*/


app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT)
});

// It listens to HTTP get request. 
// Here it listens to the root i.e '/'
app.get("/", (req, res) => {

  // Using send function we send
  // response to the client
  // Here we are sending html
  const html = `<!doctype html>
<html lang="en-US">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>Testing Wavedrom script</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/wavedrom/3.1.0/skins/default.js" type="text/javascript"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/wavedrom/3.1.0/wavedrom.min.js" type="text/javascript"></script>
  
    </head>
<body onload="WaveDrom.ProcessAll()">
    <script type="WaveDrom">
  { signal : [
    { name: "clk",  wave: "p......" },
    { name: "bus",  wave: "x.34.5x",   data: "head body tailasdfs" },
    { name: "wire", wave: "0.1..0." },
  ]}
</script>
</body>
</html>`;

  //res.send("<h1>Hello World</h1>");
  res.send(html);
});

app.get("/status", (request, response) => {
  const status = {
    "Status" : "Running"
  };
  console.log("Got request, ", request);
  response.send(status);

});

function generateRandomID() {
  return Date.now().toString(36); // Generate a unique ID based on the current timestamp
}

// create object
function create_svg_from_json(json) { 
  var svg = "12345";
  return svg;
};

// create PNG from SVG
function create_png_from_svg(svg) {
  var png = svg + ".png";
  return png;
}

// ------------------------------------------
// Database object
// ------------------------------------------
var data_store = new Object();

// create the database iterm
function create_diagram_in_database() {

  console.log("create_diagram_in_database()");
  // Create Key + diagram ID
  var diagramId = generateRandomID();
  while (data_store.hasOwnProperty(diagramId)) { 
    console.log(diagramId);
    diagramId = generateRandomID();
  }
  var privateKey = generateRandomID();

  // Create Database object
  var data_object = new Object();
  data_object['diagramId'] = diagramId;
  data_object['privateKey'] = privateKey;
  data_object['svg'] = "";
  data_object['png'] = "";
  data_object['timestamp'] = Date.now()
  data_store[diagramId] = data_object;

  console.log("   diagramId = " + diagramId);
  console.log("   privateKey = " + privateKey);
  console.log("   timestamp = " + data_object["timestamp"]);

  // Get the response
  var resp_object = new Object();
  resp_object['diagramId'] = diagramId;
  resp_object['privateKey'] = privateKey;
  console.log('   resp = ' + resp_object);

  //return JSON.stringify(resp_object);
  return resp_object;

}

function check_diagram_id(diagramId, req_body) {
  if (("privateKey" in req_body) && ("json" in req_body)) {
    if (data_store.hasOwnProperty(diagramId))  {
      var data_object = data_store[diagramId];
      if (data_object["privateKey"] == req_body.privateKey) {
        return true;
      }
    }
  } 
  return false;
}

function update_diagram_in_database(diagramId, json) {
  
  var data_object = data_store[diagramId];
  var resp_object = new Object();

  console.log("update_digram_in_database("+diagramId+","+json+")");

  // Update JSON
  data_object['json'] = json;
  // create object
  var svg = create_svg_from_json(json);
  // create PNG
  var png = create_png_from_svg(svg);

  // Update database
  data_object['svg'] = svg;
  data_object['png'] = png;
  data_store[diagramId] = data_object;

  // update the response
  if ((svg != "") && (svg != "")) { 
    resp_object['svg'] = svg;
    resp_object['png'] = png;
  }

  // Get the response
  //console.log('   resp = ' + resp_object);

  //return JSON.stringify(resp_object);
  return resp_object;

}

function get_diagram_from_database(diagramId) {
  if (data_store.hasOwnProptery(diagramId)) { 
    return data_store[diagramId];
  } else { 
    return {};
  }
}

// ------------------------------------------
// REST-API objects
// ------------------------------------------

// creates a new ID
app.post('/diagrams', (req, res) => {    
  //const userID = generateRandomID();
  var status_code = 200;
  //console.log('Creating new ID '+userID); 
  //console.log(req.query); // object
  console.log('POST /diagrams: ' + req.body);
  var json_resp = create_diagram_in_database();
  res.status(status_code).json(json_resp);

//  var svg = "";
//  if ("json" in req.body) { 
//    svg = create_svg(req.body.json);
//    png = req.body
//  }
//  var png = create_png(svg);


//  var json_resp
//  if ()(svg == "") || (png == "")) {
//    status_code = 400;
//    var
//  }

 // var json_resp = create_diagram_in_database(svg, png);

  //req.body.diagramId = userID;
  //req.body.png = "ABDCD";
  //req.body.private_key = "ABDCD";
  //data_store[userID] = req.body;

  //var response = req.body;

  //req.body['diagram_id'] = userID
// / var email = req.body.email;
//  res.send(req.query);
})

app.put('/diagrams/:id', (req, res) => {    
  const diagramId = req.params.id;
  var status_code = 200;
  console.log("PUT request to update SVG/PNG on " + req.body);

  var json_resp = new Object();
  if (check_diagram_id(diagramId, req.body)) { 
    json_resp = update_diagram_in_database(diagramId, req.body.json);
    if (!("png" in json_resp)) { 
      status_code = 201;
    }
  } else { 
    status_code = 400;
  }

  res.status(status_code).json(json_resp);
})


//app.post('/userlogin', (req, res) => {    
//  console.log(req.body) // object
////  var email = req.body.email;
//})
app.get('/diagrams/:id', (req, res) => {    
  const userID = req.params.id;
  console.log("GET a request on " + userID);
  //console.log(req.query); // object
  console.log(data_store)
//  var email = req.body.email;
  res.status(200).json(data_store[userID])
//  res.send(req.query);
})