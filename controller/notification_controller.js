import {objectKeysToLC} from "../utils/key_to_lowercase.js";
import NotificationRepository from "../repository/notification_repository.js";

const notificationRepository = new NotificationRepository();

export default class NotificationController {
    getAllNotification = async (req, res) => {
        console.log(req.body.user.id)
        let result = await notificationRepository.findAll(req.body.user.id);
        if (result.success) {
            return res.status(200).json({code: 200, message: "all notification retrieved", data: result.data})
        }
        return res.status(500).json({code: 500, message: "server side problem"})

    }
}