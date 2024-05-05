import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage=async(req,res,next)=>{
   try {
    const {message}=req.body;
    const receiverId=new mongoose.Types.ObjectId(req.params.id) ;
    const senderId=req.user._id;//current user
    console.log(message,receiverId,senderId);

    const conversation=await Conversation.findOne({
      participants:{$all:[receiverId,senderId]}
    });

    if(!conversation){
      await Conversation.create({
         participants:[receiverId,senderId] 

      })
    }
    const newMessage=new Message({
      senderId,receiverId,message
    })

    if(newMessage){
      console.log('new mesage is created!!!')
      conversation.messages.push(newMessage._id);

    }
    await conversation.save();
    await newMessage.save();

    res.status(201).json(newMessage)
    
   } catch (error) {
    
   }
}