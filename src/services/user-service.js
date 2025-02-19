
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserRepository = require('../repository/user-repo');
const {JWT_KEY} = require('../config/server-config');
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
            const result = jwt.sign(user,JWT_KEY,{expiresIn:'1h'});
            return result; 
        } catch (error) {
            console.log("err at token creation",error);
            throw{error};
        }
    }

    async signIn(email,plainPassword){
        try {
            // fetch the user using email
            const user = await this.userRepository.getByEmail(email);
            // compare incoming plain passwrod with encrypted passwrd

            const passwordMatch = this.checkPassword(plainPassword,user.password);
            if(!passwordMatch){
                console.log("password doesnt match");
                throw{error:'incorrect passwrod'}
            }
            // if password match then create token and return
            const newJWT = this.createToken({email:user.email,id:user.id});
            return newJWT;
        } catch (error) {
            console.log("something went wrong in sign fn",error);
            throw {error};
        }
    }



    verifyToken(token){
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
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