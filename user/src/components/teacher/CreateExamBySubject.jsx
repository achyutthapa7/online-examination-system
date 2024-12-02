import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { createExam, getTeacherDetails } from "../../utils/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useParams, useLocation } from "react-router-dom";
const CreateExamBySubject = () => {
  const { subject } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state._id);
  const [examData, setExamData] = useState({
    title: "",
    timeLimit: 0,
    questions: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExamData({ ...examData, [name]: value });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...examData.questions];
    updatedQuestions[index][field] = value;
    setExamData({ ...examData, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...examData.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setExamData({ ...examData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setExamData({
      ...examData,
      questions: [
        ...examData.questions,
        { questionText: "", options: ["", "", "", ""], correctAnswer: 1 },
      ],
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = examData.questions.filter((_, i) => i !== index);
    setExamData({ ...examData, questions: updatedQuestions });
  };

  const handleSubmit = async () => {
    const res = await createExam(
      examData.title,
      examData.questions,
      parseInt(examData.timeLimit),
      location.state.subject
    );
    if (res.statusText) {
      alert("Exam created successfully!");
      navigate("/dashboard/teacher/create-exam");
    }
  }; // Will print the assigned subject object
  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" mb={3}>
        Create Exam
      </Typography>

      {/* Exam Title */}
      <Card sx={{ marginBottom: "20px" }}>
        <CardContent>
          <Typography variant="h6">Exam Details</Typography>
          <TextField
            fullWidth
            label="Exam Title"
            name="title"
            value={examData.title}
            onChange={handleInputChange}
            margin="normal"
          />
          <TextField
            fullWidth
            type="number"
            label="Time Limit (in minutes)"
            name="timeLimit"
            value={examData.timeLimit}
            onChange={handleInputChange}
            margin="normal"
          />
        </CardContent>
      </Card>

      {/* Questions Section */}
      <Typography variant="h6" mb={2}>
        Questions
      </Typography>
      {examData.questions.map((question, index) => (
        <Card key={index} sx={{ marginBottom: "20px" }}>
          <CardContent>
            <Typography variant="subtitle1" mb={2}>
              Question {index + 1}
            </Typography>
            <TextField
              fullWidth
              label="Question Text"
              value={question.questionText}
              onChange={(e) =>
                handleQuestionChange(index, "questionText", e.target.value)
              }
              margin="normal"
            />
            <Grid container spacing={2}>
              {question.options.map((option, optionIndex) => (
                <Grid item xs={6} md={3} key={optionIndex}>
                  <TextField
                    fullWidth
                    label={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optionIndex, e.target.value)
                    }
                    margin="normal"
                  />
                </Grid>
              ))}
            </Grid>
            <TextField
              fullWidth
              type="number"
              label="Correct Answer (Option Number)"
              value={question.correctAnswer}
              onChange={(e) =>
                handleQuestionChange(
                  index,
                  "correctAnswer",
                  parseInt(e.target.value)
                )
              }
              margin="normal"
            />
            <Box mt={2}>
              <IconButton
                color="error"
                onClick={() => removeQuestion(index)}
                title="Remove Question"
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}

      {/* Add Question Button */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddCircleOutlineIcon />}
        onClick={addQuestion}
        sx={{ marginBottom: "20px" }}
      >
        Add Question
      </Button>

      {/* Submit Button */}
      <Button
        variant="contained"
        color="success"
        onClick={handleSubmit}
        sx={{ display: "block", width: "100%", padding: "15px" }}
      >
        Create Exam
      </Button>
    </Box>
  );
};

export default CreateExamBySubject;
