
import DonationRepository from "../repository/donation_repository.js"
import {v4 as uuidv4} from "uuid";
import {objectKeysToLC} from "../utils/key_to_lowercase.js";
import LocationRepository from "../repository/location_repository.js";
import LocationController from "./location_controller.js";
const locationRepository = new LocationRepository();
const locationController = new LocationController();

const donationRepository = new DonationRepository();

export default class DonationController{
    create = async (req, res) => {
        let result = await locationController.checkingExistingLocation(req.body.location.display_name);
        if(!result.success){
            return res.status(500).json({code: 500, message: "server side problem"});
        }

        let locationInfo;

        if(result.data.length === 0) {
            // console.log('inserting location');
            locationInfo = {
                id: uuidv4(),
                latitude: req.body.location.latitude,
                longitude: req.body.location.longitude,
                description: req.body.location.display_name ,
            };
            result = await locationRepository.insertOne(locationInfo, false)
            // console.log('location ', result)
            if (!result.success) {
                return res.status(500).json({code: 500, message: "server side problem"});
            }
        }else
            locationInfo = objectKeysToLC(result.data[0]);

        let user_id = req.body.user.id;
        let id = uuidv4();
        let location_id = locationInfo.id;
        let additional_info = req.body.additional_info ? req.body.additional_info : null;
        let donation_time = new Date(req.body.donation_time);
        let donation_obj = {
            id,
            location_id,
            additional_info,
            donation_time,
            user_id
        }

        result = await  donationRepository.create(donation_obj, true);
        console.log(result);
        if(result.success)
        {
            return res.status(200).json({code: 200, message: 'donation added', data: {... donation_obj, created: new Date().toISOString()}})
        }
        return res.status(500).json({code: 500, message: 'server side problem'})
    }
}