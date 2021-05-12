const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const User = require("../models/User");
const to = require("await-to-js").default;
const {
  validateStr
} = require("../middlewares/middlewares");

router.get("/:username", async (req, res) => {
  const [err, user] = await to(User.findOne({
    username: req.params.username
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

router.patch("/:username/:todoID", async (req, res) => {
  const candidate = await User.findOne({
    username: `${req.params.username}`
  }, {
    $pull: {}
  });

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

router.patch("/:username", async (req, res) => {
  console.log(req.body, req.params.username);
  const {
    task
  } = req.body;
  console.log(task)
  const todos = new Todo({
    task
  });

  const [error, updateUser] = await to(
    User.updateOne({
      username: req.params.username
    }, {
      $push: {
        todos
      },
    })
  );

  if (error) {
    res.json(error);
  }

  const [err, updated] = await to(User.findOne({
    username: req.params.username
  }))

  console.log("UPDATED: ", updated)
  err ? res.json(err) : res.json(updated);
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