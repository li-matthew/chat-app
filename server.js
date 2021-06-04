const express = require('express')
const path = require('path')

const app = express()
const http = require('http').createServer(app)

app.use(express.static(path.join(__dirname, 'public')))

const io = require('socket.io')(http)
io.on('connection', socket => {
    console.log('connected')

    socket.on('sendMessage', content => {
        // console.log(content)
        socket.broadcast.emit('sendToAll', content)
    })
})

const PORT = process.env.PORT || 3000
http.listen(PORT, () => {
    console.log('Server running at ', PORT)
})