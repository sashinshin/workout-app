const express = require('express');
const bodyParser = require('body-parser');
const dateFormat = require("dateformat");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:8080', 'https://arcane-journey-53631.herokuapp.com/']
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("** Origin of request " + origin)
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       console.log("Origin acceptable")
//       callback(null, true)
//     } else {
//       console.log("Origin rejected")
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions))

let exercises = [
  {
    id: 1,
    name: "deadlift",
    muscleTrained: ["back", "legs"]
  },
  {
    id: 2,
    name: "squat",
    muscleTrained: ["legs"]
  },
  {
    id: 3,
    name: "benchpress",
    muscleTrained: ["chest", "shoulders", "triceps"]
  }
]

const nextId = exerciseArray => {
  const highestId = exerciseArray.reduce((accumulator, currentValue) => (currentValue.id > accumulator 
    ? currentValue.id 
    : accumulator), 0);
  return Number.parseInt(highestId, 10) + 1;
};

app.get('/api/exercises', (req, res) => {
  res.send(exercises);
});

app.post('/api/exercises', (req, res) => {
  const newExercise = req.body;
  newExercise.id = nextId(exercises);
  exercises.push(newExercise);
  res.send(`${req.body.name} added!`);
});

app.get('/api/exercises/:muscleGroup', (req, res) => {
  const output = [];
  exercises.forEach(exercise => {
    exercise.muscleTrained.forEach(muscle => {
      if (muscle === req.params.muscleGroup) {
        output.push(exercise)
      }
    })
  });
  console.log(req.params.muscleGroup);
  res.send(output);
});

let programs = [
  {
    id: 1,
    name: "3x5",
    exercises: [
      {
        name: "deadlift",
        reps: 5,
        weight: 120,
      },
      {
        name: "deadlift",
        reps: 5,
        weight: 120,
      },
      {
        name: "deadlift",
        reps: 5,
        weight: 120,
      },
      {
        name: "squat",
        reps: 5,
        weight: 100,
      },
      {
        name: "squat",
        reps: 5,
        weight: 100,
      },
      {
        name: "squat",
        reps: 5,
        weight: 100,
      },
      {
        name: "benchpress",
        reps: 5,
        weight: 60,
      },
      {
        name: "benchpress",
        reps: 5,
        weight: 60,
      },
      {
        name: "benchpress",
        reps: 5,
        weight: 60,
      },
    ]
  }
]

app.get('/api/programs', (req, res) => {
  res.send(programs);
})

app.post('/api/programs', (req, res) => {
  const newProgram = req.body;
  newProgram.id = nextId(programs);
  programs.unshift(newProgram);
  res.send(programs);
})

let finishedWorkouts = []

app.get('/api/finishedworkouts', (req, res) => {
  res.send(finishedWorkouts);
})

app.post('/api/finishedworkouts', (req, res) => {
  const finished = req.body;
  const date = dateFormat(req.body.workoutStart, 'ddd mmm dd, yyyy');
  const start = dateFormat(req.body.workoutStart, 'HH:MM');
  const end = dateFormat(req.body.workoutEnd, 'HH:MM');
  finishedWorkouts.unshift({...finished, workoutEnd: end, workoutStart: start, date: date});
  res.send(finishedWorkouts);
})

const path = require('path');
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
