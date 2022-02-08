import e from "express";
import AuthRepository from "../repository/auth_repository.js";
import bcyrpt from 'bcrypt';
import {v4 as uuidv4} from 'uuid'
import {generateJwtToken} from "../utils/jwt_util.js";

const authRepo = new AuthRepository();

export default class AuthController{
    register = async function (req, res) {
        console.log(req.body);
        const hashedPassword = await bcyrpt.hash(req.body.password, 10);
        const locationId = uuidv4();
        const userLocation = {
            id: locationId,
            lat: req.body.location.latitude,
            lang: req.body.location.longitude,
            text: req.body.location.text
        }

        const emailCheck = await authRepo.getUser(req.body.email);
        if(emailCheck.success){
            if(emailCheck.data.length >= 1){
                //const user = result.data[0];
                //console.log(`bal ${user.PASSWORD}`)
                return res.status(409).json({code:409, message: "This email has already been used."})
            }
        }

        const locationResult = await authRepo.insertUserLocation(userLocation);
        
        if(!locationResult.success){
            return res.status(500).json({code: 500, message: "Internal server error!"})
        }
        const d = new Date();
        const user = {
            id: uuidv4(),
            location_id: locationId,
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone,
            password: hashedPassword,
            blood_group: req.body.bloodGroup,
            gender: req.body.gender,
            created: d,
            updated: d,
            active: 1
        }
        

        const result = await authRepo.insertUser(user);
        console.log(result);
        if(result.success){
            return res.status(201).json({code: 201, data: result.data});
        }
        return res.status(500).json({code: 500, message: "Internal server error!"})
    }

    login = async function (req, res) {
        const cred = req.body;
        const email = cred.email;
        const pwd = cred.password;
        console.log(`user email ${email}`);

        const result = await authRepo.getUser(email);
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
                    const tokenInfo = {ID: user_id, NAME: user_name, EMAIL:user_email};
                    const token = generateJwtToken(tokenInfo);
                    console.log(token);
                    return res.status(200).json({code:200, message: "Success", token: token});
                }
            }
            return res.status(401).json({code: 404, error: `Invalid email or password!`});
        }
        return res.status(500).json({code: 500, error: "Internal server error!"})
    }
}