const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const User = require("../models/User");
const to = require("await-to-js").default;
const { validateStr } = require("../middlewares/middlewares");

router.patch("/complete/:personName", async (req, res) => {
  console.log("HERE");
  const result = await User.updateOne(
    {
      "todos._id": "609b8e054d0ceb19d432f8a5",
    },
    {
      $set: {
        "todos.$.completed": true,
      },
    }
  );

  console.log(result);
  res.json(result);
  // const [err, updatedTodo] = await to(
  //   User.updateOne(
  //     {
  //       username: req.params.personName,
  //     },
  //     {
  //       $set: {
  //         "todos.completed": true,
  //       },
  //     }
  //   )
  // );
  // err
  //   ? res.json({
  //       message: err,
  //     })
  //   : res.json(updatedTodo);
});

router.get("/:username", async (req, res) => {
  const [err, user] = await to(
    User.findOne({
      username: req.params.username,
    })
  );
  console.log(user);
  err ? res.json(err) : res.json(user);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error, task, username } = req.body;
  if (error) {
    res.status(400).json({
      message: "Error",
    });
    return;
  }

  const candidate = await User.findOne({
    username,
  });
  console.log("CANDIDATE: ", candidate);
  const todo = new Todo({
    task,
  });

  const [err, savedTodo] = await to(todo.save());
  err ? res.status(500).json(error) : res.status(201).json(savedTodo);
});

router.patch("/:username/:todoID", async (req, res) => {
  const [err, deletedTodo] = await to(
    User.updateOne(
      {
        username: `${req.params.username}`,
      },
      {
        $pull: {
          todos: {
            _id: `${req.params.todoID}`,
          },
        },
      }
    )
  );

  err ? res.status(500).json(err) : res.json(deletedTodo);
});

router.delete("/", async (req, res) => {
  const [err, value] = await to(
    Todo.deleteMany({
      completed: true,
    })
  );

  value ? res.json(value) : res.json(err);
});

router.patch("/:username", async (req, res) => {
  const { task } = req.body;
  const todos = new Todo({
    task,
  });

  const [error, updateUser] = await to(
    User.updateOne(
      {
        username: req.params.username,
      },
      {
        $push: {
          todos,
        },
      }
    )
  );

  if (error) {
    res.json(error);
  }

  const [err, updated] = await to(
    User.findOne({
      username: req.params.username,
    })
  );

  err ? res.json(err) : res.json(updated);
});

router.delete("/:todoID", async (req, res) => {
  const [err, removedTodo] = await to(
    Todo.deleteOne({
      _id: req.params.todoID,
    })
  );

  err ? res.json(err) : res.json(removedTodo);
});

router.patch("/edit/:todoID", validateStr, async (req, res) => {
  const { error, task } = req.body;
  if (error) {
    res.status(403).json(error.details[0]);
    return;
  }
  const [err, updatedTodo] = await to(
    Todo.updateOne(
      {
        _id: req.params.todoID,
      },
      {
        $set: {
          task: task,
        },
      }
    )
  );
  err ? res.json(err) : res.json(updatedTodo);
});

module.exports = router;
