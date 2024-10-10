'use strict';
const waveSkin = require('./wave-skin.js');
const renderSignal = require('./render-signal.js');
const stringify = require('onml/stringify.js');
const w3 = require('./w3.js');
const fs = require("fs");
const sharp = require('sharp');
const express = require('express');
const path = require('path');
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(express.urlencoded());

const PORT = parseInt(process.env.PORT) || 8080;

// -----------------------------------------------------------------------------------
// Deploy to the Cloud
// https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service
//
//
// https://ui.shadcn.com/docs/installation/manual
//npm install lucide-react


// -----------------------------------------------------------------------------------
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
  //let html_fn = 'wavedrom-server.html'
  //const html_text = fs.readFileSync(html_fn, "utf-8");
  const html_text = '<h1>Able to start the server</h1>';
  //console.log(html_text);
  res.send(html_text);
  
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
async function create_png_from_svg(svg, density) {
  let png = await sharp(Buffer.from(svg), {density : density})
              .png()
              .toBuffer();
  console.log('run_png_from_svg() finished');

  return png;

}

// ------------------------------------------
// Generative AI objects
// ------------------------------------------

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

let system_instr_fn = './llm/system_instructions.txt';
var system_instructions = fs.readFileSync(system_instr_fn, "utf-8");
console.log('System instructions ' + system_instructions);
//console.log(html_text);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: system_instructions
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Setup chatbot
/*
const chatSession = model.startChat({
  generationConfig,
  history: []
});
*/
// Setup new sessions
const chatSessions = new Object();

function create_new_chat(chat_id) { 
    var status_code = 200;

    console.log("Creating chat_id " + chat_id);

    const keyCount = Object.keys(chatSessions).length;
    if (keyCount < 10) { 
      // Create the new session
      chatSessions[chat_id] = model.startChat({
        generationConfig,
        history: []
      })
    } else {
      status_code = 401;
    }

    return status_code;
}

function delete_chat(chat_id) { 
    var status_code = 204;

    // delete the old chat
    if (chatSessions.hasOwnProperty(chat_id)) { 
      console.log('Deleting chat ' + chat_id);
      delete chatSessions[chat_id];
    } else {
      console.log('Failed to delete chat ' + chat_id);
      status_code = 404;
    }

    return status_code;

}

async function get_llm_response(chat_id, msg) {
  let status_code = 200;

  // Found the valid chat_id
  if (chatSessions.hasOwnProperty(chat_id)) {
    const result = await chatSessions[chat_id].sendMessage(msg);
    let resp_text = await result.response.text();
    return resp_text;
    return {status: status_code, resp: resp_text};
  }

  // Error case
  status_code = 404;
  return "";
  return {status: status_code, resp: ""};
}

// ------------------------------------------
// REST-API objects
// ------------------------------------------

// creates a new chat models
app.post('/newchat', (req, res) => {    
  var status_code = 200;
  console.log('POST /newchat');

  let private_key_match = false;
  if (req.body.hasOwnProperty('private_key')) {
    if (req.body.private_key == "1234") {
      private_key_match = true;
      console.log('private_key Matched');
    }
  } else{
    console.log('private_key failed');
  }

  if (private_key_match) {

    // Create a ranom  Update JSON
    const chat_id = generateRandomID();

    // return status code
    status_code = create_new_chat(chat_id);

    // Send back the new Chat ID
    const resp_object = new Object();
    resp_object['chat_id'] = chat_id;
    res.status(status_code).json(resp_object);
  } else {
    status_code = 400;
    res.status(status_code).send();
  }

})

// Delets the ChatID
app.delete('/chat/:chat_id', (req, res) => {    
  const chat_id = req.params.chat_id;
  console.log("DELETE request to chat " + chat_id);
  const status_code = delete_chat(chat_id);
  res.status(status_code).send();
})

// Runs an updated LLM chat
app.put('/chat/:chat_id', (req, res) => {    
  const chat_id = req.params.chat_id;
  let status_code = 200;
  let prompt_text;

  // Form instructions
  if ((req.body.hasOwnProperty('json')) && (req.body.hasOwnProperty('prompt'))) {
    prompt_text = 'Edit the following JSON based on the instructions:\n';
    prompt_text += 'Instructions: ' + req.body.prompt + '\n';
    prompt_text += 'JSON:\n' + req.body.json;
  } else if (req.body.hasOwnProperty('prompt')) {
    prompt_text = req.body.prompt;
  } else {
    prompt_text = "";
    status_code = 400;
  }

  // Generate the LLM response
  if (status_code == 200) { 
    console.log("PUT request to chat " + chat_id + "with " + prompt_text);
    let llm_resp = get_llm_response(chat_id, prompt_text);

    console.log("llm_resp " + llm_resp);

    // Wait for JSON reponse
//    let llm_response = llm_resp.resp;
    llm_resp.then(data => {
      console.log("llm_resp " + data);
      let resp_object = new Object();
      resp_object['json'] = data;

      // Update database
      console.log('LLM response is ' + resp_object['json'].length + " bytes");
      res.status(status_code).json(resp_object);
    })
  } else { 
    res.status(status_code).send();
  } 

})

// Creates an SVG file from JSON
app.put('/create_svg', (req, res) => {    
  let status_code = 200;
  //console.log("PUT request to update SVG/PNG on " + req.body + " " + Object.keys(req.body));
  //let inval = JSON.stringify(req.body.json);
  let inval = req.body.json;
  console.log("PUT request to update SVG/PNG on " + inval);

  // create SVG object
  let svg = create_svg_from_json(inval);

  // Update database
  var resp_object = new Object();
  resp_object['svg'] = svg;
  console.log('svg = ' + svg.length + " bytes");

  res.status(status_code).json(resp_object);

})

// Return a PNG file
app.put('/create_png', (req, res) => {    
  let status_code = 200;
  let inval = req.body.svg;
  console.log("PUT request to update PNG on " + inval);

  // Potential change this
  let density = 800;
  let png = create_png_from_svg(inval, density);

  // Wait for PNG to be finished
  png.then(result => { 
    var resp_object = new Object();
    resp_object['png'] = result;
    console.log("create_png_from_svg() " + result.length + " bytes");
    res.status(status_code).json(resp_object);
  })

})
