import Router from "express-promise-router";
import CommentController from "../controller/comment_controller.js";
import {authenticateToken} from "../middleware/authorization.js";

const commentController = new CommentController()
const router = Router();

router.post('/create', authenticateToken, commentController.create)

export default router;