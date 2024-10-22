import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";

const goalscorerSchema = new Schema({
    _id : {
        type: ObjectId,
        required: true
    },
    
    away_team: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    home_team: {
        type: String,
        required: true
    },
    minute: {
        type: Number,
        required: true
    },
    own_goal: {
        type: Boolean,
        required: true
    },
    penalty: {
        type: Boolean,
        required: true
    },

    scorer : {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    }


})

const Goalscorer = model("Goalscorer", goalscorerSchema, "goalscorers");

export default Goalscorer;
