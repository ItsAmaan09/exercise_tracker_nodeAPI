const User = require("../models/user-model");
const Exercise = require("../models/exercise-model");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { username } = req.body;
    const newUser = new User({ username });
    await newUser.save();
    res.json({ username: newUser.username, _id: newUser._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createExercise = async (req, res) => {
  try {
    const { _id } = req.params;
    const { description, duration, date } = req.body;

    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const doc = new Exercise({
      userId: _id,
      description,
      duration: parseInt(duration),
      date: date ? new Date(date) : new Date(),
    });

    await doc.save();

    res.json({
      _id: user._id,
      username: user.username,
      description: doc.description,
      duration: doc.duration,
      date: doc.date.toDateString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLogs = async (req, res) => {
  try {
    const { _id } = req.params;
    const { from, to, limit } = req.query;
    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ error: "user not found" });

    let filter = { userId: _id };
    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$gte = new Date(to);
    }

    let exercises = await Exercise.find(filter);
    if (limit) {
      exercises = exercises.slice(0, parseInt(limit));
    }

    res.json({
      _id: user._id,
      username: user.username,
      count: exercises.length,
      log: exercises.map((e) => ({
        description: e.description,
        duration: e.duration,
        date: e.date.toDateString(),
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  createExercise,
  getLogs
};
