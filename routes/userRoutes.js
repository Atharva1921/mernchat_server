import { Router } from "express"
import { registerUser, showUser, loginUser, searchUser,logoutUser } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const userRouter = Router()

userRouter.route('/').get(showUser);
userRouter.route('/search/:key').get(searchUser);
userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').get(protect,logoutUser);
userRouter.get('/home',protect,(req,res) => {
    res.json(req.body)

})
export default userRouter;