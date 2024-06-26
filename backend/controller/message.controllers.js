import mongoose from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;

    const receiverId = new mongoose.Types.ObjectId(req.params.id);

    const senderId = req.user._id; //current user

    let conversation = await Conversation.findOne({
      participants: {
        $all: [receiverId, senderId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [receiverId, senderId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    //socket io:
    const receiverSocketId = getRecieverSocketId(receiverId);
    if (receiverSocketId) {
      //sending event to only specific client:
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const receiverId = new mongoose.Types.ObjectId(req.params.id);
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] },
    }).populate("messages");

    if (!conversation) return res.status(200).send([]);

    res.status(200).json(conversation.messages);
  } catch (error) {
    res.status.json(500).json({ error: "internal server error" });
  }
};
