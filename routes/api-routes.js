const Workout = require("../models/workoutModel");

module.exports = function (app) {

    app.get("/api/workouts", function (req, res) {
      Workout.find()
      .then(data => {
          res.json(data)
      })
      .catch(err => {
          res.json(err)
      })
    });

    app.post("/api/workouts", function (req, res) {
      Workout.create({})
        .then(data => res.json(data))
        .catch(err => {
            console.log("err", err)
            res.json(err)
        })
    });

    app.put("/api/workouts/:id", ({ body, params }, res) => {
        Workout.findByIdAndUpdate(
            params.id,
            { $push: { exercise: body }},
            { new: true, runValidators: true }
        )
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });

    app.get("/api/workouts/range", (req, res) => {
      Workout.find({}).limit(7)
      .then(dbWorkouts => {
          console.log("dbWorkouts");
          res.json(dbWorkouts);
      })
      .catch(err => {
          res.json(err);
      });
    });

    app.delete("/api/workouts", ({ body }, res) => {
        Workout.findByIdAndDelete(body.id)
          .then(() => {
              res.json(true);
          })
          .catch(err => {
            res.json(err);
          });
    });
}