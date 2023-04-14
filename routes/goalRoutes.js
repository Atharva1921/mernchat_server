import { Router } from "express"
import { showGoal,setGoal,updateGoal,deleteGoal } from "../controllers/goalControllers.js";

const goalRouter = Router()

goalRouter.route('/').get(showGoal).post(setGoal);

goalRouter.route('/:id').put(updateGoal).delete(deleteGoal);

export default goalRouter;