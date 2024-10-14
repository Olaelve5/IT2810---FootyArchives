import { model, Schema } from "mongoose";

const matchupSchema = new Schema({
  id: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: false,
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

const Matchup = model("Matchup", matchupSchema);

export default Matchup;
