require('../utils/MongooseUtil');
const Models = require('./Models');

const CategoryDAO = {
    async selectAll() {
        const query = {};
        const categories = await Models.Category.find(query).exec();
        return categories
    },
    async selectById(_id){
        const category = await Models.Category.findById(_id).exec();
        return category
    },
    async insert(category){
        const mongoose = require('mongoose');
        category._id = new mongoose.Types.ObjectId();
        const result = await Models.Category.create(category);
        return result;
    }
};


module.exports = CategoryDAO;