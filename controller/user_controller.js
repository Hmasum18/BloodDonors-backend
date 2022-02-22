import UserRepository from "../repository/user_repository.js"
import {objectKeysToLC} from "../utils/key_to_lowercase.js";
import DonationRepository from "../repository/donation_repository.js";

const userRepo = new UserRepository();
const donationRepository = new DonationRepository();

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

    searchByBG = async function (req, res, next) {
        let bloodGroup = req.params.blood_group;
        // console.log(filterString)
        const result = await userRepo.searchByBG(bloodGroup, false);
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
                let user = result.data[0];
                const locationResult = await userRepo.findUserLocation(user.LOCATION_ID, false);
                if(locationResult.success && locationResult.data.length>0){
                    let location = locationResult.data[0];
                    location = objectKeysToLC(location);
                    ['id', 'ACTIVE', 'created', 'updated'].forEach(e => delete location[e.toLowerCase()]);
                    user.LOCATION = objectKeysToLC(location);
                    user = objectKeysToLC(user);
                    // https://stackoverflow.com/questions/32534602/javascript-built-in-function-to-delete-multiple-keys-in-an-object
                    ['LOCATION_ID', 'PASSWORD','ACTIVE', 'updated'].forEach(e => delete user[e.toLowerCase()]);
                    let lastDonation = await donationRepository.getLastDonation(id);
                    console.log(lastDonation);
                    if(lastDonation.success){
                        lastDonation = lastDonation.data[0].last_donation;
                        let available = !lastDonation || new Date().getDate() - new Date(lastDonation).getDate() >= 112;
                        user["available"] = available;
                        user["last_donation"] = lastDonation;
                    }
                    else {
                        return res.status(500).json({code: 500, error: result.error.message})
                    }
                }
                return res.status(200).json({code: 200, data: objectKeysToLC(user)});
            } 
            return res.status(404).json({code: 404, error: `User with id ${id} not found!`});
        }
        return res.status(500).json({code: 500, error: result.error.message})
    }
    
} 