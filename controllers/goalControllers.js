import asyncHandler from "express-async-handler"
import Goal from "../models/goalModel.js";


const showGoal = asyncHandler( async (req,res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
});

const setGoal = asyncHandler( async (req,res) => {

    if(!req.body.text) {
        res.status(400);
        throw new Error("Please add text");
    }

    else {
        const goal = await Goal.create({
            text: req.body.text,
        })
        res.status(200).json({goal})
    }
});

const updateGoal = asyncHandler( async (req,res) => {
    const goal = await Goal.findById(req.params.id)
    
    if(!goal) {
        res.status(400)
        throw new Error('no goal')
    }
    else {
        const newGoal = await Goal.findByIdAndUpdate(req.params.id, {text: req.body.text} , {new:true})
        res.status(200).json(newGoal)
    }
})

const deleteGoal = asyncHandler( async (req,res) => {
    const goal = await Goal.findById(req.params.id)
    
    if(!goal) {
        res.status(400)
        throw new Error('no goal')
    }
    else {
        const newGoal = await Goal.findByIdAndDelete(req.params.id, {text: req.body.text})
        res.status(200).json("deleted")
    }
});

export {showGoal,setGoal,updateGoal,deleteGoal};