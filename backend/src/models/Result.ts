import { ObjectId } from 'mongodb';
import { model, Schema } from "mongoose";

const matchupSchema = new Schema({
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

const Result = model("Result", matchupSchema, 'results');

export default Result;
