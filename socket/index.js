const express = require('express')
const {Server} = require('socket.io')
const http = require('http')
const cors = require('cors')
const bodyParser = require("body-parser");

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

const PORT = 3000
const HOST = '0.0.0.0'

const UserRouter = require('./routes/user')

const corsOptions = {
  origin: 'http://192.168.100.10:5173',  // Ganti dengan domain yang diizinkan
  optionsSuccessStatus: 200
};
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(bodyParser.json())
app.use('/users', UserRouter)


const connectedUser = new Set()
const UsersModel = require('./models/user')
io.on('connection', (socket) => {
  console.log('a client connected id: '+socket.id)
  connectedUser.add(socket.id)
  socket.on('chat message', (chat) => {
    io.emit('chat message', chat)
  })

  socket.on('join chat', async (user) => {
    io.emit('online user')
    const chat = {
      id: Math.floor(Math.random() * 20),
      chat: `${user.username} has joined chat`,
      userid: 0
    }
    io.emit('chat message', chat)
    try {
      await UsersModel.setActiveUser(socket.id, user.id)
      return false
    } catch (e) {
      console.log(e)
    }
  })

  socket.on('disconnect', async () => {
    console.log(socket.id)
    await UsersModel.removeSocketId(socket.id)
    io.emit('online user')
    console.log('A client disconnected.\n');
  });
})

server.listen(PORT, HOST, () => {
  console.log(`Aplikasi berjalan di ${HOST}:${PORT}`)
})
