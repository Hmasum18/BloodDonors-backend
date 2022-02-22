/**
 * this controller get data from repository
 * and then make the response
 */
import { parseJwt } from "../middleware/authorization.js";
import UserRepository from "../repository/user_repository.js"
const TAG = "user_controller.js->"

const userRepo = new UserRepository();

export default class UserController{
    getUsers = async function (req, res, next) {
        // console.log("inside user controller getUsers")
        const result = await userRepo.findAll(false);
        if(result.success){
            return res.status(200).json({code: 200, data: result.data});
        }
        return res.status(500).json({code: 500, error: "Internal server error"})
    }

    searchUserByName = async function (req, res, next) {
        let filterString = req.params.filter_string;
        // console.log(filterString)
        const result = await userRepo.findByName(filterString, false);
        // console.log(result)
        if(result.success){
            return res.status(200).json({code: 200, data: result.data});
        }
        return res.status(500).json({code: 500, error: "Internal server error"})
    }

    getUser = async (req, res, next) => {
        // console.log(`${TAG} getUser`)

        var id = req.params.id;
        // console.log(`"user id: ${id}`);

        if(id === undefined){
            id = req.body.user.id;
        }
       

        const result = await userRepo.findOne(id, false);
        if(result.success){
            if(result.data.length >= 1){
                const user = result.data[0];
                const locationResult = await userRepo.findUserLocation(user.LOCATION_ID, false);
                if(locationResult.success && locationResult.data.length>0){
                    const location = locationResult.data[0];
                    ['ID', 'ACTIVE'].forEach(e => delete location[e]);
                    user.LOCATION = location;
                    // https://stackoverflow.com/questions/32534602/javascript-built-in-function-to-delete-multiple-keys-in-an-object
                    ['LOCATION_ID', 'PASSWORD','ACTIVE'].forEach(e => delete user[e]);
                }
                return res.status(200).json({code: 200, data: user});
            } 
            return res.status(404).json({code: 404, error: `User with id ${id} not found!`});
        }
        return res.status(500).json({code: 500, error: result.error.message})
    }
    
} 