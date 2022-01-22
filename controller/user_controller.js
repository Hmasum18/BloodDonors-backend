/**
 * this controller get data from repository
 * and then make the response
 */
import UserRepository from "../repository/user_repository.js"

const userRepo = new UserRepository();

export default class UserController{
    getUsers = async function (req, res, next) {
        console.log("inside user controller getUsers")
        const result = await userRepo.findAll();
        if(result.success){
            return res.status(200).json({code: 200, data: result.data});
        }
        return res.status(500).json({code: 500, error: "Internal server error"})
    }

    getUser = async function (req, res, next) {
        console.log("inside user controller getUsers")
        const id = req.params.id;
        const result = await userRepo.findOne(id);
        if(result.success){
            if(result.data.length >= 1)
                return res.status(200).json({code: 200, data: result.data[0]});
            return res.status(404).json({code: 404, error: `User with id ${id} not found!`});
        }
        return res.status(500).json({code: 500, error: result.error.message})
    }
} 