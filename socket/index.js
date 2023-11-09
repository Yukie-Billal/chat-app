import express from 'express'
import {Server} from 'socket.io'
import http from 'http'
import cors from 'cors'
import bodyParser from "body-parser"
import fs from 'fs'
const app = express()
const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

const PORT = 3000
const HOST = '0.0.0.0'

import UserRouter from './routes/user.js'

const corsOptions = {
  origin: 'http://192.168.18.90:5173',  // Ganti dengan domain yang diizinkan
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
import UserModel from './models/user.js'
import {create_log} from "./utils/create-logs.js";

const dirPath = './log/'
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath)
}
const filePath = dirPath + 'log.txt'
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '', 'utf-8')
}

io.on('connection', (socket) => {
  console.log('a client connected id: '+socket.id)
  connectedUser.add(socket.id)
  socket.on('chat message', (chat) => {
    io.emit('chat message', chat)
  })

  socket.on('join chat', async user => {
    try {
      const chat = {
        id: Math.floor(Math.random() * 20),
        chat: `${user.username} has joined chat`,
        userid: 0
      }
      io.emit('chat message', chat)
      await UserModel.setActiveUser(socket.id, user.id)
      io.emit('online user')
    } catch (e) {
      console.log(e)
      create_log(new Date() + " :" + e)
    }
  })


  socket.on('disconnect', async () => {
    try {
      console.log(socket.id)
      await UserModel.removeSocketId(socket.id)
      io.emit('online user')
      console.log('A client disconnected.\n');
    } catch (e) {
      console.log(e)
      create_log(new Date() + " :" + e)
    }
  });
})

server.listen(PORT, HOST, () => {
  console.log(`Aplikasi berjalan di ${HOST}:${PORT}`)
})
