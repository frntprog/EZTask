const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const Joi = require("@hapi/joi");
const to = require("await-to-js").default;

router.get("/", async (req, res) => {
  const [err, todos] = await to(Todo.find().sort({ date: -1 }));
  err ? res.json(err) : res.json(todos);
});

router.post("/", async (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    task: Joi.string().min(3),
  });
  const { error, value } = schema.validate(data);
  if (error) {
    res.status(400).json({ error });
    return;
  }
  const todo = new Todo({
    ...value,
  });
  const [err, savedTodo] = await to(todo.save());
  err ? res.status(500).json(error) : res.status(201).json(savedTodo);
});

router.delete("/:todoID", async (req, res) => {
  const [err, removedTodo] = await to(
    Todo.deleteOne({ _id: req.params.todoID })
  );

  err ? res.json(err) : res.json(removedTodo);
});

router.delete("/", async (req, res) => {
  const [err, value] = await to(Todo.deleteMany({ completed: true }));

  value ? res.json(value) : res.json(err);
});

router.patch("/:todoID/:subID", async (req, res) => {
  const [err, removedSubTask] = await to(
    Todo.updateOne(
      { _id: req.params.todoID },
      { $pull: { subTasks: { _id: `${req.params.subID}` } } }
    )
  );

  err ? res.json(err) : res.json(removedSubTask);
});

router.patch("/:todoID", async (req, res) => {
  const [err, updatedTodo] = await to(
    Todo.updateOne(
      { _id: req.params.todoID },
      { $set: { completed: req.body.completed } }
    )
  );
  err ? res.json({ message: e }) : res.json(updatedTodo);
});

router.patch("/edit/:todoID", async (req, res) => {
  console.log("HELLO");
  const { task } = req.body;
  const schema = Joi.object().keys({
    task: Joi.string().min(3),
  });
  const { error, value } = schema.validate({ task });
  if (error) {
    res.status(403).json(error.details[0]);
    return;
  }
  const [err, updatedTodo] = await to(
    Todo.updateOne({ _id: req.params.todoID }, { $set: { task: value.task } })
  );
  err ? res.json(err) : res.json(updatedTodo);
});

router.patch("/:todoID/subTask", async (req, res) => {
  const data = req.body;
  const schema = Joi.object().keys({
    subTask: Joi.string().min(3),
  });
  const { error, value } = schema.validate(data);
  if (error) {
    res.status(403).json(error.details[0]);
  } else {
    const [err, updatedTodo] = await to(
      Todo.updateOne(
        { _id: req.params.todoID },
        {
          $push: {
            subTasks: {
              subTask: value.subTask,
            },
          },
        }
      )
    );
    err ? res.json(err) : res.json(updatedTodo);
  }
});

module.exports = router;
