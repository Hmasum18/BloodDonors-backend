import Router from "express-promise-router";
import NotificationController from "../controller/notification_controller.js";
import {authenticateToken} from "../middleware/authorization.js";

const notificationController = new NotificationController()
const router = Router();

router.get('/', authenticateToken, notificationController.getAllNotification)

export default router;