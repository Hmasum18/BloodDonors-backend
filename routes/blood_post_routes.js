import BloodPostController from "../controller/blood_post_controller.js";
const bloodPostController = new BloodPostController();
import Router from "express-promise-router";
import { authenticateToken } from "../middleware/authorization.js";
const router = Router();

router.post("/", authenticateToken, bloodPostController.createPost);
router.get("/:post_id", authenticateToken, bloodPostController.getBloodPost);

export default router;