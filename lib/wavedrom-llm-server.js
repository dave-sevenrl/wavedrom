'use strict';
const waveSkin = require('./wave-skin.js');
const https = require("https");
const http = require('http');
const renderSignal = require('./render-signal.js');
const stringify = require('onml/stringify.js');
const w3 = require('./w3.js');
const fs = require("fs");
const sharp = require('sharp');
const express = require('express');
const path = require('path');
const crypto = require("crypto");
const cors = require('cors');

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(cors());
app.enable('trust proxy')
//app.use(express.urlencoded());
//
//const PORT = parseInt(process.env.PORT) || 8080;

// Set maximum number of parallel chats
const MAX_CHAT = 16;

// -----------------------------------------------------------------------------------
// Deploy to the Cloud
// https://cloud.google.com/run/docs/quickstarts/build-and-deploy/deploy-nodejs-service
// https://cloud.google.com/run/docs/securing/managing-access#gcloud
// https://cloud.google.com/run/docs/configuring/services/cloud-storage-volume-mounts

/*
POST /new_chat?api_key=<secret-key>
  Description - Creates a new unique multi-turn chat history
  Status:
    status 200 - successfully create a new chat 
    status 404 - Service not found - returns "message"
    status 503 - Service unavailable - return "message"

PUT /chat/<chat_id>?prompt=<prompt>[&json=<json_text>] 
  Description - Puts the prompt into the LLM. If json is added, it updates JSON before the prompt
  Status:
    status 200 - success - returns "json" JSON text object
    status 400 - Bad Request - missing prompt - return "message"
    status 404 - Not Found - bad chat_id - return "message"
    status 500 - Internal Server Error - return "message"

PUT /chat/create_svg?json=<json_text> 
  Description - Renders an SVG wavedrom object from the JSON
  Status:
    status 200 - success - returns "svg" text object
    status 500 - Internal Server Error - "message" with the failure

PUT /chat/create_png?svg=<svg_text>[&density=<density>] 
  Description - Renders a PNG with the density setting
  Status:
    status 200 - success - returns "png" Buffer object
    status 500 - Internal Server Error - "message" with the failure

*/

// Setup HTTPs credentials
let privateKey  = fs.readFileSync('key.pem', 'utf8');
let certificate = fs.readFileSync('cert.pem', 'utf8');
let credentials = {key: privateKey, cert: certificate};

// your express configuration here
var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, () => {
  console.log("HTTP server listening on port 8080")
});
httpsServer.listen(8443, () => {
  console.log("HTTPS server listening on port 8443")
});

// Provide a local filename path
const NODE_ENV = process.env.NODE_ENV || "";
let fs_path = "/mnt/wavedrom-llm-storage/";
if (NODE_ENV == 'development') { 
  fs_path = "./";
}

/*

REDIRECT FAILS on Google Cloud - not sure why

const NODE_ENV = process.env.NODE_ENV || "";


// redirects http request to https
app.use((req, res, next) => {
  if (!req.secure && NODE_ENV !== 'development') { 
      console.log("Redirecting to https://" + req.headers.host + req.url);
      return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});
*/

let last_json = "";
let last_svg = "";

// Main webpage response
app.get("/", (req, res) => {

  // Read the HTML and serve it
  let html_text = '<html><h1>Wavedrom REST-API Server running</h1>';
  let num_chats = Object.keys(chatSessions).length;

  html_text += 'Active chats: ' + num_chats + '\n';
  html_text += '<h2>Last JSON </h2>\n<pre>'
  let json_obj = JSON.parse(last_json);
  html_text += JSON.stringify(json_obj, null, 4) + '</pre>\n';
  html_text += last_svg + '\n';
  html_text += '</html>'

  res.send(html_text);
  
});

function generateRandomID() {
  const uuid = crypto.randomUUID();
  return uuid;
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

// Setup new sessions
const chatSessions = new Object();

// Get logs
function get_chat_history(filename) { 
  let chat_history_text = fs.readFileSync(fs_path + filename);
  let chat_history = JSON.parse(chat_history_text);

  return chat_history;
}

function write_chat_history(filename, log_obj) { 

  // Log the chat session
  fs.writeFile(fs_path + filename, JSON.stringify(log_obj), (err) => {
    if (err) {
      console.error('FAILED to create ' + filename);
    } else { 
      console.log("Created log " + filename);
    }
  });

}


function cleanup_old_chats() { 
 
  const chat_keys = Object.keys(chatSessions);

  // Keep the MAX_CHAT newest CHATs
  let delete_count = chat_keys.length - (MAX_CHAT-1);
  if (delete_count > 0) {
    for (let i = 0; i < delete_count; i++) { 
      delete chatSessions[chat_keys[i]];
      console.log('Deleting OLD chat ' + chat_keys[i]);
    }
  }
}

function create_new_chat(chat_id, ip) { 
    var status_code = 200;

    console.log("Creating chat_id " + chat_id);

    // Delete all previous keys
    cleanup_old_chats();

    let timestamp = Date.now();
    let filename = 'logs/' + chat_id + "_" + timestamp + ".log";

    // Start a new chat
    let new_chat_obj = new Object();
    new_chat_obj['timestamp'] = timestamp;
    new_chat_obj['chat_id'] = chat_id;
    new_chat_obj['ip'] = ip;
    new_chat_obj['chat_history'] = [];

    // Log the chat session
    write_chat_history(filename,new_chat_obj);

    new_chat_obj['filename'] = filename;
    new_chat_obj['model'] = model.startChat({
      generationConfig,
      history: []
    })

    chatSessions[chat_id] = new_chat_obj;

    return status_code;
}

async function get_llm_response(chat_id, msg) {
  let status_code = 200;

  // Found the valid chat_id
  if (chatSessions.hasOwnProperty(chat_id)) {
    const result = await chatSessions[chat_id]['model'].sendMessage(msg);
    let resp_text = await result.response.text();
    return resp_text;
  }

  // Error case
  status_code = 404;
  return "";
}

// ------------------------------------------
// REST-API objects
// ------------------------------------------
const wavedromApiKey = process.env.WAVEDROM_API_KEY;


function check_api_key(body) { 
  let api_key_match = false;
  if (body.hasOwnProperty('api_key')) {
    if (body.api_key == wavedromApiKey) {
      api_key_match = true;
      console.log('api_key Matched');
    }
  } else{
    console.log('api_key FAILED');
  }
  return api_key_match;
}


// creates a new chat models
app.post('/new_chat', (req, res) => {    
  const resp_object = new Object();
  var status_code = 200;
  console.log('POST /new_chat');

  if (check_api_key(req.body)) {

    // Create a ranom  Update JSON
    try {
      const chat_id = generateRandomID();

      // return status code
      status_code = create_new_chat(chat_id);

      // Send back the new Chat ID
      resp_object['chat_id'] = chat_id;
    } catch(error) { 
      status_code = 503;
      resp_object['message'] = "Failed to generate a new chat_id on the server";
      console.error('ERROR in create_new_chat: ' + error);
    }
    res.status(status_code).json(resp_object);
  } else {
    status_code = 404;
    resp_object['message'] = "Failed to specify the correct API_KEY"
    res.status(status_code).json(resp_object);
  }

})

// Runs an updated LLM chat
app.put('/chat/:chat_id', (req, res) => {    
  const resp_object = new Object();
  let status_code = 200;

  // Get the ChatID and make sure it's valid
  const chat_id = req.params.chat_id;

  if (chatSessions.hasOwnProperty(chat_id)) {

    let interaction = new Object()
    interaction['timestamp'] = Date.now();
  
    // Form instructions
    let prompt_text;
    if ((req.body.hasOwnProperty('json')) && (req.body.hasOwnProperty('prompt'))) {
      prompt_text = 'Edit the following JSON based on the instructions:\n';
      prompt_text += 'Instructions: ' + req.body.prompt + '\n';
      prompt_text += 'JSON:\n' + req.body.json;
      interaction['prompt'] = req.body.prompt;
      interaction['json'] = req.body.json;
    } else if (req.body.hasOwnProperty('prompt')) {
      interaction['prompt'] = req.body.prompt;
      prompt_text = req.body.prompt;
    } else {
      prompt_text = "";
      status_code = 400;
      resp_object['message'] = "ERROR missing prompt key in the request";
    }
  
    // Generate the LLM response
    if (status_code == 200) { 
      console.log("PUT request to chat " + chat_id + "with " + prompt_text);
  
      let timer_name = 'timer_' + chat_id;
      console.time(timer_name);
  

      try { 
        // Generate the response
        let llm_resp = get_llm_response(chat_id, prompt_text);
    
        // Get logs
        let chat_history = get_chat_history(chatSessions[chat_id]['filename']);
    
        // Wait for JSON reponse
        llm_resp.then(data => {
          console.log("llm_resp " + data);
          resp_object['json'] = data;
    
          // Update website
          last_json = data;
          interaction['model'] = data;
    
          // delete oldest one
          chat_history['chat_history'].push(interaction);
    
          // Write the log
          write_chat_history(chatSessions[chat_id]['filename'], chat_history);
    
          // Update database
          console.log('LLM response is ' + resp_object['json'].length + " bytes");
          console.timeEnd(timer_name);
          res.status(status_code).json(resp_object);
        })
      } catch (error) { 
        status_code = 500;
        resp_object['message'] = "Failed to run LLM update";
        console.error('ERROR in LLM update: ' + error);
        res.status(status_code).json(resp_object);
      }
    } else {
      res.status(status_code).json(resp_object);
    }
  } else {
    status_code = 404;
    resp_object['message'] = "ERROR chat_id not found in server";
    res.status(status_code).json(resp_object);
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

  // update server history
  last_svg = svg;

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
  console.log("PUT request to update PNG on SVG data with " + inval.lenght + " bytes");

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
