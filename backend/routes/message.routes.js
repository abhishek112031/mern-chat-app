import express from 'express'
import protectRoutes from '../middlewares/protectRoutes.js'
import { sendMessage } from '../controller/message.controllers.js';

const messageRoure=express.Router();



messageRoure.post('/send/:id',protectRoutes,sendMessage)


export default messageRoure;