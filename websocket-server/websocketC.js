var html5ws = require ('html5-websocket');
var rcws = require ('reconnecting-websocket');
var wshost = 'https://toxic-api.glitch.me';
var wsport = process.env.PORT;
var options = {constructor: html5ws };
var wsc = new rcws ('ws://' + wshost + ":" + wsport + "/ws", false, options);
wsc.timeout = 3000;
wsc.addEventListener ('open', () => {
  console.log ('opened!');
  wsc.send ('hello!', 'this is a message from client 1');
});
wsc.addEventListener ('message', (message) => {
  console.log ('message horai!');
  console.log (message.data);
});