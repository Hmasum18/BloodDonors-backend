import {v4 as uuidv4} from "uuid";
import PostReactRepository from "../repository/post_react_repository.js";
import {response} from "express";

const postReactRepository = new PostReactRepository();

export default class PostReactController {

    create = async (req, res) => {
        // console.log(req.body);
        let post_id = req.body.post_id;
        let react_name = req.body.react_name ? req.body.react_name : 'like';
        let user_id = req.body.user.id;
        let reactObj = {
            post_id,
            user_id,
            react_name,
        }
        // await this.toggleReact();
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
            return res.status(201).json({code: 201, message: 'reacted', data: {
                    ...reactObj,
                    user_name: req.body.user.name,
                    created: new Date().toISOString(),
                }})
        } else if (result.error.includes('PK')) {
            // console.log(result)
            // console.log('here');
            return await this.setReact(req, res, reactObj);
        }
        return res.status(500).json({code: 500, message: 'server side problem'})
    }

    setReact = async (req, res, obj) => {
        let result = await postReactRepository.setReact(obj, true);
        if (result.success) {
            return res.status(200).json({code: 200, message: 'reacted again', data: {
                    ...obj,
                    user_name: req.body.user.name,
                    created: new Date().toISOString(),
                }})
        }
        return res.status(500).json({code: 500, message: 'server side problem'})
    }

    getAllReact = async (req, res) => {
        let post_id = req.params.post_id;
        let result = await postReactRepository.getAllReact(post_id, false);
        if (result.success) {
            return res.status(200).json({
                code: 200,
                message: 'retrieved all react',
                length: result.data.length,
                data: result.data
            })
        }
        return res.status(500).json({code: 500, message: 'server side problem'})
    }


    deleteReact = async (req, res) => {
        let post_id = req.params.post_id;
        let user_id = req.body.user.id;
        let result = await postReactRepository.delete({post_id, user_id}, true);
        // console.log(result);
        if (result.success) {
            return res.status(202).json({code: 202, message: 'react removed'})
        }
        return res.status(500).json({code: 500, message: 'server side problem'})
    }


}