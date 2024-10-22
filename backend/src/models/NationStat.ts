import { model, Schema } from "mongoose";

// Schema for the top_rival object in the nationstats collection in the MongoDB database
const TopRival = new Schema({
    opponent: {
        type: String,
        required: true,
    },
    total_games: {
        type: Number,
        required: true,
    },
    total_wins: {
        type: Number,
        required: true,
    },
    total_draws: {
        type: Number,
        required: true,
    },
    total_losses: {
        type: Number,
        required: true,
    },
    total_goals_scored: {
        type: Number,
        required: true,
    },
    total_goals_conceded: {
        type: Number,
        required: true,
    },
});


// Scheme for the nationstats collection in the MongoDB database
const NationStat = new Schema({
    _id: {
        type: String,
        required: true,
    },
    total_team_games: {
        type: Number,
        required: true,
    },
    total_team_wins: {
        type: Number,
        required: true,
    },
    total_team_draws: {
        type: Number,
        required: true,
    },
    total_team_losses: {
        type: Number,
        required: true,
    },
    total_team_goals_scored: {
        type: Number,
        required: true,
    },
    total_team_goals_conceded: {
        type: Number,
        required: true,
    },
    top_rival: {
        type: TopRival,
        required: true,
    }
});

// Model for the nationstats collection in the MongoDB database
const NationStatModel = model("NationStat", NationStat, 'nationstats');

export default NationStatModel;