require('../utils/MongooseUtil');
const Models = require('./Models');

const QuestionDAO = {
    async selectAll() {
        const query = {};
        const question = Models.Question.find(query).exec();
        return question
    },
    async selectRandomQuestion() {
        const allquestion = await QuestionDAO.selectAll();
        let a = allquestion.length;
        return allquestion[Math.floor(Math.random()*a)];
    },
    async insert(question){
        const mongoose = require('mongoose');
        question._id = new mongoose.Types.ObjectId();
        const result = await Models.Question.create(question);
        return result;
    },
    async delete(_id){
        const result = await Models.Question.findByIdAndDelete(_id);
        return result;
    },
    async update(_id){
 
    },
    async selectByTopicId(_topic_id){
        const query = {'topic._id': _topic_id};
        const questions = await Models.Question.find(query).exec();
        return questions;
    },
    async selectRandomQuestionByTopic(_topic_id) {
        const question_by_topic = await QuestionDAO.selectByTopicId(_topic_id);
        let length = question_by_topic.length;
        return question_by_topic[Math.floor(Math.random()*length)]
    },
    async selectByTask(_cid){
        const query = {'topic.category2._id': _cid};
        const questions = await Models.Question.find(query).exec();
        return questions;

    },
    async selectRandomQuestionByTask(_cid){
        const question_by_task = await QuestionDAO.selectByTask(_cid);
        let length = question_by_task.length;
        if (!question_by_task){
            return {"error": "No question to Generate"}
        }
        return question_by_task[Math.floor(Math.random()*length)];
    }
};
module.exports = QuestionDAO
