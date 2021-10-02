var websocket = require ('ws');
var ServerWs = require ('ws').Server;
var server = require ('express') ().listen (process.env.PORT);
var wss = new ServerWs ({ server });
wss.on ('connection', (ws) => {
  console.log ('hi');
  ws.on ('close', () => {
    console.log ('leave websocket');
  });
  ws.on ('message', (message) => {
    console.log ('message recieved');
    wss.clients.forEach (async (Client) => {
      if (Client == ws || Client.readyState != websocket.OPEN) return undefined;
      else Client.send (message);
    })
  });
});



console.log ('ok!');


