import asyncHandler from "express-async-handler"
import Conversation from "../models/conversationModel.js";

const createConversation = asyncHandler( async (req,res) => {
    //console.log(req.body._id);
    const {senderID ,receiverID } = req.body
    const registerConversation = new Conversation({
        members: [ senderID, receiverID],
    });

    try {
        const registerdConversation = await registerConversation.save()
        res.json(registerdConversation);
    } catch (error) {
        res.status(500).json(error)
    }
});

const getComversation = asyncHandler( async (req,res) => {
    const userID = req.params.userID

    try {
        const conversation = await Conversation.find({
            
            members: { $in:[userID]},

        });
        res.json(conversation);
    } catch (error) {
        res.status(500).json(error)
    }
});

const searchConvarsation = asyncHandler( async (req,res) => {

    const {senderID ,receiverID } = req.body
    try {
        const search = await Conversation.find({
           
            members: {$all :[senderID,receiverID]},
        });    
        res.json(search);
    } catch (error) {
        res.json(error)
    }
    
    
});

const deleteConversation = asyncHandler( async (req,res) => {
    const ID = req.params.conversationID
    try {
        const deletedConversation = await Conversation.findByIdAndDelete({
            _id : ID
        });

        res.status(200).json(deletedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
});

export {createConversation,getComversation, searchConvarsation, deleteConversation};