import { Router } from "express"
import { sendMessage,getMessage,deleteMessage } from "../controllers/messageController.js";


const messageRouter = Router();

messageRouter.route("/").post(sendMessage);

messageRouter.route("/:conversationID").get(getMessage);

messageRouter.route("/:conversationID").delete(deleteMessage);


export default messageRouter;