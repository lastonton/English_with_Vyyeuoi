require('../utils/MongooseUtil');
const Models = require('./Models');

const VocabularyDAO = {
    async selectAllByUser(_uid){
        const query = {"user._id": _uid};
        const vocabulary = await Models.Vocabulary.find(query).exec();
        return vocabulary;
    },
    async insert(vocabulary){
        const mongoose = require('mongoose');
        vocabulary._id = new mongoose.Types.ObjectId();
        const result = await Models.Vocabulary.create(vocabulary);
        return result;
    },
    async delete(_id){
        const result = await Models.Vocabulary.findByIdAndDelete(_id);
        return result;
    },
    async selectWordByDayByUser(_uid,date){
        const query = {"user._id": _uid,date:date};
        const vocabulary = await Models.Vocabulary.find(query).exec();
        return vocabulary;
    }
}
module.exports = VocabularyDAO;