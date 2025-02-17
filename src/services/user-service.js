const UserRepository = require('../repository/user-repo');

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
}

module.exports = UserService;