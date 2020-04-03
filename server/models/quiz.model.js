import mongoose from "mongoose";

let quizSchema = mongoose.Schema({
  quizName: { type: String, required: true },
  quizWeek: { type: Number, required: true },
  cohort: { type: Number, required: true },
  questions: [
    {
      Q: { type: String, required: true },
      A: { type: String, required: true },
      Choices: [String],
      code: String
    }
  ]
});

export default mongoose.model("Quiz", quizSchema);
