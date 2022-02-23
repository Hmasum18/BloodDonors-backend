import Router from "express-promise-router";
import CommentController from "../controller/comment_controller.js";
import {authenticateToken} from "../middleware/authorization.js";

const commentController = new CommentController()
const router = Router();

router.post('/', authenticateToken, commentController.create)
router.get('/:post_id', authenticateToken, commentController.getAllComment);
router.delete('/:comment_id', authenticateToken, commentController.deleteComment);

export default router;