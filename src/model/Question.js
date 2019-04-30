import mongoose from 'mongoose';
import random from 'mongoose-simple-random';

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    acceptedAnswers: {
        type: Array,
        required: true
    }
});

QuestionSchema.plugin(random)

const Question = mongoose.model('questions', QuestionSchema);

module.exports = Question;