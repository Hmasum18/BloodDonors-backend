import BloodPostController from "../controller/blood_post_controller.js";
const bloodPostController = new BloodPostController();
import Router from "express-promise-router";
import { authenticateToken } from "../middleware/authorization.js";
const router = Router();

// route to create posts
router.post("/", authenticateToken, bloodPostController.createPost);
// get all the post created by current user
router.get("/user/:user_id", authenticateToken, bloodPostController.getAllBloodPostOfUser);
router.get("/:post_id", authenticateToken, bloodPostController.getBloodPostById);
router.get("/", authenticateToken, bloodPostController.getAllBloodPost); 
router.delete("/:id", authenticateToken, bloodPostController.deletePost);

export default router;