import { Server } from "socket.io";
import http from 'http';
import express from 'express'


const app= express();

const server=http.createServer(app);
const io=new Server(server,{
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    //   allowedHeaders: ["my-custom-header"],
    //   credentials: true
     
    }
  
});

export const getRecieverSocketId=(receiverId)=>{
   
    return userSocketMap[receiverId];
}

const userSocketMap={};//{userId: socketId"}


io.on('connection',(socket)=>{
    // console.log('a user connected: ', socket.id);

    const userId = socket.handshake.query.userId;

    if(userId!==undefined) {
        userSocketMap[userId]=socket.id;
    }

    //used to send event to all connected users:

    io.emit('getOnlineUsers',Object.keys(userSocketMap));


    socket.on('disconnect',()=>{
        // console.log('a user is disconnected: ', socket.id);

        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap));//updating online users if disconnected!
    })
    
})

export {app,io,server}