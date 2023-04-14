import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    conversationID:{
        type:String,
    },
    sender:{
        type:String,
    },
    text:{
        type:String,
    },
},
    {
        timestamps:true
    }
);

const Message = mongoose.model("message", messageSchema);
export default Message;

