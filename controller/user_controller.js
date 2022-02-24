import UserRepository from "../repository/user_repository.js"
import {objectKeysToLC} from "../utils/key_to_lowercase.js";
import DonationRepository from "../repository/donation_repository.js";
import LocationController from "./location_controller.js";
import insideRadius from "../utils/map_distance.js";
import LocationRepository from "../repository/location_repository.js";

const userRepo = new UserRepository();
const donationRepository = new DonationRepository();
const locationController = new LocationController();
const locationRepository = new LocationRepository();

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
        // console.log(req.query)
        let bloodGroup = req.query.blood_group;
        // let user_id = req.body.user.id;
        let radius = req.query.radius;
        let latitude = +req.query.lat;
        let longitude = +req.query.lng;
        // console.log(filterString)
        // console.log(bloodGroup)
        let result = await userRepo.searchByBG(bloodGroup, false);
        // console.log(result)

        if(result.success){
            // let userLocation = await userRepo.findLocationOfUser(user_id);
            // if(!userLocation.success){
            //     return res.status(500).json({code: 500, error: "Internal server error"});
            // }
            // userLocation = userLocation.data[0];

            result = result.data.filter(x => {
                return insideRadius({latitude, longitude}, {
                    latitude: x.latitude,
                    longitude: x.longitude
                }, radius)
            })
            let responseData = locationController.retriveLocationFromObject(result)
            return res.status(200).json({code: 200, data: responseData});
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