const {User} = require('../models/user'); 

class UserRepository{
    async create(data){
        try {
            const user =  await User.create(data);
            return user;
        } catch (error) {
            console.log("err at repo lvl ", error);
            throw error;
        }
    }
    async destroy(userId){
        try {
            const response = await User.destroy({where: {id: userId}});
            return response;
        } catch (error) {
            console.log("err at repo lvl ", error);
            throw error;
        }
    }
}

module.exports = UserRepository;