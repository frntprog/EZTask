const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const Joi = require("@hapi/joi");
const to = require("await-to-js").default;
const {validatePostTodo} = require("../middlewares/middlewares");

router.patch("/:todoId", validatePostTodo, async (req, res) => {
    const {
        error,
        subTask
      } = req.body;
 
    if (error) {
      res.status(403).json(error.details[0]);
    } else {
      const [err, newSubTask] = await to(
        Todo.updateOne({
          _id: req.params.todoId
        }, {
          $push: {
            subTasks: {
              subTask,
            },
          },
        })
      );
      err ? res.json(err) : res.json(newSubTask);
    }
  });

  router.patch("/:todoID/:subID", async (req, res) => {
    const [err, removedSubTask] = await to(
      Todo.updateOne({
        _id: req.params.todoID
      }, {
        $pull: {
          subTasks: {
            _id: `${req.params.subID}`
          }
        }
      })
    );
  
    err ? res.json(err) : res.json(removedSubTask);
  });

  module.exports = router;