require('mongoose');
const Models = require('./Models');

const Category2DAO = {
    async selectAll() {
        const query = {};
        const categories2 = await Models.Category2.find(query).exec();
        return categories2;
    },
    async selectById(_id) {
        const category = await Models.Category2.findById(_id).exec();
        return category;
    },
    async selectByCategoryId(_category_id){
        const query = {'category._id': _category_id};
        const categories2 = await Models.Category2.find(query).exec();
        return categories2;
    },
    async insert(category2){
        const mongoose = require('mongoose');
        category2._id = new mongoose.Types.ObjectId();
        const result = await Models.Category2.create(category2);
        return result;
    }
};
module.exports = Category2DAO;