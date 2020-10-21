const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: () => new Date()
        },
        exercises: [
            {
            type: {
                type: String,
                trim: true,
                required: "Enter an exercise type"
            },
            name: {
                type: String,
                trim: true,
                required: "Enter an exercise name"
            },
            duration: {
                type: Number,
                required: "Enter duration of workout in minutes"
            },
            weight: {
                type: Number
            },
            reps: {
                type: Number
            },
            sets: {
                type: Number
            },
            distance: {
                type: Number
            }
        }

        ]
    },
    {
        toJSON: {
            // includes virtual properties when data is presented
            virtuals: true
        }
    }
);

// adds a dynamically-created property to schema
workoutSchema.virtual("totalDuration").get(function () {
    // condenses array of exercises to only the sum of the total duration
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
