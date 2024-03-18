// Backend server code (index.js)
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv').config()

const app = express();
const port = 5000;


const allowedOrigins = ['http://localhost:3000',"https://bmi-lac.vercel.app"];

app.use(express.json());
app.use(cors({ credentials: true, origin: allowedOrigins }));

// BMI grading thresholds
const bmiGrades = {
  underweight: 18.5,
  normal_weight: 24.9,
  overweight: 29.9,
  obesity: Infinity
};

// Diet and physical therapy modalities
const modalities = {
  underweight: {
    bmiType: "Underweight",
    diet: [
      "Increase calorie intake with nutrient-dense foods",
      "Incorporate protein-rich foods",
      "Consume frequent small meals and snacks"
    ],
    physical_therapy: [
      "Strength training exercises",
      "Resistance exercises",
      "Balance and coordination exercises"
    ]
  },
  normal_weight: {
    bmiType: "Normal Weight",
    diet: [
      "Maintain a balanced diet",
      "Practice portion control and mindful eating",
      "Stay hydrated by drinking plenty of water"
    ],
    physical_therapy: [
      "Regular aerobic exercises",
      "Flexibility and stretching exercises",
      "Incorporate recreational activities like yoga or Pilates"
    ]
  },
  overweight: {
    bmiType: "Overweight",
    diet: [
      "Focus on portion control and reducing calorie intake",
      "Increase intake of fruits, vegetables, and fiber-rich foods",
      "Consider consulting with a registered dietitian"
    ],
    physical_therapy: [
      "High-intensity interval training (HIIT) workouts",
      "Strength training exercises",
      "Participate in group fitness classes or sports activities"
    ]
  },
  obesity: {
    bmiType: "Obesed",
    diet: [
      "Adopt a well-balanced, calorie-controlled diet",
      "Keep a food journal to track eating habits",
      "Seek support from healthcare professionals or registered dietitians"
    ],
    physical_therapy: [
      "Regular aerobic exercises combined with strength training",
      "Work with a certified personal trainer or physical therapist",
      "Engage in enjoyable activities for long-term adherence"
    ]
  }
};


// Endpoint to handle BMI input and return modalities
app.post('/get-modalities', (req, res) => {
  const { bmi } = req.body;

  let grade = 'underweight';
  for (const [key, value] of Object.entries(bmiGrades)) {
    if (bmi < value) {
      grade = key;
      break;
    }
  }

  res.json(modalities[grade]);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});