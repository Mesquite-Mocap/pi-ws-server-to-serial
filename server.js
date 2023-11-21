/* This is the websocket running on the r pi that's listening for messages from the router */

var SerialPort = require('serialport'); // we are going to push this data via serial
var port = new SerialPort('/dev/ttyGS0', { //update your port
   baudRate: 115200,
   dataBits: 8,
   parity: 'none',
   stopBits: 1,
   flowControl: false
});


function write(str){
	port.write(str + '\n',function(err){ // the string being pushed
		if(err){
			console.log("e");
		}
	})
}

const WebSocket = require('ws')

const express = require('express');
const app = express();
const server = require('http').Server(app);
const url = require('url');

const wss1 = new WebSocket.Server({ noServer: true });
const wss2 = new WebSocket.Server({ noServer: true });
const p = 80;

wss1.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
       write(message.toString());
  });
});

//webbrowser
wss2.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
  	// nothing here should be received
    console.log('received wss2: %s', message);
  });
});

server.on('upgrade', function upgrade(request, socket, head) {
  const pathname = url.parse(request.url).pathname;

  if (pathname === '/hub') {
    
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit('connection', ws, request);
          // print out the message
    });
  } else if (pathname === '/web_client') {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      wss2.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

// static files
app.use(express.static('public'));

server.listen(p, () => {
	  console.log(`App listening at http://localhost:${p}`)
})
