import { Router } from "express"
import { createConversation, getComversation, searchConvarsation, deleteConversation } from "../controllers/conversationController.js";
import protect from "../middleware/authMiddleware.js"
const conversationRouter = Router();

conversationRouter.route("/").post(createConversation);

conversationRouter.route("/:userID").get(getComversation);

conversationRouter.route('/search').post(searchConvarsation);

conversationRouter.route("/:conversationID").delete(deleteConversation);


export default conversationRouter;