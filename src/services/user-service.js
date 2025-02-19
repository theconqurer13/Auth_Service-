
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repository/user-repo');
const {JWT_JEY} = require('../config/config');
class  UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }
    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
            
        } catch (error) {
            console.log("err at service lvl",error);
            throw {error};
        }
    }
    async delete(data){
        try {
            const response = await this.userRepository.destroy(data);
            return response;
            
        } catch (error) {
            console.log("err at service lvl",error);
            throw {error};
        }
    }
     createToken(user){
        try {
            const result = jwt.sign(user,JWT_JEY,{expiresIn:'1h'});
            return result; 
        } catch (error) {
            console.log("err at token creation",error);
            throw{error};
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
        } catch (error) {
            console.log("err at token verification",error);
            throw{error};
        }
    }

    checkPassword(userInputPlainPassword,encryptedpassword){
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedpassword);
        } catch (error) {
            console.log("something went wrong at checkpasswrd",error);
            throw{error};
        }
    }
}

module.exports = UserService;