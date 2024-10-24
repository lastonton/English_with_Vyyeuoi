const express = require('express');
const router = express.Router();
//daos
const CategoryDAO = require('../models/CategoryDAO');
const Category2DAO = require('../models/Category2DAO');
const UserDAO = require('../models/UserDAO');
const TopicDAO = require('../models/TopicDAO');
const QuestionDAO = require('../models/QuestionDAO');
const VocabularyDAO = require('../models/VocabularyDAO');

//myprofile
//category
router.get('/category', async (req,res)=>{
    const category = await CategoryDAO.selectAll();
    res.json(category);
});
router.post('/category', async (req,res)=>{
    const name = req.body.name;
    const category_item = {name: name};
    const result = await CategoryDAO.insert(category_item);
    res.json(result)
});
//category2
router.get('/category2', async (req,res)=>{
    const category = await Category2DAO.selectAll();
    res.json(category);
});
router.get('/category2/category/:cid', async (req,res)=>{
    const category_id = req.params.cid;
    const category2 = await Category2DAO.selectByCategoryId(category_id);
    res.json(category2);
});
router.get('/category2/:cid', async (req,res)=>{
    const category2_id = req.params.cid;
    const category2 = await Category2DAO.selectById(category2_id);
    res.json(category2);
});
router.post('/category2', async (req,res)=>{
    const name = req.body.name;
    const category_id = req.body.category_id
    const category = await CategoryDAO.selectById(category_id);
    const category2_item = {name: name, category: category};
    const result = await CategoryDAO2.insert(category2_item);
    res.json(result)
})
//topic
router.get('/topic', async (req,res)=>{
    const topic = await TopicDAO.selectAll();
    res.json(topic);
});
router.get('/topic/:cid', async (req,res)=>{
    const category2_id = req.params.cid;
    const topics = await TopicDAO.selectByCategory2Id(category2_id);
    res.json(topics);
});
router.post('/topic', async (req,res)=>{
    const name = req.body.name;
    const category2_id = req.body.category2_id;
    const category2 = await Category2DAO.selectById(category2_id);
    const topic_item = {name: name, category2: category2};
    const result = await TopicDAO.insert(topic_item);
    res.json(result);
})
//question
router.get('/questions',async (req,res) =>{
    const questions = await QuestionDAO.selectAll();
    res.json(questions);
});
router.get('/questions/random',async (req, res)=>{
    const questions = await QuestionDAO.selectRandomQuestion();
    res.json({question: questions.question});
});
router.get('/questions/topic/:topicid', async (req,res) =>{
    const topic_id = req.params.topicid;
    const questions = await QuestionDAO.selectByTopicId(topic_id);
    res.json(questions)
});
router.post('/questions', async (req,res)=>{
    const question = req.body.question;
    const topic_id = req.body.topic;
    const topic = await TopicDAO.selectById(topic_id);
    const question_item = {question: question, topic: topic};
    const result = await QuestionDAO.insert(question_item);
    res.json(result);
});
router.get('/questions/task/:category2id', async (req,res)=>{
    const category2_id = req.params.category2id;
    const questions = await QuestionDAO.selectRandomQuestionByTask(category2_id);
    res.json(questions);
});
router.delete('/questions/:qid', async (req,res)=>{
    const question_id = req.params.qid;
    const result = await QuestionDAO.delete(question_id);
    res.json(result);
});
//vocabulary
router.get('/vocabulary/:user_id',async (req,res) =>{
    const user_id= req.params.user_id;
    const result = await VocabularyDAO.selectAllByUser(user_id);
    res.json(result);
});
router.get('/vocabulary/date/:user_id/:date', async (req,res)=>{
    const user_id = req.params.user_id;
    const date = req.params.date;
    const result = await VocabularyDAO.selectWordByDayByUser(user_id,date);
    res.json(result)
})
router.post('/vocabulary', async (req,res)=>{
    const name = req.body.name;
    const meaning = req.body.meaning;
    const type = req.body.type;
    const user_id = req.body.user_id;
    const user = await UserDAO.selectById(user_id);
    const d = new Date();
    const d_pre = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    const date = d_pre.toISOString().split('T')[0]; // Trả về yyyy-mm-dd
    const vocabulary_item = {name: name, meaning: meaning, type: type, user: user, date: date};
    const result = await VocabularyDAO.insert(vocabulary_item);
    res.json(result);
});
router.delete('/vocabulary/:vid', async (req,res)=>{
    const vocabulary_id = req.params.vid;
    const result = await VocabularyDAO.delete(vocabulary_id);
    res.json(result);
});

module.exports = router;