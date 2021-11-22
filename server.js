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

const wss = new WebSocket.Server({ port: 3000})

wss.on('connection', ws => {
  ws.on('message', message => {
	var x = `${message}`; // receiving messages from the watches 
	//  console.log(x)
	  write(x) //send this message via serial 
	  try{
		    db.collection("dataWS").insert(JSON.parse(x), function(err, result){
		    });
	  }
	  catch(e){}
  })
})
