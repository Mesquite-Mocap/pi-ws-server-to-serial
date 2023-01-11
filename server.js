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

// const wss = new WebSocket.Server({ port: 3000})
//
// wss.on('connection', ws => {
//   ws.on('message', message => {
// 	var x = `${message}`; // receiving messages from the watches
// 	//  console.log(x)
// 	  // write(x) //send this message via serial
// 	  try{
// 		    db.collection("dataWS").insert(JSON.parse(x), function(err, result){
// 		    });
// 	  }
// 	  catch(e){}
//   })
// })

const express = require('express');
const app = express();
const server = require('http').Server(app);
const url = require('url');

const wss1 = new WebSocket.Server({ noServer: true });
const wss2 = new WebSocket.Server({ noServer: true });
const port = 3000;

var mac2Bones = {
  "08:3A:F2:44:C8:34" : {id: "LeftArm", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "08:3A:F2:44:CB:6C" : {id: "LeftForeArm", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:02" : {id: "LeftHand", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:03" : {id: "LeftUpLeg", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:04" : {id: "LeftLeg", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:05" : {id: "LeftFoot", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:06" : {id: "LeftShoulder", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:07" : {id: "LeftToeBase", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "08:3A:F2:44:C9:94" : {id: "RightForeArm", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "08:3A:F2:44:C9:88" : {id: "RightArm", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:10" : {id: "RightHand", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:11" : {id: "RightUpLeg", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:12" : {id: "RightLeg", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:13" : {id: "RightFoot", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:14" : {id: "RightShoulder", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:15" : {id: "RightToeBase", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "08:3A:F2:44:CA:F0" : {id: "Hips", calibration:{x:0, y:0, z:0, w:1, accX:0, accY:0, accZ:0}, last:{x:0, y:0, z:0, w:1, accX:0, accY:0, accZ:0}, global:{x:null, y:null, z:null, w:null}},
  "08:3A:F2:44:C9:B8" : {id: "Head", calibration:{x:0, y:0, z:0, w:1, accX:0, accY:0, accZ:0}, last:{x:0, y:0, z:0, w:1, accX:0, accY:0, accZ:0}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:18" : {id: "Neck", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "78:21:84:88:C2:D3" : {id: "Spine", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:20" : {id: "", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:21" : {id: "", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:22" : {id: "", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:23" : {id: "", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}},
  "00:00:00:00:00:24" : {id: "", calibration:{x:0, y:0, z:0, w:1}, last:{x:0, y:0, z:0, w:1}, global:{x:null, y:null, z:null, w:null}}
}

wss1.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
	// console.log(message.toString());
    wss2.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        if(message == "Connected") {
          return;
        }
        var obj = JSON.parse(message);

        var msg = "PNTSTART  ~Take1~   ~Time3~";
        msg += "  ";

        if(mac2Bones[obj.id].id=="Spine") {
          msg += "~~chest~qW:" + obj.w + "~qX:" + obj.x + "~qY:" + obj.y + "~qZ:" + obj.z + "~";
        } else {
          msg += "~~chest~qW:0.0000~qX:-0.0000~qY:-0.0000~qZ:0.0000~";
        }
        msg += "  ";

        if(mac2Bones[obj.id].id=="RightHand") {
          msg += "~~hand.R~qW:" + obj.w + "~qX:" + obj.x + "~qY:" + obj.y + "~qZ:" + obj.z + "~";
        } else {
          msg += "~~hand.R~qW:0.0000~qX:-0.0000~qY:-0.0000~qZ:0.0000~";
        }
        msg += "  ";

        if(mac2Bones[obj.id].id=="RightForeArm") {
          msg += "~~upper_arm.R~qW:" + obj.w + "~qX:" + obj.x + "~qY:" + obj.y + "~qZ:" + obj.z + "~";
        } else {
          msg += "~~upper_arm.R~qW:0.0000~qX:-0.0000~qY:-0.0000~qZ:0.0000~";
        }
        msg += "  ";

        if(mac2Bones[obj.id].id=="RightForeArm") {
          msg += "~~forearm.R~qW:" + obj.w + "~qX:" + obj.x + "~qY:" + obj.y + "~qZ:" + obj.z + "~";
        } else {
          msg += "~~forearm.R~qW:0.0000~qX:-0.0000~qY:-0.0000~qZ:0.0000~";
        }
        msg += "  ";

        if(mac2Bones[obj.id].id=="LeftForeArm") {
          msg += "~~forearm.L~qW:" + obj.w + "~qX:" + obj.x + "~qY:" + obj.y + "~qZ:" + obj.z + "~";
        } else {
          msg += "~~forearm.L~qW:0.0000~qX:-0.0000~qY:-0.0000~qZ:0.0000~";
        }
        msg += "  ";

        if(mac2Bones[obj.id].id=="LeftForeArm") {
          msg += "~~upper_arm.L~qW:" + obj.w + "~qX:" + obj.x + "~qY:" + obj.y + "~qZ:" + obj.z + "~";
        } else {
          msg += "~~upper_arm.L~qW:0.0000~qX:-0.0000~qY:-0.0000~qZ:0.0000~";
        }
        msg += "  ";

        if(mac2Bones[obj.id].id=="LeftHand") {
          msg += "~~hand.L~qW:" + obj.w + "~qX:" + obj.x + "~qY:" + obj.y + "~qZ:" + obj.z + "~";
        } else {
          msg += "~~hand.L~qW:0.0000~qX:-0.0000~qY:-0.0000~qZ:0.0000~";
        }
        msg += "  ";

        if(mac2Bones[obj.id].id=="Head") {
          msg += "~~head~qW:" + obj.w + "~qX:" + obj.x + "~qY:" + obj.y + "~qZ:" + obj.z + "~";
        } else {
          msg += "~~head~qW:0.0000~qX:-0.0000~qY:-0.0000~qZ:0.0000~";
        }
        msg += "  ";

        if(mac2Bones[obj.id].id=="Spine") {
          msg += "~~spine~qW:" + obj.w + "~qX:" + obj.x + "~qY:" + obj.y + "~qZ:" + obj.z + "~";
        } else {
          msg += "~~spine~qW:0.0000~qX:-0.0000~qY:-0.0000~qZ:0.0000~";
        }
        msg += "  ";

        if(mac2Bones[obj.id].id=="LeftUpLeg") {
          msg += "~~thigh.L~qW:" + obj.w + "~qX:" + obj.x + "~qY:" + obj.y + "~qZ:" + obj.z + "~";
        } else {
          msg += "~~thigh.L~qW:0.0000~qX:-0.0000~qY:-0.0000~qZ:0.0000~";
        }
        msg += "  ";

        if(mac2Bones[obj.id].id=="LeftLeg") {
          msg += "~~shin.L~qW:" + obj.w + "~qX:" + obj.x + "~qY:" + obj.y + "~qZ:" + obj.z + "~";
        } else {
          msg += "~~shin.L~qW:0.0000~qX:-0.0000~qY:-0.0000~qZ:0.0000~";
        }
        msg += "  ";

        if(mac2Bones[obj.id].id=="LeftFoot") {
          msg += "~~foot.L~qW:" + obj.w + "~qX:" + obj.x + "~qY:" + obj.y + "~qZ:" + obj.z + "~";
        } else {
          msg += "~~foot.L~qW:0.0000~qX:-0.0000~qY:-0.0000~qZ:0.0000~";
        }
        msg += "  ";

        if(mac2Bones[obj.id].id=="RightUpLeg") {
          msg += "~~thigh.R~qW:" + obj.w + "~qX:" + obj.x + "~qY:" + obj.y + "~qZ:" + obj.z + "~";
        } else {
          msg += "~~thigh.R~qW:0.0000~qX:-0.0000~qY:-0.0000~qZ:0.0000~";
        }
        msg += "  ";

        if(mac2Bones[obj.id].id=="RightLeg") {
          msg += "~~shin.R~qW:" + obj.w + "~qX:" + obj.x + "~qY:" + obj.y + "~qZ:" + obj.z + "~";
        } else {
          msg += "~~shin.R~qW:0.0000~qX:-0.0000~qY:-0.0000~qZ:0.0000~";
        }
        msg += "  ";

        if(mac2Bones[obj.id].id=="RightFoot") {
          msg += "~~foot.R~qW:" + obj.w + "~qX:" + obj.x + "~qY:" + obj.y + "~qZ:" + obj.z + "~";
        } else {
          msg += "~~foot.R~qW:0.0000~qX:-0.0000~qY:-0.0000~qZ:0.0000~";
        }
        msg += "  ";
        msg += "PNTEND";

       console.log('received wss2: %s', msg);

        client.send(msg);
      }
    });
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
    });
  } else if (pathname === '/web_client') {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      wss2.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(port, () => {
	  console.log(`App listening at http://localhost:${port}`)
})
