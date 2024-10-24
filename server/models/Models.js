const mongoose = require("mongoose")
//schemas

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String,
    name: String
},{versionKey: false});
const CategorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
},{versionKey: false});
const Category2Schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    category: CategorySchema
},{versionKey: false});
const TopicSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    category2: Category2Schema
},{versionKey: false});
const QuestionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question: String,
    topic: TopicSchema
},{versionKey: false});
const VocabularySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    meaning: String,
    type: String,
    user: UserSchema,
    date: String
},{versionKey: false})


const User = mongoose.model('User', UserSchema);
const Category = mongoose.model('Category', CategorySchema);
const Category2 = mongoose.model('Category2', Category2Schema);
const Question = mongoose.model('Question',QuestionSchema);
const Vocabulary = mongoose.model('Vocabulary',VocabularySchema);
const Topic = mongoose.model('Topic',TopicSchema)
module.exports={User, Category, Category2, Question, Vocabulary, Topic};