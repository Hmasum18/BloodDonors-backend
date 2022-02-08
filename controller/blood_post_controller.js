
import {v4 as uuidv4} from 'uuid'
import {objectKeysToLC} from "../utils/key_to_lowercase.js";
import {stringToJson} from "../utils/convertStringToJson.js";
import BloodPostRepository from "../repository/blood_post_repository.js"
import LocationController from "./location_controller.js"
import PostRepository from "../repository/post_repository.js"
import LocationRepository from "../repository/location_repository.js"

const bloodPostRepository = new BloodPostRepository();
const postRepository = new PostRepository();
const locationRepository = new LocationRepository();
const locationController = new LocationController();

export default class BloodPostController{

    createPost = async (req, res) => {

        console.log(req.body);

        //console.log('creating post', req.body.location);
        //console.log('creating post', req.body.location['latitude']);
        const current_time = new Date();

        let result = await locationController.checkingExistingLocation(req.body.location.displayName);
        if(!result.success){
            return res.status(500).json({code: 500, message: "server side problem"});
        }

        let locationInfo;

        if(result.data.length === 0) {
            console.log('inserting location');
            locationInfo = {
                id: uuidv4(),
                latitude: req.body.location.latitude,
                longitude: req.body.location.longitude,
                description: req.body.location.displayName ,
                created: current_time,
                updated: current_time,
                active: 1
            };
            result = await locationRepository.insertOne(locationInfo)
            if (!result.success) {
                return res.status(500).json({code: 500, message: "server side problem"});
            }
        }else
            locationInfo = objectKeysToLC(result.data[0]);

        const generalPostInfo = {
            id: uuidv4(),
            user_id: req.body.user.ID,
            description: null,
            privacy: req.body.privacy ? req.body.privacy : 0, // 0 = no privacy, not 0 = some privacy
            created: current_time,
            updated: current_time,
            active: 1
        }

        result = await postRepository.insertOne(generalPostInfo);
        if(!result.success){
            return res.status(500).json({code: 500, message: "server side problem"});
        }

        const bloodPostInfo = {
            post_id: generalPostInfo.id,
            location_id: locationInfo.id,
            blood_group: req.body.blood_group,
            amount: req.body.amount,
            contact: req.body.contact,
            due_time: new Date(req.body.due_time),
            additional_info: req.body.additional_info ? req.body.additional_info : "",
        }


        result = await bloodPostRepository.insertOne(bloodPostInfo);
        if(result.success){
            return res.status(201).json({code: 201, message: "blood post creation done"});
        }
        return res.status(500).json({code: 500, message: "server side problem"});
    }

    getBloodPost = async function(req, res){
        const post_id = req.params.id;
        const result = await bloodPostRepository.findOne(post_id);
        console.log("getBloodPost: ", result);
        if(result.success){
            return res.status(200).json({code: 200, data: result.data});
        }
        return res.status(500).json({code: 500, message: "server side problem"});
    }


}