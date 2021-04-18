const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const Joi = require('@hapi/joi');

router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find().sort({date: -1});
        res.json(todos);
    } catch (e) {
        res.json({message: e});
    }
});

router.post("/", async (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        task: Joi.string().min(3)
    })
    const {error, value} = schema.validate(data);
    if (error) {
        res.json({error})
    } else {
        try {
            console.log(value)
            const todo = new Todo({
                ...value
            });
            const savedTodo = await todo.save();
            res.json(savedTodo);
        } catch (e) {
            res.json({message: e});
        }
    }
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
    try {
        const removedSubTask = await Todo.updateOne({_id: req.params.todoID}, {$pull: {"detailedInfo": {"subTask": `${data.subTask}`}}});
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
    const {task} = req.body;
    const schema = Joi.object().keys({
        task: Joi.string().min(2)
    })
    const {error, value} = schema.validate({task});
    if (error) {
        console.log(error)
        res.status(403).json(error.details[0].message)
    } else {
        try {
            console.log("TRY")
            const updatedTodo = await Todo.updateOne(
                {_id: req.params.todoID},
                {$set: {task: value.task}}
            );
            res.json(updatedTodo);
        } catch (e) {
            console.log("CATCH")
            res.json({message: e});
        }
    }
});

router.patch("/detailedInfo/:todoID", async (req, res) => {
    const data = req.body;
    const schema = Joi.object().keys({
        subTask: Joi.string().min(2)
    })
    const {error, value} = schema.validate(data);
    if (error) {
        res.status(403).json(error.details[0].message)
    } else {
        try {
            console.log(value)
            const updatedTodo = await Todo.updateOne(
                {_id: req.params.todoID},
                {
                    $push: {
                        detailedInfo: {
                            subTask: value.subTask
                        }
                    }
                }
            );
            res.json(updatedTodo);
        } catch (e) {
            res.json({message: e});
        }
    }

});

module.exports = router;
