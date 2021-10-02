var App = require ('express') ()
.get ('/api/bots/:BotID', async (Req, Res) => {
  var Data = JSON.parse (await require ('request-promise') ('https://toxic-botlist.glitch.me/api/bots/' + Req.params['BotID'])),
  VotesData = !Data['error'] ? JSON.parse (await require ('request-promise') ('https://www.toxic-bot-list.ml/api/bots/' + Req.params['BotID'] + '/vote')) : false;
  if (Data['error']) return Res.send ({
    Error: {
      id: 403,
      message: 'مافي بوت بالايدي هذا'
    }
  });
  Data = {
    id: Data['id'],
    username: Data['name'],
    avatar: Data['avatar'],
    lib: Data['library'],
    prefix: Data['prefix'],
    shortdesc: Data['short_description'],
    longdesc: Data['long_description'],
    support: Data['support_server'] == 'Not found!' ? false : Data['support_server'],
    owner: {
      id: Data['ownerid'],
      name: Data['owner']
    },
    invite: 'https://discordapp.com/oauth2/authorize?client_id='+ Data['id'] + '&permissions=8&scope=bot',
    verified: Data['verified'] == 'Not found!' ? false : true,
    widget: 'https://www.toxic-bot-list.ml/bot/'+ Data['id'] + '.png/widget',
    votesCount: VotesData['votes'],
    hasVoted: VotesData['hasVoted']
  };
  Res.send (Data);
})
.listen (process.env.PORT);