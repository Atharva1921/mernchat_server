import Message from "../models/messageModel.js";
import asyncHandler from "express-async-handler"


const sendMessage = asyncHandler( async (req,res) => {
    const newMessage = new Message(req.body)

    try {
        const message = await newMessage.save();
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json(error);
    }
    
});

const getMessage = asyncHandler( async (req,res) => {
    const ID = req.params.conversationID
    try {
        const allMessage = await Message.find({
            conversationID : ID ,
        });

        res.status(200).json(allMessage);
    } catch (error) {
        res.status(500).json(error);
    }
});

const deleteMessage = asyncHandler( async (req,res) => {
    const ID = req.params.conversationID
    try {
        const deletedMessages = await Message.deleteMany({
            conversationID : ID ,
        });

        res.status(200).json(deletedMessages);
    } catch (error) {
        res.status(500).json(error);
    }
});

export {sendMessage,getMessage,deleteMessage};