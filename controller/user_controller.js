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
        console.log("inside user controller getUsers")
        const result = await userRepo.findAll();
        if(result.success){
            return res.status(200).json({code: 200, data: result.data});
        }
        return res.status(500).json({code: 500, error: "Internal server error"})
    }

    getUser = async (req, res, next) => {
        console.log(`${TAG} getUser`)

        var id = req.params.id;
        console.log(`"user id: ${id}`);

        if(id === undefined){
            const token = req.headers["authorization"];
            const userInfo = parseJwt(token);
            //console.log(`token: ${token}`);
            //console.log(userInfo);
            id = userInfo.user_id;
        }
       

        const result = await userRepo.findOne(id);
        if(result.success){
            if(result.data.length >= 1){
                const user = result.data[0];
                const locationResult = await userRepo.findUserLocation(user.LOCATION_ID);
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