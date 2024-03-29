


// namespace MJPEG { ...
var MJPEG = (function(module) {
    "use strict";
  
    // class Stream { ...
    module.Stream = function(args) {
      var self = this;
      var autoStart = args.autoStart || false;
  
      self.url = args.url;
      self.refreshRate = args.refreshRate || 500;
      self.onStart = args.onStart || null;
      self.onFrame = args.onFrame || null;
      self.onStop = args.onStop || null;
      self.callbacks = {};
      self.running = false;
      self.frameTimer = 0;
  
      self.img = new Image();
      if (autoStart) {
        self.img.onload = self.start;
      }
      self.img.src = self.url;
  
      function setRunning(running) {
  
        self.running = running;
        if (self.running) {
          self.img.src = self.url;
          self.frameTimer = setInterval(function() {
            if (self.onFrame) {
              self.onFrame(self.img);
            }
          }, self.refreshRate);
          if (self.onStart) {
            self.onStart();
          }
        } else {
          self.img.src = "#";
          clearInterval(self.frameTimer);
          if (self.onStop) {
            self.onStop();
          }
        }
      }
  
      self.start = function() { setRunning(true); }
      self.stop = function() { setRunning(false); }
    };
  
    var cDiv = document.getElementById("canvasDiv")
    // class Player { ...
    module.Player = function(canvas, url, options) {
      cDiv = document.getElementById("canvasDiv")
      var self = this;
      if (typeof canvas === "string" || canvas instanceof String) {
        canvas = document.getElementById(canvas);
      }
      var context = canvas.getContext("2d");
  
      if (! options) {
        options = {};
      }
      options.url = url;
      options.onFrame = updateFrame;
      options.onStart = function() {// console.log("started");
  
     
      }
      options.onError = function() {// window.location.reload() 
      }
      options.onStop = function() { 
      //  window.location.reload(true); 
        }
  
      self.stream = new module.Stream(options);
  
      canvas.addEventListener("click", function() {
        if (self.stream.running) { self.stop(); }
        else { self.start(); }
      }, false);
  
      function scaleRect(srcSize, dstSize) {
        var ratio = Math.min(dstSize.width / srcSize.width,
                             dstSize.height / srcSize.height);
        var newRect = {
          x: 0, y: 0,
          width: srcSize.width * ratio,
          height: srcSize.height * ratio
        };
        newRect.x = (dstSize.width/2) - (newRect.width/2);
        newRect.y = (dstSize.height/2) - (newRect.height/2);
        return newRect;
      }
  
      var cuFlag = true;
      //var tipc = parent.require("electron").ipcRenderer;
      function updateFrame(img) {
          
        //frameC++;
       // if(frameC%60 === 0){
         // tipc.send('iamup', chName);
       // }
          img.crossOrigin = 'Anonymous';
         convertImgToDataURLviaCanvas(img, function(data){
         
             if (data == null) return;
  
  
          var srcRect = {
            x: 0, y: 0,
            width: img.naturalWidth,
            height: img.naturalHeight
          };
          var dstRect = scaleRect(srcRect, {
            width: canvas.width,
            height: canvas.height
          });
          //document.getElementById("odCanvas").width = canvas.width;
          //document.getElementById("odCanvas").height = canvas.height;
  
  
  
            try {
                context.drawImage(img,
                  srcRect.x,
                  srcRect.y,
                  srcRect.width,
                  srcRect.height,
                  dstRect.x,
                  dstRect.y,
                  dstRect.width,
                  dstRect.height
                );
  
  
      //     document.getElementById("hImage").src = "../download-6.png"
      var byt = document.getElementById("hImage")
  


  
        } catch (e) {
          // if we can't draw, don't bother updating anymore
         // window.location.reload();
          self.stop();
      //      start();
      player.start();
          throw e;
        }
         });
      }
  
      self.start = function() { 
        self.stream.start(); 
      }
      self.stop = function() { self.stream.stop(); }
    };
  
    return module;
  
  })(MJPEG || {});
  
