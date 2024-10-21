import { ObjectId } from 'mongodb';
import { model, Schema } from "mongoose";

// Scheme for the results collection in the MongoDB database
const ResultSchema = new Schema({
  _id: {
    type: ObjectId,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  home_team: {
    type: String,
    required: true,
  },
  away_team: {
    type: String,
    required: true,
  },
  home_score: {
    type: Number,
    required: true,
  },
  away_score: {
    type: Number,
    required: true,
  },
  tournament: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  neutral: {
    type: Boolean,
    required: false,
  },
});

ResultSchema.virtual('goal_difference').get(function() {
  return Math.abs(this.home_score - this.away_score);
})

// Model for the results collection in the MongoDB database
const Result = model("Result", ResultSchema, 'results');


export default Result;
