const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const {schema} = require('../models/Validation');

router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find().sort({date: -1});
        res.json(todos);
    } catch (e) {
        res.json({message: e});
    }
});

router.post("/", async (req, res) => {
    try {
        const result = schema.validate(req.body);
        const todo = new Todo({
            task: result.value.task
        });
        const savedTodo = await todo.save();
        res.json(savedTodo);
    } catch (e) {
        res.json({message: e});
    }

    // const todo = new Todo({
    //     task: req.body.task,
    // });
    // try {
    //     const savedTodo = await todo.save();
    //     res.json(savedTodo);
    // } catch (e) {
    //     res.json({message: e});
    // }
});

router.delete("/one/:todoID", async (req, res) => {
    try {
        const removedTodo = await Todo.deleteOne({_id: req.params.todoID});
        res.json(removedTodo);
    } catch (e) {
        res.json({message: e});
    }
});

router.delete("/done", async (req, res) => {
    try {
        const removedTodo = await Todo.deleteMany({completed: true});
        res.json(removedTodo);
    } catch (e) {
        res.json({message: e});
    }
});

router.patch("/delete/subTask/:todoID", async (req, res) => {
    console.log("DELETD", req.body)
    try {
        const removedSubTask = await Todo.updateOne({_id: req.params.todoID}, {$pull: {"detailedInfo": {"subTask": `${req.body.subTask}`}}});
        res.json(removedSubTask);
    } catch (e) {
        res.json({message: e});
    }
});

router.patch("/:todoID", async (req, res) => {
    try {
        const updatedTodo = await Todo.updateOne(
            {_id: req.params.todoID},
            {$set: {completed: req.body.completed}}
        );
        res.json(updatedTodo);
    } catch (e) {
        res.json({message: e});
    }
});

router.patch("/edit/:todoID", async (req, res) => {
    try {
        const updatedTodo = await Todo.updateOne(
            {_id: req.params.todoID},
            {$set: {task: req.body.task}}
        );
        res.json(updatedTodo);
    } catch (e) {
        res.json({message: e});
    }
});

router.patch("/detailedInfo/:todoID", async (req, res) => {
    console.log("Add SubTAsk", req.body)
    try {
        const updatedTodo = await Todo.updateOne(
            {_id: req.params.todoID},
            {
                $push: {
                    detailedInfo: {
                        subTask: req.body.subTask
                    }
                }
            }
        );
        res.json(updatedTodo);
    } catch (e) {
        res.json({message: e});
    }
});

module.exports = router;
