require('../utils/MongooseUtil');
const Models = require('./Models');

const TopicDAO = {
    async selectAll() {
        const query = {};
        const topics = await Models.Category.find(query).exec();
        return topics
    },
    async selectById(_id){
        const topic = await Models.Topic.findById(_id).exec();
        return topic
    },
    async selectByCategory2Id(cid) {
        const query = {'category2._id': cid};
        const topics = await Models.Topic.find(query).exec();
        return topics;
    },
    async insert(topic){
        const mongoose = require('mongoose');
        if (Models.Topic.find({name: topic.name})){
            return {error:"That's topic have been existed!"}
        }
        topic._id = new mongoose.Types.ObjectId();
        const result = await Models.Topic.create(topic);
        return result;
    }
};
module.exports = TopicDAO;