import { model, Schema } from 'mongoose';

const Translation = new Schema({
  _id: {
    type: String,
    required: true,
  },
  No: {
    type: String,
    required: true,
  },
  Code: {
    type: String,
    required: true,
  },
});

export default model('Translation', Translation, 'translations');
