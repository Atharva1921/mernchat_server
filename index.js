import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import {errHandler} from "./middleware/errorHandler.js";
import goalRoutes from "./routes/goalRoutes.js"
import conversationRoutes from "./routes/conversationRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import cookieParser from "cookie-parser"
import http from "http"
import { Server } from "socket.io"


dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);



const io = new Server(server, {
    cors: {
      origin: '*',
    }
  });

let users = [] ;

const addUser = (userId,socketId) => {
    /*const value = users.some(user => user.userId === userId) 
    console.log(value);
    if(value == false);
    {
        users.push({userId,socketId})
    }*/

    !users.some((user) => user.userId === userId) &&
    users.push({userId,socketId});
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
}

    
io.on("connection", (socket) => {

    socket.on("addUser", async (userId) => {
        
        //console.log(`a user joined ${userId}& ${socket.id}`);
        addUser(userId,socket.id);
        //console.log(users);
        io.emit("users", users);
    })

    // send and receive message.

    socket.on('sendMessage', ({senderId, receiverId, text}) => {
        const user = getUser(receiverId)
        io.to(user.socketId).emit('getMessage', {
            senderId,
            text,
        })
    })

    socket.on("disconnect", () => {
        removeUser(socket.id);
        io.emit("users", users);

    });
})








app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/api/user',userRoutes);
app.use('/api/goals',goalRoutes);
app.use('/api/conversations',conversationRoutes);
app.use('/api/messages',messageRoutes);

app.use(errHandler);

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

export default server;
