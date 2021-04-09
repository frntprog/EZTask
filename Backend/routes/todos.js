const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/',  async (req,res) => {
    console.log('Get')
    try{
        const todos = await Todo.find().sort({date: -1});
        res.json(todos)
    }catch (e) {
        res.json({message: e})
    }
})

router.post('/',  async (req,res) => {
    const todo = new Todo({
        task: req.body.task
    })
    try{
        const savedTodo = await todo.save();
        res.json(savedTodo);
    }catch (e) {
        res.json({message: e})
    }
})

router.delete('/one/:todoID', async (req, res) => {
    try {
        const removedTodo = await Todo.deleteOne({_id: req.params.todoID})
        res.json(removedTodo);
    } catch (e) {
        res.json({message: e})
    }
})

router.delete('/done', async (req, res) => {
        try {
            const removedTodo = await Todo.deleteMany({completed: true})
            res.json(removedTodo);
        } catch (e) {
            res.json({message: e})
        }
    }
)

router.patch('/:todoID', async (req, res)=> {
    try{
        const updatedTodo =  await Todo.updateOne({_id: req.params.todoID}, {$set: {completed: req.body.completed}})
        res.json(updatedTodo);
        console.log('Patch')
    }catch (e) {
        res.json({message: e})
    }
})

module.exports = router;
