import e from "express";
import AuthRepository from "../repository/auth_repository.js";
import bcyrpt from 'bcrypt';
import {v4 as uuidv4} from 'uuid'
import {generateJwtToken} from "../utils/jwt_util.js";
import {objectKeysToLC} from "../utils/key_to_lowercase.js";
import LocationController from "./location_controller.js";
import LocationRepository from "../repository/location_repository.js";

const authRepo = new AuthRepository();
const locationController = new LocationController();
const locationRepository = new LocationRepository();

export default class AuthController{
    register = async function (req, res) {
        // console.log(req.body);
        const hashedPassword = await bcyrpt.hash(req.body.password, 10);
        let result = await locationController.checkingExistingLocation(req.body.location.display_name);
        if(!result.success){
            return res.status(500).json({code: 500, message: "server side problem"});
        }

        let userLocation;

        if(result.data.length === 0) {
            // console.log('inserting location');
            userLocation = {
                id: uuidv4(),
                latitude: req.body.location.latitude,
                longitude: req.body.location.longitude,
                description: req.body.location.display_name ,
            };
            result = await locationRepository.insertOne(userLocation, false)
            // console.log('location ', result)
            if (!result.success) {
                return res.status(500).json({code: 500, message: "server side problem"});
            }
        }else
            userLocation = objectKeysToLC(result.data[0]);
        ['created', 'updated', 'active'].forEach(e => delete userLocation[e])
        console.log(userLocation);
        // const locationId = uuidv4();
        // userLocation = {
        //     id: locationId,
        //     lat: req.body.location.latitude,
        //     lang: req.body.location.longitude,
        //     text: req.body.location.display_name,
        // }

        const emailCheck = await authRepo.checkUser(req.body.email, false);
        // console.log('emailcheck', emailCheck.data[0].flag)
        if(emailCheck.data[0].flag){
            return res.status(409).json({code:409, message: "This email has already been used."})
        }

        // const locationResult = await authRepo.insertUserLocation(userLocation, false);
        
        // if(!locationResult.success){
        //     return res.status(500).json({code: 500, message: "Internal server error!"})
        // }
        const user = {
            id: uuidv4(),
            location_id: userLocation.id,
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone,
            password: hashedPassword,
            blood_group: req.body.bloodGroup,
            gender: req.body.gender
        }


        result = await authRepo.insertUser(user, true);
        // console.log(result);
        if(result.success){
            return res.status(201).json({code: 201, data: result.data});
        }
        return res.status(500).json({code: 500, message: "Internal server error!"})
    }

    login = async function (req, res) {
        const cred = req.body;
        const email = cred.email;
        const pwd = cred.password;
        // console.log(`user email ${email}`);

        const result = await authRepo.getUser(email, false);
        //console.log(result);
        if(result.success){
            if(result.data.length >= 1){
                const user = result.data[0];
                //console.log(`bal ${user.PASSWORD}`)
                const validatePassword = await bcyrpt.compare(pwd, user.PASSWORD)
                if(validatePassword){
                    const user_id = user.ID;
                    const user_name = user.NAME;
                    const user_email = user.EMAIL;
                    const tokenInfo = {id: user_id, name: user_name, email:user_email};
                    const token = generateJwtToken(tokenInfo);
                    // console.log(token);
                    return res.status(200).json({code:200, message: "Success", token: token});
                }
            }
            return res.status(401).json({code: 404, error: `Invalid email or password!`});
        }
        return res.status(500).json({code: 500, error: "Internal server error!"})
    }
}