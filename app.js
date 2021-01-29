const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  origin: "http://localhost:3000" , 
  methods: [ "GET" , "POST" ] 
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

const Messages = require('./src/database/models/messages');
const User = require('./src/database/models/user');

io.on('connection', async (socket) => {
  console.log("Um usuário foi conectado");
  let reloadMessages = await consultMessages();
  socket.emit('reloadMessages', reloadMessages);

  socket.on('disconnect', ()=>{
    console.log("Um usuário foi desconectado");
  });

  socket.on('sendMessage', data => {
    socket.broadcast.emit('receiveMessage', data);
    saveMessage(data);
  });
});

http.listen(3000, () => {
  console.log('http://localhost:3000');
});

async function saveMessage(data) {
  try{
    await Messages.create({UserId: data.user_id, message: data.message});
  } catch(err) {
    console.log(err);
  };
};

async function consultMessages() {
  try {
    const consultDataBase = await Messages.findAll({include: User});
    let content = [];
    for (let i = 0; i < consultDataBase.length; i++) {
      let x = consultDataBase[i];
      content.push({
        nick: x.dataValues.User.dataValues.nick,
        message: x.dataValues.message
      });
    };
    return content;
  } catch (err) {
    console.log(err);
  };
};