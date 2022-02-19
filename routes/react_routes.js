import Router from "express-promise-router";
import PostReactController from "../controller/post_react_controller.js";
import {authenticateToken} from "../middleware/authorization.js";

const postReactController = new PostReactController()
const router = Router();

router.post('/post', authenticateToken, postReactController.create)
router.get('/post/:post_id', authenticateToken, postReactController.getAllReact);
router.delete('/post/:post_id', authenticateToken, postReactController.deleteReact)

export default router;