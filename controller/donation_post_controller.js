import {objectKeysToLC} from "../utils/key_to_lowercase.js";
import DonationPostRepository from "../repository/donation_post_repository.js";
import {v4 as uuidv4} from "uuid";
import PostRepository from "../repository/post_repository.js";
import DonationRepository from "../repository/donation_repository.js";

const donationPostRepository = new DonationPostRepository();
const postRepository = new PostRepository();
const donationRepository = new DonationRepository();

export default class DonationPostController {
    create = async (req, res) => {
        let user = req.body.user;
        const generalPostInfo = {
            id: uuidv4(),
            user_id: user.id,
            description: null,
            privacy: req.body.privacy ? req.body.privacy : 0, // 0 = no privacy, not 0 = some privacy
        }

        let result = await postRepository.insertOne(generalPostInfo, false);
        if(!result.success){
            return res.status(500).json({code: 500, message: "server side problem"});
        }
        // console.log(1, result);

        let donationPostObj = {
            donation_id: req.body.donation_id,
            post_id: generalPostInfo.id,
        }


        result = await donationPostRepository.create(donationPostObj);
        // console.log(2, result);
        if (result.success) {
            let donation_location = await donationRepository.findDonationByID(donationPostObj.donation_id);
            console.log(donation_location)
            donation_location = donation_location.data[0];

            let responseObject = {
                post_id: donationPostObj.post_id,
                user_id: user.id,
                user_name: user.name,
                created: new Date().toISOString(),
                donation_time: donation_location.donation_time,
                location: {
                    description: donation_location.display_name,
                    latitude: donation_location.latitude,
                    longitude: donation_location.longitude,
                }
        }
            return res.status(201).json({code: 201, message: "donation post created", data: responseObject})
        }
        return res.status(500).json({code: 500, message: "server side problem"})

    }
}