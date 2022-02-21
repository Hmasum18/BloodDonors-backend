import MessageController from "../controller/message_controller.js";// import UserRepository class
const messageController = new MessageController();
import Router from "express-promise-router";
import { authenticateToken } from "../middleware/authorization.js";


const router = Router();


router.get("/:id",authenticateToken, messageController.getAllMessage);

export default router;