const express = require('express');
const { getUsers, createUser, createExercise, getLogs } = require('../controller/user-controller');
const router = express.Router();

router.get('/',getUsers);

router.post('/',createUser)

router.post("/:_id/exercises", createExercise);

router.get("/:_id/logs",getLogs)
module.exports = router;