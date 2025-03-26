const { where } = require('sequelize');
const {User,Role} = require('../models/index'); 
const {ValidationError} = require('../utils/validation-error');
class UserRepository{
    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
                let validationError = new ValidationError(error);
                throw validationError;
            }
           
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

    async getById(userId){
        try {
            const user = await User.findByPk(userId,{
                attributes:['email','id']
            });
            return user;
        } catch (error) {
            console.log("error at repo lvl ", error);
            throw {error}
        }
    }

    async getByEmail(userEmail){
        try {
            const user = await User.findOne({
                where:{email:userEmail}
            });
            return user;
        } catch (error) {
            console.log("error at repo lvl ", error);
            throw {error}
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where:{
                    name:'ADMIN'
                }
            });
            return user.hasRole(adminRole);
            
        } catch (error) {
            console.log("err at repository lvl",error);
            throw {error}
        }
    }
}

module.exports = UserRepository;