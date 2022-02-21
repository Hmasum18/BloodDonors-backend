import {v4 as uuidv4} from "uuid";
import MessageRepository from "../repository/message_repository.js";
import {objectKeysToLC} from "../utils/key_to_lowercase.js";

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

    getChatList = async (req, res) => {
        let user_id = req.body.user.id;
        let user_name = req.body.user.name;
        console.log(user_id);
        let result = await  messageRepository.getChatList(user_id, false);
        console.log(result);
        let responseData = result.data.map(x => {
            x = objectKeysToLC(x);
            let is_sender = user_id === x.sender_id

            return {
                user_id: x.user_id,
                user_name: x.name,
                last_message: {
                    sender_id: x.sender_id,
                    sender: is_sender ? user_name : x.name,
                    receiver_id: x.receiver_id,
                    receiver: !is_sender ? user_name : x.name,
                    message: x.text,
                    sent_time: x.sent_time
                },
                is_sender
            }
        })
        console.log(responseData);
        if(result.success)
        {
            return res.status(200).json({code: 200, message: 'retrieved all messages', data: responseData})
        }
        return res.status(500).json({code: 500, message: 'server side problem'})
    }


}