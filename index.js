const express = require('express');
const app = express()
const http = require('http')
const cors = require('cors');
const {Server} = require('socket.io')
const PORT  = 3001
app.use(cors());//прослойка между нач и концом 
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin:'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})
app.get('/',(req,res)=>{
    res.send("Hello World!");
})
//connection мы слушаем событие с id 
io.on("connection", (socket)=> {
    console.log(`${socket.id} User ok`);
    socket.on("join_room", (data)=>{
        socket.join(data)
        console.log(`User with ID: ${socket.id} join eoom ${data}`)
    })
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("resive_message", data)
        console.log(data)
    })
    socket.on("disconnect", ()=>{
        console.log("user live", socket.io)
    })
})

server.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    console.log("hi let start code")
})

