import {v4 as uuidv4} from "uuid";
import CommentRepository from "../repository/comment_repository.js";

const commentRepository = new CommentRepository();

export default class CommentController {

    create = async (req, res) => {
        let post_id = req.body.post_id;
        let text = req.body.text;
        let id = uuidv4();
        let user_id = req.body.user.id;
        let date = new Date();
        let commentObj = {
            id,
            post_id,
            user_id,
            text,
        }
        let result = await commentRepository.create(commentObj, true);
        if (result.success) {
            let responseData = {
                comment_id: id,
                text,
                post_id,
                user_id,
                user_name: req.body.user.name,
                created: date
            }
            return res.status(201).json({code: 201, message: 'comment created', data: responseData})
        }
        return res.status(500).json({code: 500, message: 'server side problem'})
    }

    getAllComment = async (req, res) => {
        let post_id = req.params.post_id;
        let result = await  commentRepository.getAllComment(post_id, false);
        if(result.success)
        {
            return res.status(200).json({code: 200, message: 'retrieved all comments', data: result.data})
        }
        return res.status(500).json({code: 500, message: 'server side problem'})
    }

    deleteComment = async (req, res) => {
        let comment_id = req.params.comment_id;
        let user_id = req.body.user.id;
        const result = await commentRepository.deleteComment({comment_id, user_id});
        // console.log(result);
        if (result.success) {
            return res.status(202).json({code: 202, message: result.data[0].message})
        }
        return res.status(500).json({code: 500, message: 'server side problem'})
    }


}