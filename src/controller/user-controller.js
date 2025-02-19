const UserService = require('../services/user-service');
const {User} = require('../models/index'); 
const userService = new UserService();

const create = async(req, res) =>{
    try {
        console.log("user, ", User);
            console.log("-------------------------------------------------")
         const response = await userService.create({
            email:req.body.email,
            password:req.body.password
         });
         return res.status(201).json({
            success:true,
            message:'Successfully created a new user',
            data:response,
            err:{}
         })
    } catch (error) {
        console.log("err at the controller lvl",error);
        return res.status(500).json({
            message:'Something went wrong',
            data:{},
            success:false,
            err:error
        })
    }
}
const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: 'Successfully signed in'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}
module.exports = {
    create,signIn
}