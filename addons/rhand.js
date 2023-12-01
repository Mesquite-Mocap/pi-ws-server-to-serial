const WebSocket = require('ws');

var ws = new WebSocket('ws://0.0.0.0:80/hub');
function write(str) {
    ws.send(str);
}

var request = require("request");
var MjpegConsumer = require("mjpeg-consumer");


var faceStart = false;

setInterval(() => {
  if (consumerR == null) {
    try {
      loadFace();
    } catch (e) {
      console.log(e);
    }
  }
}, 10 * 1000);

var consumerR = null;
loadFace = () => {
  consumerR = new MjpegConsumer();
  request("http://mmright.local:8080/?action=stream")
    .pipe(consumerR);

  consumerR.on("data", (data) => {
    console.log("data");
    base64data = "data:image/png;base64," + new Buffer(data).toString('base64');
    write(JSON.stringify({ rhand: base64data }));
  });
  consumerR.on("end", () => { 
    console.log("end");
    consumerR = null;
  });
  consumerR.on("error", (e) => {
    console.log(e);
    consumerR = null;
  });
}