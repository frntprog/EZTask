const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const User = require("../models/User");
const to = require("await-to-js").default;
const {
  validateStr
} = require("../middlewares/middlewares");

router.get("/:userID", async (req, res) => {
  const [err, user] = await to(User.findOne({
    "_id": "609a4aa37817183768df00ba"
  }))
  console.log(user);
  err ? res.json(err) : res.json(user);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const {
    error,
    task,
    username
  } = req.body;
  if (error) {
    res.status(400).json({
      message: "Error"
    });
    return;
  }

  const candidate = await User.findOne({
    username
  });
  console.log("CANDIDATE: ", candidate)
  const todo = new Todo({
    task
  });

  const [err, savedTodo] = await to(todo.save());
  err ? res.status(500).json(error) : res.status(201).json(savedTodo);
});

router.delete("/:todoID", async (req, res) => {
  const [err, removedTodo] = await to(
    Todo.deleteOne({
      _id: req.params.todoID
    })
  );

  err ? res.json(err) : res.json(removedTodo);
});

router.delete("/", async (req, res) => {
  const [err, value] = await to(Todo.deleteMany({
    completed: true
  }));

  value ? res.json(value) : res.json(err);
});

router.patch("/:userID", async (req, res) => {
  console.log(req.body, req.params.userID);
  const {
    task
  } = req.body;
  console.log(task)
  const todos = new Todo({
    task
  });

  const [err, updateUser] = await to(
    User.updateOne({
      _id: req.params.userID
    }, {
      $push: {
        todos
      },
    })
  );

  console.log(updateUser)
  err ? res.json(err) : res.json(updateUser);
});

router.delete("/:todoID", async (req, res) => {
  const [err, removedTodo] = await to(
    Todo.deleteOne({
      _id: req.params.todoID
    })
  );

  err ? res.json(err) : res.json(removedTodo);
});

router.patch("/:todoID", async (req, res) => {
  const [err, updatedTodo] = await to(
    Todo.updateOne({
      _id: req.params.todoID
    }, {
      $set: {
        completed: req.body.completed
      }
    })
  );
  err ? res.json({
    message: err
  }) : res.json(updatedTodo);
});

router.patch("/edit/:todoID", validateStr, async (req, res) => {
  const {
    error,
    task
  } = req.body;
  if (error) {
    res.status(403).json(error.details[0]);
    return;
  }
  const [err, updatedTodo] = await to(
    Todo.updateOne({
      _id: req.params.todoID
    }, {
      $set: {
        task: task
      }
    })
  );
  err ? res.json(err) : res.json(updatedTodo);
});

module.exports = router;