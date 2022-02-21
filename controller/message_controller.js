import {v4 as uuidv4} from "uuid";
import MessageRepository from "../repository/message_repository.js";

const messageRepository = new MessageRepository();

export default class MessageController {

    insertMessage = async (data) => {
        let messageObj = {
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            sent_time: new Date(data.sent_time),
            text: data.message
        }
        let result = await messageRepository.insert(messageObj, true);
    }

    getAllMessage = async (req, res) => {
        let user_id = req.body.user.id;
        let friend_id = req.params.id;
        let result = await  messageRepository.getMessages({user_id, friend_id}, false);
        // console.log(result);
        if(result.success)
        {
            return res.status(200).json({code: 200, message: 'retrieved all messages', data: result.data})
        }
        return res.status(500).json({code: 500, message: 'server side problem'})
    }


}