import express from 'express'
import protectRoutes from '../middlewares/protectRoutes.js'
import { sendMessage,getMessages } from '../controller/message.controllers.js';

const messageRoure=express.Router();



messageRoure.post('/send/:id',protectRoutes,sendMessage)
messageRoure.get('/get-messages/:id',protectRoutes,getMessages)



export default messageRoure;