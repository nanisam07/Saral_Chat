const express = require('express')

const http = require('http')

const { Server } = require('socket.io')

const cors = require('cors')

const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.send('Socket Server Running')
})

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

let users = []

io.on('connection', (socket) => {
  console.log(
    `User Connected: ${socket.id}`
  )

  // JOIN ROOM
  socket.on(
    'join_room',
    ({ room, username }) => {
      socket.join(room)

      // REMOVE OLD USER IF EXISTS
      users = users.filter(
        (u) => u.id !== socket.id
      )

      // ADD NEW USER
      users.push({
        id: socket.id,
        username,
        room,
      })

      console.log(
        `${username} joined ${room}`
      )

      // SEND ACTIVE USERS
      const roomUsers = users
        .filter(
          (u) => u.room === room
        )
        .map((u) => u.username)

      io.to(room).emit(
        'active_users',
        roomUsers
      )
    }
  )

  // SEND MESSAGE
  socket.on(
    'send_message',
    (data) => {
      console.log(
        'MESSAGE:',
        data
      )

      io.to(data.room).emit(
        'receive_message',
        {
          text: data.text,
          username:
            data.username,
          room: data.room,
          createdAt:
            new Date().toISOString(),
        }
      )
    }
  )

  // DISCONNECT
  socket.on('disconnect', () => {
    const disconnectedUser =
      users.find(
        (u) =>
          u.id === socket.id
      )

    users = users.filter(
      (u) => u.id !== socket.id
    )

    if (disconnectedUser) {
      const roomUsers = users
        .filter(
          (u) =>
            u.room ===
            disconnectedUser.room
        )
        .map((u) => u.username)

      io.to(
        disconnectedUser.room
      ).emit(
        'active_users',
        roomUsers
      )

      console.log(
        `${disconnectedUser.username} disconnected`
      )
    }
  })
})

const PORT =
  process.env.PORT || 5000

server.listen(
  PORT,
  '0.0.0.0',
  () => {
    console.log(
      `Socket Server Running on ${PORT}`
    )
  }
)