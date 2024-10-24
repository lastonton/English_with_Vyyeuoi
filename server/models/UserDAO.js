require('../utils/MongooseUtil');
const Models = require('./Models');

const UserDAO = {
    async selectedByUsernameAndPassword(username, password){
        const query = {username: username, password:password};
        const user = await Models.User.findOne(query);
        return user
    },
    async selectById(_uid){
        const user = await Models.User.findById(_uid).exec();
        return user;
    }
};
module.exports = UserDAO;