'use strict';
const waveSkin = require('./lib/wave-skin.js');
const renderSignal = require('./lib/render-signal.js');
const stringify = require('onml/stringify.js');
const w3 = require('./lib/w3.js');
const fs = require("fs");
const sharp = require('sharp');
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

// Render final SVG graphics
//const svg = stringify(arr);
//fs.writeFile(svg_fn, svg, (err) => {
//  if (err) throw err;
//})
const PORT = process.env.PORT || 3000;

var data_store = new Object();

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

  // Read the HTML and serve it
  let html_fn = 'wavedrom-server.html'
  var html_text = fs.readFileSync(html_fn, "utf-8");
  //console.log(html_text);
  res.send(html_text);
  
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
  console.log("create_svg_from_json()");

  // Render into SVG and release it
  const obj = eval('(' + json + ')');
  var arr = renderSignal(0, obj, waveSkin, 0);
  arr[1].xmlns = w3.svg;
  arr[1]['xmlns:xlink'] = w3.xlink;

  // Render final SVG graphics
  const svg = stringify(arr);
  //console.log('svg' + svg);

  return svg;

};


// create PNG from SVG
async function run_png_from_svg(svg) {
  let png = await sharp(Buffer.from(svg), {density : 800})
              .png()
              .toBuffer();
  console.log('run_png_from_svg() finished');

  return png;

}

// create PNG from SVG
function create_png_from_svg(diagramId, svg) {
  //var png = svg + ".png";
  //return png;
//var png = create_png_from_svg(svg).then(function(results) {
  run_png_from_svg(svg).then(result => { 
      console.log("create_png_from_svg()" + result.length);
      var data_object = data_store[diagramId];
      data_object['png'] = result;

      data_store[diagramId] = data_object;
  })
  /*
  var png;

    var png = result;
  var png = run_png_from_svg(svg);

  let result = Promise.all([png]).then((res) => {
    console.log('Promise-all' + res)
  })
    //const png_fn = 'new_png.png';
    //fs.writeFile(png_fn, png, (err) => {
    //  if (err) throw err;
    //})
    console.log("created PNG " + png.length + " bytes");
    //return png;
    return result;

  //});
    */

}


// ------------------------------------------
// Database object
// ------------------------------------------

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
  if ("privateKey" in req_body) {
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

  // create SVG object
  var svg = create_svg_from_json(json);

  // Update database
  data_object['svg'] = svg;
  data_object['png'] = "";
  data_store[diagramId] = data_object;

  // create PNG
  create_png_from_svg(diagramId, svg);
  //console.log("returned from create_png_from_svg()");

  // update the response
  //if (svg != "") {
  resp_object['json'] = json;
  resp_object['svg'] = svg;
  //}

  //return JSON.stringify(resp_object);
  return resp_object;

}

function get_diagram_from_database(diagramId) {
  var data_object = data_store[diagramId];
  var resp_object = new Object();
  console.log("get_diagram_from_database("+diagramId+")");

  // Update JSON
  resp_object['svg'] = data_object['svg'];
  resp_object['png'] = data_object['png'];
  resp_object['json'] = data_object['json'];

  //return JSON.stringify(resp_object);
  return resp_object;

}

// ------------------------------------------
// REST-API objects
// ------------------------------------------

// creates a new ID
app.post('/diagrams', (req, res) => {    
  var status_code = 200;
  console.log('POST /diagrams: ' + req.body);
  var json_resp = create_diagram_in_database();
  res.status(status_code).json(json_resp);
})


// Updates the diagram with JSON update
app.put('/diagrams', (req, res) => {    
  var status_code = 200;
  console.log("PUT request to update SVG/PNG on " + req.body + " " + Object.keys(req.body));
  let inval = JSON.stringify(req.body);
  console.log("PUT request to update SVG/PNG on " + inval);
  //console.log("PUT request to update SVG/PNG on " + req.body.signal);
  //console.log("PUT request to update SVG/PNG on " + req.body.json);
  //console.log("PUT request to update SVG/PNG on " + Object.keys(req.body.json));

  // create SVG object
  var svg = create_svg_from_json(inval);

  // Update database
  var resp_object = new Object();
  resp_object['svg'] = svg;
  console.log('svg = ' + svg.length + " bytes");

  res.status(status_code).json(resp_object);

})

// Updates the diagram with JSON update
app.put('/diagrams/:id', (req, res) => {    
  const diagramId = req.params.id;
  var status_code = 200;
  console.log("PUT request to update SVG/PNG on " + req.body);

  var json_resp = new Object();
  if (!("json" in req.body)) { 
    status_code = 400;
  } else if (check_diagram_id(diagramId, req.body)) {
    json_resp = update_diagram_in_database(diagramId, req.body.json);
    if (!("svg" in json_resp)) { 
      status_code = 201;
    }
  } else { 
    status_code = 400;
  }

  res.status(status_code).json(json_resp);

})

// Updates the diagram with JSON update
app.get('/diagrams/:id', (req, res) => {    
  const diagramId = req.params.id;
  var status_code = 200;
  console.log("GET request for SVG/PNG on " + req.body);

  var json_resp = new Object();
  if (check_diagram_id(diagramId, req.body)) {
    json_resp = get_diagram_from_database(diagramId);
    if (json_resp["png"] == "") { 
      status_code = 220;
    }
  } else { 
    status_code = 400;
  }

  res.status(status_code).json(json_resp);

})
