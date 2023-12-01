const WebSocket = require('ws');

var ws = new WebSocket('ws://127.0.0.1:80/hub');
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
  request("http://mmleft.local:8081/video")
    .pipe(consumerR);

  consumerR.on("data", (data) => {
    base64data = "data:image/png;base64," + new Buffer(data).toString('base64');
    //console.log({face:base64data});
    write(JSON.stringify({ face: base64data }));
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