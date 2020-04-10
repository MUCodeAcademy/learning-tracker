import express from "express";
const router = express.Router();
import Quiz from "../models/quiz.model";

// Quiz by Id

router.get("/id/:id", (req, res) => {
  Quiz.findById(req.params.id, function(err, quiz) {
    if (err) {
      return res.send({
        success: false,
        msg: "Something went wrong, please try again later."
      });
    }
    return res.send({ success: true, data: quiz });
  });
});

// Quizzes By Cohort

router.get("/cohort/:cohort", (req, res) => {
  Quiz.find({ cohort: req.params.cohort }, function(err, docs) {
    if (err) {
      return res.send({
        success: false,
        msg: "Something went wrong, please try again later."
      });
    }
    return res.send({ success: true, data: docs });
  });
});

// All Quizzes

router.get("/all", (req, res) => {
  Quiz.find({},
    function(err, docs) {
      if (err) {
        return res.send({
          success: false,
          msg: "Something went wrong, please try again later."
        });
      }
    
  return res.send({ success: true, data: docs });
    })
});

// Create Quiz

router.post("/add", (req, res) => {
  Quiz.create(
    {
      quizName: req.body.quizName,
      quizWeek: req.body.quizWeek,
      cohort: req.body.cohort,
      questions: req.body.questions
    },
    function(err, docs) {
      if (err) {
        return res.send({
          success: false,
          msg: "Something went wrong, please try again later."
        });
      }
      return res.send({ success: true, data: docs });
    }
  );
});

// Edit Quiz

router.put("/edit", (req, res) => {

  Quiz.findByIdAndUpdate(req.body._id, req.body, {new: true, useFindandModify: false}, function(err, quiz) {
    if (err) {
      return res.send({
        success: false,
        msg: "Something went, wrong please try again later."
      });
    }
    return res.send({ success: true, data: quiz });
  });
});

// Delete Quiz

router.delete("/delete/:id", (req, res) => {
  Quiz.findByIdAndDelete(req.params.id, function(err, quiz) {
    if (err) {
      return res.send({
        success: false,
        msg: "Something went, wrong please try again later."
      });
    }
    return res.send({ success: true, data: quiz });
  });
});

export default router;
