const WebSocket = require("ws");
const express = require("express");
const app = express();

const server = app.listen(8080);
const wss = new WebSocket.Server({ server });

var globalCounter = 0;

var timerInterval;
const handleSetInterval = (client) => {
  timerInterval = setInterval(() => {
    globalCounter = globalCounter + 1;
    if (globalCounter < 100) {
      client.send(globalCounter);
    } else if (globalCounter >= 100) {
      clearInterval(this);
      clearInterval(timerInterval);
      globalCounter = 0;
      client.send(globalCounter);
    }
  }, 1000);
};

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("open", function open() {
    console.log("entered");
    ws.send("opened");
  });

  ws.on("close", function close() {
    console.log("closeee");
  });

  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        const message = isBinary ? data : data.toString();
        if (message === "start") {
          globalCounter = 0;
          handleSetInterval(client);
        }
        if (message === "stop") {
          globalCounter = 0;
          clearInterval(timerInterval);
          client.send(globalCounter);
        }
      }
    });
  });
});
