const mongoose = require("mongoose");
const User = require("./user-model");

const ExerciseSchema = mongoose.Schema({
  userId:{type: mongoose.Schema.Types.ObjectId,required:true},
  description: { type: String, required: true },
  duration: { type: Number, requiredd:true },
  date: { type: Date}
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
