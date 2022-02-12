import {v4 as uuidv4} from "uuid";
import PostReactRepository from "../repository/post_react_repository.js";

const postReactRepository = new PostReactRepository();

export default class PostReactController {

    create = async (req, res) => {
        console.log(req.body);
        let post_id = req.body.post_id;
        let react_name = req.body.react_name ? req.body.react_name : 'like';
        let user_id = req.body.user.id;
        let date = new Date();
        let reactObj = {
            post_id,
            user_id,
            react_name,
            created: date,
            updated: date,
            active: 1,
        }
        let result = await postReactRepository.create(reactObj, true);
        if (result.success) {
            // let responseData = {
            //     comment_id: id,
            //     text,
            //     post_id,
            //     user_id,
            //     user_name: req.body.user.name,
            //     created: date
            // }
            return res.status(201).json({code: 201, message: 'reacted'})
        }
        return res.status(500).json({code: 500, message: 'server side problem'})
    }

    getAllReact = async (req, res) => {
        let post_id = req.params.post_id;
        let result = await  postReactRepository.getAllReact(post_id, false);
        if(result.success)
        {
            return res.status(200).json({code: 200, message: 'retrieved all react', data: result.data})
        }
        return res.status(500).json({code: 500, message: 'server side problem'})
    }


}